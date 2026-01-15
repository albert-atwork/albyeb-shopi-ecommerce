import { Link, useNavigate } from 'react-router-dom';
import { useWishlistStore } from '../stores/useWishlistStore';
import { useCartStore } from '../stores/useCartStore';
import { Heart, Trash2, ArrowLeft, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, wishlistCount, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: item.size,
    });

    removeFromWishlist(item.id); // Amazon-style: move to cart

    toast.success(`Added ${item.name} to cart`);
  };

  const handleRemove = (item: any) => {
    removeFromWishlist(item.id);
    // No toast here – keeps interface clean
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-lg px-6">
          <Heart className="w-32 h-32 text-gray-300 mx-auto mb-8" strokeWidth={1.2} />
          <h1 className="text-5xl font-light text-gray-900 mb-6">Your Wishlist is Empty</h1>
          <p className="text-xl text-gray-600 mb-10">Save items you love for later.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full font-medium hover:bg-gray-800 transition"
          >
            Start Shopping <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-light">
              My Wishlist <span className="text-gray-500">({wishlistCount})</span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2 line-clamp-2">{item.name}</h3>
                <p className="text-2xl font-bold text-amber-700 mb-2">{item.price}</p>
                <p className="text-sm text-gray-600 mb-6">
                  Size: <span className="font-medium">{item.size || '—'}</span>
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} /> Add to Cart
                  </button>

                  <div className="flex justify-between items-center mt-4">
                    <Link to="/shop" className="text-gray-600 hover:text-black text-sm">
                      View in Shop
                    </Link>

                    <button
                      onClick={() => handleRemove(item)}
                      className="text-rose-600 hover:text-rose-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-black text-white px-12 py-5 rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Continue Shopping <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}