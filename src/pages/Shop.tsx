// src/pages/Shop.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ShoppingBag, Heart, User, X } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  sizes: string[];
}

export default function Shop() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { addToCart, cartCount } = useCartStore();
  const { addToWishlist, wishlistCount } = useWishlistStore();

  const products: Product[] = [
    // White T-Shirts (1-9)
    { id: 1, name: 'Classic White T-Shirt', price: 'GH₵149', image: '/tshirt1.jpg', description: 'Timeless crew neck white t-shirt crafted from premium Ghanaian cotton. Soft, breathable, and perfectly cut for everyday elegance and comfort.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 2, name: 'Premium Cotton White Tee', price: 'GH₵179', image: '/tshirt2.jpg', description: 'Elevated comfort meets refined simplicity. Made from superior long-staple cotton for a luxurious hand-feel and impeccable drape.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 3, name: 'Oversized White T-Shirt', price: 'GH₵199', image: '/tshirt3.jpg', description: 'Relaxed, street-inspired oversized silhouette. Crafted for effortless style and maximum comfort without compromising quality.', sizes: ['M', 'L', 'XL', 'XXL'] },
    { id: 4, name: 'Slim Fit White T-Shirt', price: 'GH₵159', image: '/tshirt4.jpg', description: 'Tailored slim silhouette that accentuates the body. Clean lines and subtle stretch for a sharp, modern look.', sizes: ['XS', 'S', 'M', 'L'] },
    { id: 5, name: 'V-Neck White T-Shirt', price: 'GH₵169', image: '/tshirt5.jpg', description: 'Sophisticated V-neck design for versatile layering. Soft cotton jersey with elegant neckline detailing.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 6, name: 'Heavyweight White Tee', price: 'GH₵229', image: '/tshirt6.jpg', description: 'Substantial 220gsm heavyweight cotton for structure and durability. Ideal for those who value premium weight and longevity.', sizes: ['M', 'L', 'XL', 'XXL'] },
    { id: 7, name: 'Pocket White T-Shirt', price: 'GH₵189', image: '/tshirt7.jpg', description: 'Signature chest pocket detail adds functional sophistication. Clean white base with thoughtful design accents.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 8, name: 'Long Sleeve White T-Shirt', price: 'GH₵219', image: '/tshirt8.jpg', description: 'Refined long-sleeve option for transitional weather. Soft cotton with subtle ribbed cuffs for a polished finish.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 9, name: 'Crew Neck White T-Shirt', price: 'GH₵139', image: '/tshirt9.jpg', description: 'The ultimate wardrobe staple. Classic crew neck in soft, durable cotton – designed for everyday luxury.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },

    // Women's Shoes (10-21)
    { id: 10, name: 'Midnight Suede Heels', price: 'GH₵799', image: '/ws1.jpg', description: 'Elegant midnight suede heels with refined 10cm stiletto. Handcrafted for comfort and timeless sophistication.', sizes: ['35', '36', '37', '38', '39'] },
    { id: 11, name: 'Golden Strappy Sandals', price: 'GH₵649', image: '/ws2.jpg', description: 'Luxurious golden strappy sandals with adjustable fit. Summer chic with premium detailing.', sizes: ['35', '36', '37', '38'] },
    { id: 12, name: 'Ebony Leather Pumps', price: 'GH₵899', image: '/ws3.jpg', description: 'Classic ebony black leather pumps with pointed toe. Versatile and polished for any occasion.', sizes: ['36', '37', '38', '39'] },
    { id: 13, name: 'Pearl White Sneakers', price: 'GH₵549', image: '/ws4.jpg', description: 'Clean pearl white sneakers with cushioned sole. Effortless everyday style with premium comfort.', sizes: ['35', '36', '37', '38', '39'] },
    { id: 14, name: 'Crimson Velvet Mules', price: 'GH₵729', image: '/ws5.jpg', description: 'Rich crimson velvet mules with low block heel. Bold, comfortable, and effortlessly chic.', sizes: ['36', '37', '38'] },
    { id: 15, name: 'Onyx Black Ankle Boots', price: 'GH₵999', image: '/ws6.jpg', description: 'Sleek onyx black leather ankle boots with side zip. Timeless design for all-season wear.', sizes: ['36', '37', '38', '39'] },
    { id: 16, name: 'Rose Gold Block Heels', price: 'GH₵679', image: '/ws7.jpg', description: 'Striking rose gold block heels with cushioned insole. Glamorous and comfortable for long wear.', sizes: ['35', '36', '37', '38'] },
    { id: 17, name: 'Ivory Satin Wedges', price: 'GH₵599', image: '/ws8.jpg', description: 'Elegant ivory satin wedges with woven detail. Perfect for summer days and evening events.', sizes: ['36', '37', '38', '39'] },
    { id: 18, name: 'Sapphire Blue Loafers', price: 'GH₵699', image: '/ws9.jpg', description: 'Rich sapphire blue loafers with gold hardware. Sophisticated and versatile for any outfit.', sizes: ['35', '36', '37', '38'] },
    { id: 19, name: 'Champagne Glitter Flats', price: 'GH₵579', image: '/ws10.jpg', description: 'Sparkling champagne glitter flats with cushioned footbed. Glamorous yet comfortable daily wear.', sizes: ['36', '37', '38'] },
    { id: 20, name: 'Emerald Green Straps', price: 'GH₵749', image: '/ws11.jpg', description: 'Vibrant emerald green strappy heels with adjustable ankle strap. Bold and elegant.', sizes: ['35', '36', '37', '38', '39'] },
    { id: 21, name: 'Nude Leather Sandals', price: 'GH₵629', image: '/ws12.jpg', description: 'Classic nude leather sandals with minimalist design. Timeless and versatile for any season.', sizes: ['36', '37', '38', '39'] },

    // Women's Bags (22-32)
    { id: 22, name: 'Midnight Leather Tote', price: 'GH₵899', image: '/d1.jpg', description: 'Spacious midnight black leather tote with structured silhouette and gold hardware. Versatile luxury for day to night.', sizes: ['One Size'] },
    { id: 23, name: 'Golden Chain Crossbody', price: 'GH₵749', image: '/d2.jpg', description: 'Elegant golden chain crossbody in soft leather. Compact and chic for effortless style.', sizes: ['One Size'] },
    { id: 24, name: 'Ebony Structured Satchel', price: 'GH₵999', image: '/d3.jpg', description: 'Sophisticated ebony black structured satchel with magnetic closure. Timeless and professional.', sizes: ['One Size'] },
    { id: 25, name: 'Pearl White Clutch', price: 'GH₵599', image: '/d4.jpg', description: 'Sleek pearl white clutch with crystal detail. Perfect for evening events and special occasions.', sizes: ['One Size'] },
    { id: 26, name: 'Crimson Velvet Shoulder Bag', price: 'GH₵829', image: '/d5.jpg', description: 'Rich crimson velvet shoulder bag with adjustable strap. Bold and luxurious.', sizes: ['One Size'] },
    { id: 27, name: 'Onyx Black Bucket Bag', price: 'GH₵949', image: '/d6.jpg', description: 'Classic onyx black bucket bag with drawstring closure. Effortlessly stylish and spacious.', sizes: ['One Size'] },
    { id: 28, name: 'Rose Gold Mini Bag', price: 'GH₵679', image: '/d7.jpg', description: 'Compact rose gold mini bag with chain strap. Glamorous and perfect for nights out.', sizes: ['One Size'] },
    { id: 29, name: 'Ivory Quilted Handbag', price: 'GH₵879', image: '/d8.jpg', description: 'Elegant ivory quilted handbag with gold hardware. Timeless and sophisticated.', sizes: ['One Size'] },
    { id: 30, name: 'Sapphire Blue Hobo', price: 'GH₵799', image: '/d9.jpg', description: 'Vibrant sapphire blue hobo bag with slouchy silhouette. Casual luxury for everyday.', sizes: ['One Size'] },
    { id: 31, name: 'Champagne Gold Evening Clutch', price: 'GH₵699', image: '/d10.jpg', description: 'Sparkling champagne gold evening clutch with crystal clasp. Perfect for formal occasions.', sizes: ['One Size'] },
    { id: 32, name: 'Emerald Green Tote', price: 'GH₵849', image: '/d11.jpg', description: 'Rich emerald green tote with structured base. Bold and spacious for all-day use.', sizes: ['One Size'] },

    // Men's Shoes (33-43)
    { id: 33, name: 'Onyx Black Leather Oxfords', price: 'GH₵899', image: '/c1.jpg', description: 'Polished onyx black leather oxfords with Goodyear welt construction. Timeless craftsmanship for the modern gentleman.', sizes: ['40', '41', '42', '43', '44'] },
    { id: 34, name: 'Midnight Suede Chelsea Boots', price: 'GH₵949', image: '/c2.jpg', description: 'Elegant midnight suede Chelsea boots with elastic side panels. Refined comfort and style.', sizes: ['40', '41', '42', '43'] },
    { id: 35, name: 'Ebony Monk Strap Loafers', price: 'GH₵849', image: '/c3.jpg', description: 'Sophisticated ebony monk strap loafers with double buckle detail. Premium leather with a modern edge.', sizes: ['40', '41', '42', '43', '44'] },
    { id: 36, name: 'Deep Brown Derby Shoes', price: 'GH₵799', image: '/c4.jpg', description: 'Rich deep brown derby shoes with clean lines. Versatile for business and casual wear.', sizes: ['39', '40', '41', '42'] },
    { id: 37, name: 'Charcoal Grey Sneakers', price: 'GH₵599', image: '/c5.jpg', description: 'Minimalist charcoal grey sneakers with cushioned sole. Everyday comfort meets understated luxury.', sizes: ['40', '41', '42', '43'] },
    { id: 38, name: 'Walnut Tan Brogues', price: 'GH₵879', image: '/c6.jpg', description: 'Warm walnut tan brogues with perforated detailing. Classic craftsmanship with a contemporary twist.', sizes: ['40', '41', '42', '43'] },
    { id: 39, name: 'Jet Black High-Top Trainers', price: 'GH₵649', image: '/c7.jpg', description: 'Bold jet black high-top trainers with premium materials. Street-ready luxury for the urban gentleman.', sizes: ['40', '41', '42', '43'] },
    { id: 40, name: 'Cognac Leather Chukkas', price: 'GH₵749', image: '/c8.jpg', description: 'Rich cognac leather chukkas with suede trim. Refined and versatile for any occasion.', sizes: ['39', '40', '41', '42'] },
    { id: 41, name: 'Navy Blue Driving Loafers', price: 'GH₵699', image: '/c9.jpg', description: 'Classic navy blue driving loafers with rubber sole. Effortless sophistication for casual luxury.', sizes: ['40', '41', '42', '43'] },
    { id: 42, name: 'Espresso Brown Chelsea Boots', price: 'GH₵999', image: '/c10.jpg', description: 'Deep espresso brown Chelsea boots with elastic panels. Premium leather and timeless design.', sizes: ['40', '41', '42', '43'] },
    { id: 43, name: 'Classic White Leather Sneakers', price: 'GH₵579', image: '/c11.jpg', description: 'Crisp classic white leather sneakers with clean design. Versatile and effortlessly stylish.', sizes: ['40', '41', '42', '43'] },

    // Men's Sweatshirts (44-56)
    { id: 44, name: 'Midnight Black Hoodie', price: 'GH₵399', image: '/e1.jpg', description: 'Premium heavyweight midnight black hoodie with kangaroo pocket and adjustable drawstrings. Ultimate comfort meets street luxury.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 45, name: 'Charcoal Grey Crew Sweatshirt', price: 'GH₵349', image: '/e2.jpg', description: 'Soft charcoal grey crew sweatshirt in brushed fleece. Clean, versatile, and perfect for layering.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 46, name: 'Onyx Oversized Sweatshirt', price: 'GH₵429', image: '/e3.jpg', description: 'Relaxed onyx black oversized sweatshirt with dropped shoulders. Modern fit with premium comfort.', sizes: ['M', 'L', 'XL', 'XXL'] },
    { id: 47, name: 'Ebony French Terry Pullover', price: 'GH₵379', image: '/e4.jpg', description: 'Smooth ebony French terry pullover with ribbed cuffs. Refined and comfortable for all-day wear.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 48, name: 'Deep Navy Zip-Up Hoodie', price: 'GH₵449', image: '/e5.jpg', description: 'Deep navy zip-up hoodie with contrast zipper. Practical luxury for transitional weather.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 49, name: 'Walnut Brown Sweatshirt', price: 'GH₵369', image: '/e6.jpg', description: 'Warm walnut brown sweatshirt with subtle texture. Rich color and soft feel for elevated casual.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 50, name: 'Jet Black Embroidered Hoodie', price: 'GH₵499', image: '/e7.jpg', description: 'Jet black hoodie with subtle tonal embroidery. Premium detail for understated luxury.', sizes: ['M', 'L', 'XL', 'XXL'] },
    { id: 51, name: 'Graphite Grey Relaxed Fit', price: 'GH₵359', image: '/e8.jpg', description: 'Graphite grey relaxed fit sweatshirt with soft fleece lining. Effortless comfort and style.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 52, name: 'Cognac Brown Pullover', price: 'GH₵419', image: '/e9.jpg', description: 'Rich cognac brown pullover with ribbed hem. Warm, versatile, and perfectly weighted.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 53, name: 'Ash Grey Quarter-Zip', price: 'GH₵389', image: '/e10.jpg', description: 'Clean ash grey quarter-zip sweatshirt with stand collar. Modern and polished layering piece.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 54, name: 'Slate Blue Crewneck', price: 'GH₵399', image: '/e11.jpg', description: 'Slate blue crewneck sweatshirt in premium cotton blend. Subtle color with everyday luxury.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 55, name: 'Classic Black Sweatshirt', price: 'GH₵329', image: '/e12.jpg', description: 'Classic black sweatshirt with minimal branding. Essential piece for effortless style.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 56, name: 'Mocha Brown Hooded Sweat', price: 'GH₵459', image: '/e13.jpg', description: 'Warm mocha brown hooded sweatshirt with adjustable drawstrings. Cozy luxury for cooler days.', sizes: ['M', 'L', 'XL', 'XXL'] },

    // Women's Dresses (57-65)
    { id: 57, name: 'Midnight Silk Maxi Dress', price: 'GH₵999', image: '/a1.jpg', description: 'Flowing midnight silk maxi dress with subtle side slit and elegant drape. Designed for unforgettable evenings.', sizes: ['XS', 'S', 'M', 'L'] },
    { id: 58, name: 'Golden Hour Flowy Dress', price: 'GH₵849', image: '/a2.jpg', description: 'Lightweight golden hour flowy dress with soft movement. Romantic and effortless for daytime elegance.', sizes: ['XS', 'S', 'M', 'L'] },
    { id: 59, name: 'Ebony Velvet Cocktail Dress', price: 'GH₵1,199', image: '/a3.jpg', description: 'Rich ebony velvet cocktail dress with fitted silhouette. Luxurious texture for special occasions.', sizes: ['XS', 'S', 'M'] },
    { id: 60, name: 'Pearl White Lace Dress', price: 'GH₵899', image: '/a4.jpg', description: 'Delicate pearl white lace dress with intricate detailing. Romantic and refined for any event.', sizes: ['S', 'M', 'L'] },
    { id: 61, name: 'Onyx Black Bodycon Dress', price: 'GH₵979', image: '/a6.jpg', description: 'Sleek onyx black bodycon dress with stretch fabric. Bold, flattering, and confident.', sizes: ['XS', 'S', 'M', 'L'] },
    { id: 62, name: 'Rose Gold Satin Slip Dress', price: 'GH₵799', image: '/a7.jpg', description: 'Shimmering rose gold satin slip dress with delicate straps. Glamorous and versatile.', sizes: ['S', 'M', 'L'] },
    { id: 63, name: 'Ivory Off-Shoulder Gown', price: 'GH₵1,099', image: '/a8.jpg', description: 'Elegant ivory off-shoulder gown with flowing skirt. Perfect for weddings or formal events.', sizes: ['XS', 'S', 'M'] },
    { id: 64, name: 'Sapphire Blue Midi Dress', price: 'GH₵829', image: '/a9.jpg', description: 'Vibrant sapphire blue midi dress with cinched waist. Sophisticated and flattering.', sizes: ['S', 'M', 'L'] },
    { id: 65, name: 'Champagne Sequin Evening Dress', price: 'GH₵1,299', image: '/a10.jpg', description: 'Sparkling champagne sequin evening dress with side slit. Designed to shine on the red carpet.', sizes: ['XS', 'S', 'M'] },

    // Men's Jeans (66-73)
    { id: 66, name: 'Onyx Black Slim Jeans', price: 'GH₵599', image: '/b1.jpg', description: 'Sleek onyx black slim-fit jeans in premium stretch denim. Modern cut with refined detailing.', sizes: ['28', '30', '32', '34', '36'] },
    { id: 67, name: 'Midnight Indigo Straight Fit', price: 'GH₵549', image: '/b2.jpg', description: 'Classic midnight indigo straight-fit jeans with dark wash. Timeless and versatile.', sizes: ['30', '32', '34'] },
    { id: 68, name: 'Ebony Dark Wash Skinny Jeans', price: 'GH₵629', image: '/b3.jpg', description: 'Ebony dark wash skinny jeans with stretch. Slim and flattering for a sharp look.', sizes: ['28', '30', '32'] },
    { id: 69, name: 'Deep Blue Relaxed Jeans', price: 'GH₵579', image: '/b4.jpg', description: 'Relaxed deep blue jeans with comfortable fit. Effortless style for casual days.', sizes: ['30', '32', '34', '36'] },
    { id: 70, name: 'Charcoal Grey Tapered Jeans', price: 'GH₵649', image: '/b5.jpg', description: 'Modern charcoal grey tapered jeans with clean finish. Sophisticated and contemporary.', sizes: ['28', '30', '32'] },
    { id: 71, name: 'Walnut Brown Vintage Jeans', price: 'GH₵699', image: '/b6.jpg', description: 'Warm walnut brown vintage jeans with faded detailing. Unique and timeless.', sizes: ['30', '32', '34'] },
    { id: 72, name: 'Jet Black Ripped Jeans', price: 'GH₵599', image: '/b7.jpg', description: 'Bold jet black ripped jeans with strategic distressing. Edgy yet refined.', sizes: ['28', '30', '32'] },
    { id: 73, name: 'Navy Blue Classic Denim', price: 'GH₵569', image: '/b8.jpg', description: 'Classic navy blue denim jeans with straight leg. Reliable and versatile for any wardrobe.', sizes: ['30', '32', '34', '36'] },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addToCart({
      id: selectedProduct!.id,
      name: selectedProduct!.name,
      price: selectedProduct!.price,
      image: selectedProduct!.image,
      size: selectedSize,
    });

    toast.success(`Added ${selectedProduct!.name} (Size: ${selectedSize}) to cart!`);
    setSelectedProduct(null);
    setSelectedSize(null);
  };

  const handleAddToWishlist = () => {
    if (!selectedSize) return;

    addToWishlist({
      id: selectedProduct!.id,
      name: selectedProduct!.name,
      price: selectedProduct!.price,
      image: selectedProduct!.image,
      size: selectedSize,
    });

    toast.success(`Added ${selectedProduct!.name} (Size: ${selectedSize}) to wishlist!`);
    setSelectedProduct(null);
    setSelectedSize(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOP BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700 hover:text-black font-medium">
            <ChevronLeft className="w-6 h-6" />
            Back
          </button>

          {/* Logo in center */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-md">
              <span className="text-3xl font-bold text-white">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-black">albyeb</span>
              <span className="text-xs text-gray-600 tracking-wider">.shopi</span>
            </div>
          </Link>

          <div className="flex-1 max-w-md mx-8 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search t-shirts, shoes, bags, dresses, jeans..."
                className="w-full pl-12 pr-12 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-600 transition bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/cart" className="relative flex flex-col items-center text-gray-700 hover:text-amber-600 transition group">
              <ShoppingBag className="w-6 h-6" />
              <span className="text-xs font-medium mt-1">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/wishlist" className="relative flex flex-col items-center text-gray-700 hover:text-red-600 transition group">
              <Heart className="w-6 h-6" />
              <span className="text-xs font-medium mt-1">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/profile" className="flex flex-col items-center text-gray-700 hover:text-amber-600 transition group">
              <User className="w-6 h-6" />
              <span className="text-xs font-medium mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="pt-20 bg-gradient-to-br from-amber-600 to-rose-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-thin tracking-widest mb-4">Our Collection</h1>
          <p className="text-xl opacity-90">Timeless. Clean. Essential. Made in Ghana.</p>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {searchTerm ? (
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-medium text-gray-800">
              Results for "{searchTerm}"
              <span className="text-gray-500 ml-3">({filteredProducts.length})</span>
            </h2>
            {filteredProducts.length === 0 && (
              <div className="mt-8 text-center text-gray-600">
                <p className="text-xl">No products found matching "{searchTerm}".</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-6 text-amber-600 hover:text-amber-800 font-medium underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        ) : (
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-10">Our Collection</h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {(searchTerm ? filteredProducts : products).map((product) => (
            <button
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setSelectedSize(null);
              }}
              className="group block text-left transition-transform hover:-translate-y-2"
            >
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-medium truncate">{product.name}</h3>
                  <p className="text-3xl font-bold text-amber-600 mt-2">{product.price}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          onClick={() => {
            setSelectedProduct(null);
            setSelectedSize(null);
          }}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setSelectedSize(null);
                }}
                className="float-right text-gray-500 hover:text-black text-3xl"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full rounded-2xl" />
                </div>

                <div>
                  <h2 className="text-4xl font-light mb-4">{selectedProduct.name}</h2>
                  <p className="text-3xl font-bold text-amber-600 mb-6">{selectedProduct.price}</p>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <p className="font-medium mb-2">Select Size</p>
                      <div className="flex gap-4 flex-wrap">
                        {selectedProduct.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-14 h-14 border-2 rounded-xl font-medium transition-all duration-300 ${
                              selectedSize === size
                                ? 'border-amber-600 bg-amber-50 text-amber-700 shadow-md'
                                : 'border-gray-300 hover:border-amber-600 hover:bg-amber-50'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      {!selectedSize && (
                        <p className="text-sm text-amber-600 mt-2">
                          Please select a size to add to cart or wishlist
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={handleAddToCart}
                        disabled={!selectedSize}
                        className={`flex-1 py-4 rounded-xl font-medium transition-all duration-300 ${
                          selectedSize ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Add to Cart
                      </button>

                      <button
                        onClick={handleAddToWishlist}
                        disabled={!selectedSize}
                        className={`px-8 py-4 border-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 ${
                          selectedSize ? 'border-amber-600 text-amber-600 hover:bg-amber-50' : 'border-gray-300 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Heart className="w-5 h-5" /> Add to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}