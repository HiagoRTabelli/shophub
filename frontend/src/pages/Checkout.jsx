import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, clearCart, cartTotal } = useCart();
  const cart = cartItems || [];

  const total =
    typeof cartTotal === "function" ? cartTotal() : cartTotal || 0;

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("@shophub:token");

    if (!token) {
      toast.error("You need to login before checkout.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      navigate("/");
      return;
    }

    try {
      const items = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      await api.post(
        "/orders",
        {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearCart();
      toast.success("Order placed successfully.");
      navigate("/order-success");
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error(error.response?.data?.message || "Error placing order.");
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/cart"
          className="inline-block mb-6 text-sm font-bold text-yellow-500 hover:text-black"
        >
          ← Back to cart
        </Link>

        <div className="mb-8">
          <p className="text-yellow-500 font-bold">CHECKOUT</p>

          <h1 className="text-3xl sm:text-4xl font-black text-black">
            Complete Your Order
          </h1>

          <p className="text-gray-600 mt-2">
            Add your shipping information to finish your purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm"
            >
              <h2 className="text-2xl font-black text-black mb-5">
                Shipping Details
              </h2>

              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                <input
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                <input
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <button className="w-full mt-6 bg-yellow-400 text-black py-4 rounded-lg font-black hover:bg-yellow-300 transition cursor-pointer">
                Place Order
              </button>
            </form>
          </section>

          <aside className="lg:col-span-1">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 sm:p-6 shadow-sm lg:sticky lg:top-28">
              <h2 className="text-2xl font-black text-black">
                Order Summary
              </h2>

              <div className="space-y-4 mt-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border-b border-yellow-200 pb-4"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-contain bg-white"
                    />

                    <div className="flex-1">
                      <p className="font-bold text-black line-clamp-1">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-black">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">
                    R$ {total.toFixed(2)}
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
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;