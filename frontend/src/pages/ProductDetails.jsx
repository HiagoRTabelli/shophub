import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <main className="min-h-screen bg-white px-4 sm:px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <p className="font-bold text-black">Loading product...</p>
        </div>
      </main>
    );
  }

  const inStock = product.stock > 0;

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });

    toast.success("Product added to cart.");
  };

  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-block mb-6 text-sm font-bold text-yellow-500 hover:text-black"
        >
          ← Back to products
        </Link>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="bg-yellow-100 rounded-3xl p-6 sm:p-10 flex items-center justify-center">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full max-w-md aspect-square object-contain"
              />
            ) : (
              <div className="w-full aspect-square flex items-center justify-center">
                <p className="font-bold text-black">No image available</p>
              </div>
            )}
          </div>

          <div className="lg:pt-8">
            <p className="text-sm font-bold text-yellow-500 uppercase">
              {product.category}
            </p>

            <h1 className="text-4xl sm:text-5xl font-black text-black mt-3">
              {product.name}
            </h1>

            <p className="text-gray-600 text-lg mt-5">
              {product.description}
            </p>

            <p className="text-4xl font-black text-black mt-6">
              R$ {Number(product.price).toFixed(2)}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="text-sm text-gray-500">Color</p>
                <p className="font-bold text-black mt-1">
                  {product.color || "Not informed"}
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl p-4">
                <p className="text-sm text-gray-500">Stock</p>
                <p
                  className={`font-bold mt-1 ${
                    inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {inStock ? `${product.stock} available` : "Out of stock"}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="font-bold text-black mb-3">Quantity</p>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecrease}
                  disabled={quantity === 1}
                  className="w-11 h-11 rounded-lg border border-gray-300 font-black disabled:opacity-40"
                >
                  -
                </button>

                <span className="w-12 text-center font-black">
                  {quantity}
                </span>

                <button
                  onClick={handleIncrease}
                  disabled={quantity >= product.stock}
                  className="w-11 h-11 rounded-lg border border-gray-300 font-black disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`w-full sm:w-auto mt-8 px-8 py-4 rounded-lg font-black transition cursor-pointer ${
                inStock
                  ? "bg-yellow-400 text-black hover:bg-yellow-300"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {inStock ? "Add to Cart" : "Unavailable"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;