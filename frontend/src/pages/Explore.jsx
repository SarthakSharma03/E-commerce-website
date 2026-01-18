import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Api from "../service/Api";
import ProductCard from "../UI/ProductCard";
import { IoIosSearch } from "react-icons/io";
import { useCart } from "../context/useCart";
import { useWishlist } from "../context/useWishlist";

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  });

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    sort: "newest",
    page: Number(searchParams.get("page")) || 1,
    category: searchParams.get("category") || "",
  });

  const [searchTerm, setSearchTerm] = useState(filters.search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchTerm,
        page: 1,
      }));
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    (async () => {
      try {
        const params = {
          search: filters.search,
          sort: filters.sort,
          page: filters.page,
          limit: 12,
          signal: controller.signal,
        };
        if (filters.category) {
          if (filters.category === "Electronics") {
            params.categories = [
              "computer",
              "phone",
              "smartWatch",
              "Camera",
              "Headphone",
              "Gaming",
            ].join(",");
          } else {
            params.category = filters.category;
          }
        }
        const response = await Api.getProducts(params);
        if (response?.success) {
          setProducts(response.data);
          setPagination(response.pagination);
        }
      } catch (error) {
        if (error?.name !== "AbortError") {
          console.error("Failed to fetch products", error);
        }
      } finally {
        setLoading(false);
      }
    })();

    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.page > 1) params.page = filters.page;
    if (filters.category) params.category = filters.category;
    setSearchParams(params);
    return () => controller.abort();
  }, [filters, setSearchParams]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setFilters((prev) => ({ ...prev, page }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, pagination.currentPage - 2);
    const end = Math.min(pagination.totalPages, pagination.currentPage + 2);

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-medium">Explore Our Products</h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:border-red-500"
            />
            <IoIosSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

        {filters.category && (
          <div className="flex items-center gap-2">
            <span className="text-sm px-3 py-2 border rounded bg-gray-50">
              Category: {filters.category}
            </span>
            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, category: "", page: 1 }))
              }
              className="text-sm text-red-500 hover:underline cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}

          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                sort: e.target.value,
                page: 1,
              }))
            }
            className="border rounded px-4 py-2 bg-white focus:border-red-500 hover:cursor-pointer"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A–Z</option>
            <option value="name-desc">Name: Z–A</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                category: e.target.value,
                page: 1,
              }))
            }
            className="border rounded px-4 py-2 bg-white focus:border-red-500 hover:cursor-pointer"
          >
            <option value="">Category</option>
            <option value="computer">computer</option>
            <option value="phone">phone</option>
            <option value="smartWatch">smartWatch</option>
            <option value="headphone">Headphone</option>
            <option value="camera">Camera</option>
            <option value="gaming">Gaming</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-72 bg-gray-100 animate-pulse rounded" />
          ))}
        </div>
      ) : products.length ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={() => addToCart(product)}
                onToggleProducts={() => navigate(`/product/${product._id}`)}
                isInWishlist={isInWishlist(product._id)}
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-2 flex-wrap">
              <button
                onClick={() =>
                  handlePageChange(pagination.currentPage - 1)
                }
                disabled={pagination.currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-40"
              >
                Previous
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded border ${
                    pagination.currentPage === page
                      ? "bg-red-500 text-white border-red-500"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() =>
                  handlePageChange(pagination.currentPage + 1)
                }
                disabled={
                  pagination.currentPage === pagination.totalPages
                }
                className="px-4 py-2 border rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl text-gray-500">
            No products found matching your criteria.
          </h3>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilters({ search: "", sort: "newest", page: 1, category: "" });
            }}
            className="mt-4 text-red-500 hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Explore;
