import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  cartTotal,
} = useCart();

const cart = cartItems || [];

  const shipping = 0;
  const total = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-white px-4 sm:px-6 py-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-black">
            Your cart is empty
          </h1>

          <p className="text-gray-600 mt-3">
            Add some products before checkout.
          </p>

          <Link
            to="/"
            className="inline-block mt-8 bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-yellow-500 font-bold">SHOPPING CART</p>

          <h1 className="text-3xl sm:text-4xl font-black text-black">
            Your Cart
          </h1>

          <p className="text-gray-600 mt-2">
            Review your products before checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4">
                  <Link
                    to={`/products/${item.id}`}
                    className="bg-yellow-50 rounded-xl p-3 flex items-center justify-center"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-32 object-contain"
                    />
                  </Link>

                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-yellow-500 uppercase">
                          {item.category}
                        </p>

                        <Link to={`/products/${item.id}`}>
                          <h2 className="text-xl font-black text-black mt-1 hover:text-yellow-500">
                            {item.name}
                          </h2>
                        </Link>

                        {item.color && (
                          <p className="text-sm text-gray-600 mt-2">
                            Color: {item.color}
                          </p>
                        )}

                        <p className="text-sm text-gray-600">
                          Stock: {item.stock ?? 0}
                        </p>
                      </div>

                      <p className="text-xl font-black text-black">
                        R$ {Number(item.price).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                          className="w-10 h-10 rounded-lg border border-gray-300 font-black disabled:opacity-40"
                        >
                          -
                        </button>

                        <span className="w-10 text-center font-black">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => {
                            if (item.quantity < item.stock) {
                              increaseQuantity(item.id);
                            }
                          }}
                          disabled={item.quantity >= item.stock}
                          className="w-10 h-10 rounded-lg border border-gray-300 font-black disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <p className="font-black text-black">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm font-bold text-red-600 hover:text-black"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <aside className="lg:col-span-1">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 sm:p-6 shadow-sm lg:sticky lg:top-28">
              <h2 className="text-2xl font-black text-black">
                Order Summary
              </h2>

              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">
                    R$ {cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-bold text-green-600">Free</span>
                </div>

                <div className="border-t border-yellow-300 pt-4 flex items-center justify-between">
                  <span className="text-xl font-black">Total</span>
                  <span className="text-2xl font-black">
                    R$ {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block text-center mt-6 bg-black text-white py-4 rounded-lg font-black hover:bg-yellow-400 hover:text-black transition"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/"
                className="block text-center mt-3 border border-black text-black py-3 rounded-lg font-bold hover:bg-black hover:text-white transition"
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;