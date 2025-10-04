import { useState } from "react";
import { ZodType } from "zod";

interface UseFormReturn<T> {
  data: T;
  errors: Record<keyof T, string | null>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (onSubmit: (data: T) => void) => (e: React.FormEvent<HTMLFormElement>) => void;
}

export function useForm<T extends Record<string, unknown>>(
  schema: ZodType<T>,
  initialData: T
): UseFormReturn<T> {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<keyof T, string | null>>(
    Object.keys(initialData).reduce(
      (acc, key) => ({ ...acc, [key]: null }),
      {} as Record<keyof T, string | null>
    )
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit =
    (onSubmit: (data: T) => void) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const result = schema.safeParse(data);

      if (!result.success) {
        const formErrors = result.error.flatten().fieldErrors;
        const formattedErrors = Object.keys(initialData).reduce((acc, key) => {
          const typedKey = key as keyof T;
          return {
            ...acc,
            [typedKey]: formErrors[typedKey]?.[0] ?? null,
          };
        }, {} as Record<keyof T, string | null>);

        setErrors(formattedErrors);
      } else {
        setErrors(
          Object.keys(initialData).reduce(
            (acc, key) => ({ ...acc, [key]: null }),
            {} as Record<keyof T, string | null>
          )
        );
        onSubmit(result.data);
      }
    };

  return { data, errors, handleChange, handleSubmit };
}