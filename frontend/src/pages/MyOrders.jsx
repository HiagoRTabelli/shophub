import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const statusStyles = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PAID: "bg-blue-100 text-blue-700",
    PREPARING: "bg-orange-100 text-orange-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  useEffect(() => {
    async function loadOrders() {
      try {
        const token = localStorage.getItem("@shophub:token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.get("/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data);
      } catch (error) {
        console.error(error.response?.data || error);
        alert("Error loading your orders.");
      }
    }

    loadOrders();
  }, [navigate]);

  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-yellow-500 font-bold">MY ORDERS</p>

          <h1 className="text-3xl sm:text-4xl font-black text-black">
            Your Orders
          </h1>

          <p className="text-gray-600 mt-2">
            Track your purchases and order status.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-black text-black">
              No orders yet
            </h2>

            <p className="text-gray-600 mt-2">
              Your completed purchases will appear here.
            </p>

            <Link
              to="/"
              className="inline-block mt-6 bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <h2 className="font-black text-black break-all">
                      #{order.id}
                    </h2>
                  </div>

                  <span
                    className={`w-fit px-4 py-2 rounded-full text-sm font-bold ${
                      statusStyles[order.status] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        {item.product?.imageUrl && (
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full sm:w-24 h-32 sm:h-24 object-contain bg-yellow-50 rounded-xl"
                          />
                        )}

                        <div className="flex-1">
                          <p className="font-black text-black">
                            {item.product?.name}
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            Qty: {item.quantity}
                          </p>

                          {item.product?.color && (
                            <p className="text-sm text-gray-600">
                              Color: {item.product.color}
                            </p>
                          )}

                          <p className="font-bold text-black mt-2">
                            R$ {Number(item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 h-fit">
                    <h3 className="font-black text-black mb-3">
                      Shipping Address
                    </h3>

                    <p className="text-gray-700">{order.address}</p>
                    <p className="text-gray-700">
                      {order.city} - {order.state}
                    </p>
                    <p className="text-gray-700">{order.zipCode}</p>

                    <div className="border-t border-yellow-200 mt-4 pt-4">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-2xl font-black text-black">
                        R$ {Number(order.total).toFixed(2)}
                      </p>
                    </div>

                    <p className="text-xs text-gray-500 mt-4">
                      Created at:{" "}
                      {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default MyOrders;