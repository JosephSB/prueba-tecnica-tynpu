import { useEffect, useState } from "react";
import "./App.css";
import { PRODUCTS_MOCK } from "./mocks/products";
import { usePagination } from "./hooks/usePagination";
import { useDebounce } from "./hooks/useDebounce";
import { useQuery } from "./hooks/useFetch";

const getProducts = async (page: number, size: number, q?: string) => {
  await new Promise((res) => setTimeout(res, 500));

  if (Math.random() < 0.1) {
    throw new Error("Error al obtener los productos. Intenta nuevamente.");
  }

  const start = (page - 1) * size;
  const end = start + size;
  const filtered = PRODUCTS_MOCK.filter((p) =>
    p.name.toLowerCase().includes((q ?? "").toLowerCase())
  );

  const resp = filtered.slice(start, end);

  return {
    data: resp,
    total: filtered.length,
  };
};

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

function App() {
  const PAGE_SIZE = 5;
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const pagination = usePagination(total, PAGE_SIZE);
  const debouncedSearch = useDebounce(search, 500);
  const { data, error, loading } = useQuery<{
    data: Product[];
    total: number;
  }>(
    () => getProducts(pagination.currentPage, PAGE_SIZE, debouncedSearch),
    [pagination.currentPage, debouncedSearch],
    {
      initialData: { data: [], total: 0 },
      onSuccess: (response) => {
        setTotal(response.total);
      },
    }
  );

  useEffect(() => {
    pagination.resetPage();
  }, [debouncedSearch]);

  return (
    <div className="app-main">
      <h1>e-commerce</h1>
      <div className="container-search">
        <p>Busca por nombre</p>
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <p>total: {data.total} productos</p>
          <div className="container-products">
            {data.data.map((item) => (
              <ProductCard data={item} />
            ))}
          </div>
          <br />
          <div className="container-pagination">
            <button
              onClick={pagination.goToPrevPage}
              disabled={!pagination.canGoPrev}
            >
              Anterior
            </button>
            <span>
              Página {pagination.currentPage} de {pagination.totalPages}
            </span>
            <button
              onClick={pagination.goToNextPage}
              disabled={!pagination.canGoNext}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const ProductCard = ({ data }: { data: Product }) => {
  return (
    <div key={data.id} className="product-card">
      <div className="product-card_image">
        <img src={data.image} alt={data.name} loading="lazy" />
        <span className="product-card_category">{data.category}</span>
      </div>
      <div className="product-card_info">
        <h3>{data.name}</h3>
        <p className="product-card_desc">{data.description}</p>
        <div className="product-card_meta">
          <span className="product-card_price">
            S/. {data.price.toFixed(2)}
          </span>
          <span className="product-card_stock">
            {data.stock > 0 ? `Stock: ${data.stock}` : "Agotado"}
          </span>
        </div>
        <button className="product-card_btn">Agregar al carrito</button>
      </div>
    </div>
  );
};

export default App;
