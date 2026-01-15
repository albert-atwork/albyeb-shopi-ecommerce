// src/components/Navbar.tsx

import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBasket, Heart, User, ShoppingBag, LogIn, LogOut } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';
import { useAuthStore } from '../stores/useAuthStore';

export default function Navbar() {
  const cartCount = useCartStore((state) => state.cartCount);
  const wishlistCount = useWishlistStore((state) => state.wishlistCount);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-md">
            <span className="text-3xl font-bold text-white">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-black">albyeb</span>
            <span className="text-xs text-gray-600 tracking-wider">.shopi</span>
          </div>
        </Link>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl mx-6 lg:mx-12 hidden md:block">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search dresses, shoes, bags, accessories..."
              className="w-full pl-12 pr-6 py-3.5 rounded-full border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 outline-none transition-all bg-gray-50 text-black placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Right: Icons with labels below */}
        <div className="flex items-center gap-8 lg:gap-12">

          {/* Shop */}
          <Link 
            to="/shop" 
            className="flex flex-col items-center text-gray-800 hover:text-amber-600 transition group"
          >
            <ShoppingBasket className="w-7 h-7 mb-1" />
            <span className="text-xs font-medium">Shop</span>
          </Link>

          {/* Cart with badge */}
          <Link 
            to="/cart" 
            className="relative flex flex-col items-center text-gray-800 hover:text-amber-600 transition group"
          >
            <ShoppingBag className="w-7 h-7 mb-1" />
            <span className="text-xs font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          {/* Wishlist with badge */}
          <Link 
            to="/wishlist" 
            className="relative flex flex-col items-center text-gray-800 hover:text-rose-600 transition group"
          >
            <Heart className="w-7 h-7 mb-1" />
            <span className="text-xs font-medium">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </Link>

          {/* Profile */}
          <Link 
            to="/profile" 
            className="flex flex-col items-center text-gray-800 hover:text-amber-600 transition group"
          >
            <User className="w-7 h-7 mb-1" />
            <span className="text-xs font-medium">Profile</span>
          </Link>

          {/* Login/Logout Toggle */}
          {!user ? (
            <Link 
              to="/login" 
              className="flex flex-col items-center text-gray-800 hover:text-amber-600 transition group"
            >
              <LogIn className="w-7 h-7 mb-1" />
              <span className="text-xs font-medium">Login</span>
            </Link>
          ) : (
            <button 
              onClick={handleLogout}
              className="flex flex-col items-center text-gray-800 hover:text-red-600 transition group"
            >
              <LogOut className="w-7 h-7 mb-1" />
              <span className="text-xs font-medium">Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}