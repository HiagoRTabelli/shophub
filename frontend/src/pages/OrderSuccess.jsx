import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <main className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-yellow-200 bg-yellow-50 p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 text-4xl">
          ✓
        </div>

        <p className="text-sm font-bold uppercase text-yellow-600">
          Order Confirmed
        </p>

        <h1 className="mt-2 text-3xl font-black text-black sm:text-4xl">
          Your order was placed successfully!
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for shopping with ShopHub. You can track your purchase in
          your orders page.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            to="/my-orders"
            className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300"
          >
            View My Orders
          </Link>

          <Link
            to="/"
            className="rounded-xl border border-black bg-white px-6 py-3 font-bold text-black transition hover:bg-black hover:text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;