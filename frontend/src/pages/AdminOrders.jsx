import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const statusOptions = [
    "PENDING",
    "PAID",
    "PREPARING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  const statusStyles = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PAID: "bg-blue-100 text-blue-800",
    PREPARING: "bg-purple-100 text-purple-800",
    SHIPPED: "bg-indigo-100 text-indigo-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("@shophub:token");

      const response = await api.get("/orders/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error loading admin orders.");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("@shophub:token");

      await api.patch(
        `/orders/admin/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order status updated successfully.");
      fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error("Error updating order status.");
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(searchText) ||
        order.user?.name?.toLowerCase().includes(searchText) ||
        order.user?.email?.toLowerCase().includes(searchText) ||
        order.city?.toLowerCase().includes(searchText) ||
        order.state?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-yellow-500">
              Admin Panel
            </p>
            <h1 className="text-3xl font-black text-black">Orders</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage customer orders and update shipping status.
            </p>
          </div>

          <div className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-black">
            {filteredOrders.length} orders
          </div>
        </div>

        <div className="mb-6 grid gap-3 rounded-2xl border border-gray-200 bg-yellow-50 p-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Search by order, customer, email or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-yellow-400"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-yellow-400"
          >
            <option value="All">All status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
            <h2 className="text-xl font-bold text-black">No orders found</h2>
            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredOrders.map((order) => (
              <section
                key={order.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="flex flex-col gap-4 border-b border-yellow-200 bg-yellow-400 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-medium text-black/70">Order</p>
                    <h2 className="break-all text-lg font-bold text-black">
                      #{order.id}
                    </h2>
                  </div>

                  <span
                    className={`w-fit rounded-full px-4 py-2 text-xs font-bold ${
                      statusStyles[order.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="grid gap-6 p-5 lg:grid-cols-3">
                  <div>
                    <h3 className="mb-2 text-sm font-black text-black">
                      Customer
                    </h3>
                    <p className="text-sm text-gray-700">{order.user?.name}</p>
                    <p className="break-all text-sm text-gray-500">
                      {order.user?.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.user?.phone || "Phone not informed"}
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-black text-black">
                      Shipping
                    </h3>
                    <p className="text-sm text-gray-700">{order.address}</p>
                    <p className="text-sm text-gray-500">
                      {order.city} - {order.state}
                    </p>
                    <p className="text-sm text-gray-500">{order.zipCode}</p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-black text-black">
                      Update Status
                    </h3>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-yellow-400"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    <p className="mt-3 text-lg font-black text-black">
                      Total: ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 bg-gray-50 p-5">
                  <h3 className="mb-3 text-sm font-black text-black">
                    Purchased Items
                  </h3>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col gap-2 rounded-xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-bold text-black">
                            {item.product?.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Color: {item.product?.color || "Not informed"}
                          </p>
                        </div>

                        <div className="text-sm text-gray-700 sm:text-right">
                          <p>Qty: {item.quantity}</p>
                          <p className="font-bold">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminOrders;