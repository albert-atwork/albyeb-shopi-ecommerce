// src/pages/Cart.tsx

import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/useCartStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';

export default function Cart() {
  const { cart, cartCount, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCartStore();

  const total = cart.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + priceNum * item.quantity;
  }, 0);

  const handleIncrease = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: item.size,
    });
    toast.success(`Added one more ${item.name}`);
  };

  const handleDecrease = (id: number) => {
    decreaseQuantity(id);
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
    toast.success('Item removed from cart');
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16 flex items-center justify-center">
          <div className="text-center max-w-lg px-6">
            <div className="relative inline-block mb-8">
              <ShoppingBag className="w-32 h-32 text-gray-300" strokeWidth={1.2} />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-rose-400/10 rounded-full blur-3xl -z-10" />
            </div>
            <h1 className="text-5xl font-light text-gray-900 mb-6">Your Cart is Empty</h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Discover our timeless collection and start building your perfect wardrobe.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-black to-gray-900 text-white px-12 py-5 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              Start Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 md:mb-0">
              Your Cart
              <span className="text-2xl md:text-3xl text-gray-500 ml-4">
                ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </span>
            </h1>
            <button
              onClick={() => {
                clearCart();
                toast.success('Cart cleared');
              }}
              className="text-red-600 hover:text-red-800 font-medium transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-5 h-5" /> Clear Cart
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 sm:h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-medium text-gray-900 mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Size: <span className="font-medium text-amber-700">
                            {item.size || 'No size selected'}
                          </span>
                        </p>
                        <p className="text-2xl font-bold text-amber-600 mb-4">
                          {item.price}
                        </p>
                        <p className="text-sm text-gray-500">
                          Subtotal: GH₵ {(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2">
                          <button
                            onClick={() => handleDecrease(item.id)}
                            disabled={item.quantity <= 1}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                          >
                            <Minus className="w-5 h-5 text-gray-700" />
                          </button>

                          <span className="text-lg font-semibold w-8 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => handleIncrease(item)}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-100 transition"
                          >
                            <Plus className="w-5 h-5 text-gray-700" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-2"
                        >
                          <Trash2 className="w-5 h-5" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 sticky top-28">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Order Summary</h2>

                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-gray-700">
                    <span>Items ({cartCount})</span>
                    <span>GH₵ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping & Handling</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Estimated Tax</span>
                    <span className="text-sm text-gray-500">At checkout</span>
                  </div>
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between text-2xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>GH₵ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full bg-gradient-to-r from-amber-600 to-rose-600 text-white py-5 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/shop"
                  className="block text-center mt-6 text-gray-600 hover:text-gray-900 transition font-medium"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}