import { useEffect, useState } from "react";

interface UseQueryOptions<T> {
  enabled?: boolean;
  initialData: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseQueryResult<T> {
  data: T;
  error: string | null;
  loading: boolean;
  refetch: () => void;
}

export function useQuery<T>(
  queryFn: () => Promise<T>,
  deps: unknown[] = [],
  options: UseQueryOptions<T>
): UseQueryResult<T> {
  const { enabled = true, initialData, onSuccess, onError } = options;

  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [refetchKey, setRefetchKey] = useState(0);

  const refetch = () => {
    setRefetchKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await queryFn();
        
        if (!isCancelled) {
          setData(result);
          onSuccess?.(result);
        }
      } catch (err) {
        if (!isCancelled) {
          const errorMessage = err instanceof Error ? err.message : "Error desconocido";
          setError(errorMessage);
          onError?.(err instanceof Error ? err : new Error(errorMessage));
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [...deps, refetchKey, enabled]);

  return { data, error, loading, refetch };
}