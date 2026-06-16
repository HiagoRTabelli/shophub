import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProducts();
  }, []);

  const categories = [
  "All",
  "Audio",
  "Electronics",
  "Computers",
  "Accessories",
  "Gaming",
  "Smartphones",
  "Wearables",
  "Home",
];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const searchMatch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [products, selectedCategory, searchTerm]);

  const featuredProduct = filteredProducts[0];

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black leading-tight">
              Discover the best products for you
            </h1>

            <p className="text-gray-600 text-lg mt-4">
              Quality, price and the best experience.
            </p>

            <a
              href="#products"
              className="inline-block mt-8 bg-yellow-400 text-black px-7 py-3 rounded-md font-bold hover:bg-yellow-300 transition"
            >
              Shop Now
            </a>
          </div>

          <div className="bg-yellow-100 rounded-3xl p-6 sm:p-10 flex items-center justify-center">
            {featuredProduct ? (
              <img
                src={featuredProduct.imageUrl}
                alt={featuredProduct.name}
                className="w-full max-w-sm aspect-square object-contain"
              />
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="font-bold text-black">
                  No products available
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        id="products"
        className="max-w-7xl mx-auto px-4 sm:px-6 pb-14"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-black text-black">
            Featured Products
          </h2>

          <p className="text-gray-600 mt-2">
            Browse our product catalog.
          </p>
        </div>

        {/* FILTERS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl font-bold text-black">
              No products found
            </p>

            <p className="text-gray-500 mt-2">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <Link
                  to={`/products/${product.id}`}
                >
                  <div className="bg-gray-50 p-5">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-52 object-contain"
                    />
                  </div>
                </Link>

                <div className="p-5">
                  <span className="text-xs font-bold text-yellow-500 uppercase">
                    {product.category}
                  </span>

                  <h3 className="font-black text-lg text-black mt-2 line-clamp-2">
                    {product.name}
                  </h3>

                  {product.color && (
                    <p className="text-sm text-gray-600 mt-2">
                      Color: {product.color}
                    </p>
                  )}

                  <p className="text-sm text-gray-600 mt-1">
                    Stock:{" "}
                    <span
                      className={`font-semibold ${
                        product.stock > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} available`
                        : "Out of stock"}
                    </span>
                  </p>

                  <p className="text-2xl font-black text-black mt-4">
                    R${" "}
                    {Number(product.price).toFixed(2)}
                  </p>

                  <Link
                    to={`/products/${product.id}`}
                    className={`block text-center mt-5 py-3 rounded-lg font-bold transition ${
                      product.stock > 0
                        ? "bg-yellow-400 text-black hover:bg-yellow-300"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                    }`}
                  >
                    {product.stock > 0
                      ? "View Product"
                      : "Unavailable"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;