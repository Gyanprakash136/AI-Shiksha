import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  BookOpen,
  Loader2,
} from "lucide-react";

export default function Cart() {
  const navigate = useNavigate();
  const { items, total, removeFromCart, loading } = useCart();

  const handleRemoveItem = async (courseId: string) => {
    await removeFromCart(courseId);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Shopping Cart</h1>
              <p className="text-indigo-100 mt-1">
                {items.length} {items.length === 1 ? "course" : "courses"} in your cart
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-16 h-16 text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Explore our courses and add your favorites to get started!
            </p>
            <button
              onClick={() => navigate("/courses")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg transition-all hover:shadow-xl hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              Browse Courses
            </button>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-6 p-6">
                    {/* Thumbnail */}
                    <div className="relative flex-shrink-0 w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                      {item.course.thumbnail_url ? (
                        <img
                          src={item.course.thumbnail_url}
                          alt={item.course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-indigo-300" />
                        </div>
                      )}
                    </div>

                    {/* Course Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {item.course.title}
                      </h3>
                      {item.course.instructor && (
                        <p className="text-sm text-gray-600 mb-4">
                          by {item.course.instructor.user.name}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-auto">
                        {/* Price */}
                        <div>
                          {item.course.price > 0 ? (
                            <span className="text-2xl font-bold text-indigo-600">
                              ₹{item.course.price.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-2xl font-bold text-green-600">Free</span>
                          )}
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.course.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-all font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <button
                onClick={() => navigate("/courses")}
                className="w-full py-4 rounded-2xl border-2 border-indigo-200 text-indigo-600 font-semibold hover:bg-indigo-50 transition-all"
              >
                Continue Shopping
              </button>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Discount</span>
                    <span className="font-semibold text-green-600">-₹0</span>
                  </div>
                  <div className="h-px bg-gray-200"></div>
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-indigo-600">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg transition-all hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 mb-6"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Features */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Tag className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Best Price Guarantee</p>
                      <p className="text-xs text-gray-600">Get the best deal on all courses</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Lifetime Access</p>
                      <p className="text-xs text-gray-600">Learn at your own pace, anytime</p>
                    </div>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <p className="text-sm text-green-800 font-medium text-center">
                    🔒 Secure Checkout • 30-Day Money-Back Guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
