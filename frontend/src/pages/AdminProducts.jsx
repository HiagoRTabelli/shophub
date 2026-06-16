import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

function AdminProducts() {
  const categories = [
    "Audio",
    "Electronics",
    "Computers",
    "Accessories",
    "Gaming",
    "Smartphones",
    "Wearables",
    "Home",
  ];

  const colorOptions = [
    "Black",
    "White",
    "Yellow",
    "Blue",
    "Red",
    "Green",
    "Silver",
    "Other",
  ];

  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    color: "",
    customColor: "",
    imageUrl: "",
    category: "",
  });

  const fetchProducts = async () => {
    const response = await api.get("/products");
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      color: "",
      customColor: "",
      imageUrl: "",
      category: "",
    });

    setEditingProductId(null);
  };

  const buildProductData = () => {
    return {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      stock: Number(formData.stock),
      color: formData.color === "Other" ? formData.customColor : formData.color,
      imageUrl: formData.imageUrl,
      category: formData.category,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("@shophub:token");
      const productData = buildProductData();

      if (editingProductId) {
        await api.put(`/products/${editingProductId}`, productData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success("Product updated.");
      } else {
        await api.post("/products", productData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success("Product created.");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
  console.error(error.response?.data || error);
  toast.error(error.response?.data?.message || "Error saving product.");
}
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);

    const isPresetColor = colorOptions.includes(product.color);

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock ?? "",
      color: isPresetColor ? product.color : "Other",
      customColor: isPresetColor ? "" : product.color || "",
      imageUrl: product.imageUrl || "",
      category: product.category,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (productId) => {
    if (!confirm("Delete this product?")) return;

    try {
      const token = localStorage.getItem("@shophub:token");

      await api.delete(`/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchProducts();
      toast.success("Product deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product.");
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-yellow-500 font-bold">ADMIN PANEL</p>

          <h1 className="text-3xl sm:text-4xl font-black text-black">
            Manage Products
          </h1>

          <p className="text-gray-600 mt-2">
            Create, edit and remove products from the ShopHub catalog.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <section className="xl:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 sm:p-6 shadow-sm xl:sticky xl:top-28"
            >
              <h2 className="text-xl font-black text-black mb-5">
                {editingProductId ? "Edit Product" : "Add Product"}
              </h2>

              <input
                name="name"
                placeholder="Product name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                name="price"
                placeholder="Price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                name="stock"
                placeholder="Stock quantity"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select category</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select color</option>

                {colorOptions.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>

              {formData.color === "Other" && (
                <input
                  name="customColor"
                  placeholder="Type custom color"
                  value={formData.customColor}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              )}

              <input
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <button className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-yellow-400 hover:text-black transition">
                {editingProductId ? "Update Product" : "Create Product"}
              </button>

              {editingProductId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full mt-3 bg-white border border-black text-black py-3 rounded-lg font-bold hover:bg-black hover:text-white transition"
                >
                  Cancel
                </button>
              )}
            </form>
          </section>

          <section className="xl:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-black text-black">
                  Product List
                </h2>

                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                  {products.length} items
                </span>
              </div>

              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Color</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Price</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-gray-100 hover:bg-yellow-50"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {product.imageUrl && (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-14 h-14 rounded-lg object-cover bg-gray-100"
                              />
                            )}

                            <div>
                              <p className="font-bold text-black">
                                {product.name}
                              </p>

                              <p className="text-sm text-gray-500 line-clamp-1">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 font-semibold">
                          {product.category}
                        </td>

                        <td className="p-4 font-semibold">
                          {product.color || "-"}
                        </td>

                        <td className="p-4 font-semibold">
                          {product.stock ?? 0}
                        </td>

                        <td className="p-4 font-black">
                          R$ {Number(product.price).toFixed(2)}
                        </td>

                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-300"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(product.id)}
                              className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden p-4 space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-xl p-4"
                  >
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-44 object-cover rounded-lg mb-3"
                      />
                    )}

                    <p className="text-xs font-bold text-yellow-500 uppercase">
                      {product.category}
                    </p>

                    <h3 className="text-lg font-black text-black">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 text-sm mt-1">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                      <p>
                        <span className="font-bold">Color:</span>{" "}
                        {product.color || "-"}
                      </p>

                      <p>
                        <span className="font-bold">Stock:</span>{" "}
                        {product.stock ?? 0}
                      </p>
                    </div>

                    <p className="text-xl font-black mt-3">
                      R$ {Number(product.price).toFixed(2)}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-400 text-black py-3 rounded-lg font-bold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-black text-white py-3 rounded-lg font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {products.length === 0 && (
                <div className="p-8 text-center">
                  <p className="font-bold text-black">No products found.</p>

                  <p className="text-gray-500 mt-1">
                    Create your first product using the form.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default AdminProducts;