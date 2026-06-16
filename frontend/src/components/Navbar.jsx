import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useCart();

const cartCount =
  cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  ) || 0;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();

  const user = JSON.parse(
    localStorage.getItem("@shophub:user") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("@shophub:token");
    localStorage.removeItem("@shophub:user");

    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-black tracking-tight"
        >
          Shop
          <span className="text-yellow-400">Hub</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-10">
          <Link
            to="/"
            className="font-semibold text-black hover:text-yellow-500 transition"
          >
            Home
          </Link>

          <Link
  to="/cart"
  className="relative font-semibold text-black hover:text-yellow-500 transition"
>
  Cart

  {cartCount > 0 && (
    <span className="absolute -top-3 -right-5 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
      {cartCount}
    </span>
  )}
</Link>

          {user && (
            <Link
              to="/my-orders"
              className="font-semibold text-black hover:text-yellow-500 transition"
            >
              My Orders
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <>
              <Link
                to="/admin/orders"
                className="font-semibold text-black hover:text-yellow-500 transition"
              >
                Admin Orders
              </Link>

              <Link
                to="/admin/products"
                className="font-semibold text-black hover:text-yellow-500 transition"
              >
                Admin Products
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
  {user && (
    <div className="hidden md:flex flex-col items-end mr-2">
      <span className="text-xs text-black font-medium">
  Olá,
</span>

      <span className="font-semibold text-sm text-black">
        {user.name}
      </span>
    </div>
  )}
          {user ? (
            <button
              onClick={handleLogout}
              className="hidden sm:block bg-black text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden sm:block bg-black text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col px-4 py-4">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="py-3 font-semibold"
            >
              Home
            </Link>

            <Link
  to="/cart"
  onClick={() => setMenuOpen(false)}
  className="py-3 font-semibold flex items-center gap-2"
>
  Cart

  {cartCount > 0 && (
    <span className="bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
      {cartCount}
    </span>
  )}
</Link>

            {user && (
              <Link
                to="/my-orders"
                onClick={() => setMenuOpen(false)}
                className="py-3 font-semibold"
              >
                My Orders
              </Link>
            )}

            {user?.role === "ADMIN" && (
              <>
                <Link
                  to="/admin/orders"
                  onClick={() => setMenuOpen(false)}
                  className="py-3 font-semibold"
                >
                  Admin Orders
                </Link>

                <Link
                  to="/admin/products"
                  onClick={() => setMenuOpen(false)}
                  className="py-3 font-semibold"
                >
                  Admin Products
                </Link>
              </>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="mt-4 bg-black text-white py-3 rounded-lg font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="mt-4 bg-black text-white py-3 rounded-lg text-center font-semibold"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;