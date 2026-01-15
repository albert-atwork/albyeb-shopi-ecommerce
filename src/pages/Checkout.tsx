// src/pages/Checkout.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ChevronLeft, Check, ArrowRight } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { toast } from 'sonner';
import Footer from '../components/Footer';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [mtnNumber, setMtnNumber] = useState('');
  const [bankAccount, setBankAccount] = useState('');

  // Editable billing address
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [billingAddress, setBillingAddress] = useState('Osu, Accra, Ghana');

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + priceNum * item.quantity;
  }, 0);
  const delivery = 0;
  const total = subtotal + delivery;

  const handleSubmit = () => {
    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }

    if (selectedMethod === 'visa' || selectedMethod === 'mastercard') {
      if (!cardNumber || !nameOnCard || !expiry || !cvv) {
        toast.error('Please fill all card fields');
        return;
      }
    } else if (selectedMethod === 'mtn' && !mtnNumber) {
      toast.error('Please enter MTN MoMo number');
      return;
    } else if (selectedMethod === 'bank' && !bankAccount) {
      toast.error('Please enter bank account number');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      toast.success('Payment successful!');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 flex items-center justify-center p-6">
          <div className="text-center bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full border border-gray-100">
            <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Check className="w-14 h-14 text-white" strokeWidth={3} />
            </div>
            <h1 className="text-5xl font-light mb-4 text-gray-900">Order Complete!</h1>
            <p className="text-xl text-gray-600 mb-3">Thank you for shopping with us</p>
            <p className="text-gray-500 mb-10">Your order will be processed and shipped within 24 hours.</p>
            
            <div className="bg-gradient-to-r from-amber-50 to-rose-50 rounded-2xl p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Order Total</p>
              <p className="text-4xl font-bold text-gray-900">GH₵ {total.toFixed(2)}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/profile"
                className="flex-1 bg-gradient-to-r from-amber-600 to-rose-600 text-white px-8 py-5 rounded-xl hover:shadow-xl transition font-semibold text-lg flex items-center justify-center gap-2"
              >
                Track Order <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/shop"
                className="flex-1 border-2 border-gray-300 text-gray-700 px-8 py-5 rounded-xl hover:border-gray-400 transition font-semibold text-lg"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-gray-700 hover:text-black transition font-medium group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-amber-600 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-white">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-gray-900">albyeb</span>
                <span className="text-xs text-gray-500 tracking-wider">.shopi</span>
              </div>
            </Link>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="hidden sm:inline font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-lg">✓</div>
              <span className="ml-3 text-sm font-medium text-gray-700 hidden sm:inline">Cart</span>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-amber-500"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold shadow-lg">2</div>
              <span className="ml-3 text-sm font-medium hidden sm:inline">Payment</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Payment Form - Left 3/5 */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Payment Methods Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h1 className="text-3xl font-light mb-8 flex items-center gap-3">
                  <Lock className="w-7 h-7 text-amber-600" />
                  Payment Method
                </h1>

                <div className="space-y-4">
                  {/* Visa */}
                  <div className={`border-2 rounded-2xl overflow-hidden transition-all cursor-pointer ${selectedMethod === 'visa' ? 'border-amber-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'}`}>
                    <label className="flex items-center p-5 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedMethod === 'visa'}
                        onChange={() => setSelectedMethod('visa')}
                        className="w-5 h-5 mr-4 accent-amber-600"
                      />
                      <span className="flex-1 text-lg font-semibold">Visa</span>
                      <img src="/02.jpg" alt="Visa" className="h-10" />
                    </label>

                    {selectedMethod === 'visa' && (
                      <div className="px-6 pb-6 space-y-4 bg-gray-50">
                        <input
                          type="text"
                          placeholder="Card Number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none transition"
                        />
                        <input
                          type="text"
                          placeholder="Name on Card"
                          value={nameOnCard}
                          onChange={(e) => setNameOnCard(e.target.value)}
                          className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none transition"
                        />
                        <div className="flex gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            className="flex-1 p-4 border-2 rounded-xl focus:border-amber-500 outline-none transition"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="w-32 p-4 border-2 rounded-xl focus:border-amber-500 outline-none transition"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mastercard */}
                  <div className={`border-2 rounded-2xl overflow-hidden transition-all cursor-pointer ${selectedMethod === 'mastercard' ? 'border-amber-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'}`}>
                    <label className="flex items-center p-5 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedMethod === 'mastercard'}
                        onChange={() => setSelectedMethod('mastercard')}
                        className="w-5 h-5 mr-4 accent-amber-600"
                      />
                      <span className="flex-1 text-lg font-semibold">Mastercard</span>
                      <img src="/01.jpg" alt="Mastercard" className="h-10" />
                    </label>

                    {selectedMethod === 'mastercard' && (
                      <div className="px-6 pb-6 space-y-4 bg-gray-50">
                        <input
                          type="text"
                          placeholder="Card Number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none transition"
                        />
                        <input
                          type="text"
                          placeholder="Name on Card"
                          value={nameOnCard}
                          onChange={(e) => setNameOnCard(e.target.value)}
                          className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none transition"
                        />
                        <div className="flex gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            className="flex-1 p-4 border-2 rounded-xl focus:border-amber-500 outline-none transition"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="w-32 p-4 border-2 rounded-xl focus:border-amber-500 outline-none transition"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* MTN MoMo */}
                  <div className={`border-2 rounded-2xl overflow-hidden transition-all cursor-pointer ${selectedMethod === 'mtn' ? 'border-amber-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'}`}>
                    <label className="flex items-center p-5 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedMethod === 'mtn'}
                        onChange={() => setSelectedMethod('mtn')}
                        className="w-5 h-5 mr-4 accent-amber-600"
                      />
                      <span className="flex-1 text-lg font-semibold">MTN MoMo</span>
                      <img src="/03.jpg" alt="MTN MoMo" className="h-10" />
                    </label>

                    {selectedMethod === 'mtn' && (
                      <div className="px-6 pb-6 bg-gray-50">
                        <input
                          type="text"
                          placeholder="MTN MoMo Number (e.g., 0244123456)"
                          value={mtnNumber}
                          onChange={(e) => setMtnNumber(e.target.value)}
                          className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none transition"
                        />
                        <p className="text-sm text-gray-500 mt-3">
                          You'll receive a prompt on your phone to approve payment
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bank Transfer */}
                  <div className={`border-2 rounded-2xl overflow-hidden transition-all cursor-pointer ${selectedMethod === 'bank' ? 'border-amber-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'}`}>
                    <label className="flex items-center p-5 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedMethod === 'bank'}
                        onChange={() => setSelectedMethod('bank')}
                        className="w-5 h-5 mr-4 accent-amber-600"
                      />
                      <span className="flex-1 text-lg font-semibold">Bank Transfer</span>
                      <img src="/04.jpg" alt="Bank" className="h-10" />
                    </label>

                    {selectedMethod === 'bank' && (
                      <div className="px-6 pb-6 bg-gray-50">
                        <input
                          type="text"
                          placeholder="Bank Account Number"
                          value={bankAccount}
                          onChange={(e) => setBankAccount(e.target.value)}
                          className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none transition"
                        />
                        <p className="text-sm text-gray-500 mt-3">
                          Transfer details will be sent to your email
                        </p>
                      </div>
                    )}
                  </div>

                  {/* PayPal */}
                  <div className={`border-2 rounded-2xl overflow-hidden transition-all cursor-pointer ${selectedMethod === 'paypal' ? 'border-amber-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'}`}>
                    <label className="flex items-center p-5 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedMethod === 'paypal'}
                        onChange={() => setSelectedMethod('paypal')}
                        className="w-5 h-5 mr-4 accent-amber-600"
                      />
                      <span className="flex-1 text-lg font-semibold">PayPal</span>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-10" />
                    </label>

                    {selectedMethod === 'paypal' && (
                      <div className="px-6 pb-6 bg-gray-50">
                        <p className="text-gray-600 mb-4">Redirecting to PayPal for secure payment</p>
                        <button 
                          onClick={() => toast.info('Redirecting to PayPal...')}
                          className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition font-semibold"
                        >
                          Continue with PayPal
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Billing Address</h3>
                  <button
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                  >
                    {isEditingAddress ? 'Save' : 'Edit'}
                  </button>
                </div>
                {isEditingAddress ? (
                  <input
                    type="text"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                  />
                ) : (
                  <p className="text-gray-700 text-lg">{billingAddress}</p>
                )}
              </div>
            </div>

            {/* Order Summary - Right 2/5 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-32 border border-gray-100">
                <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-4 border-b border-gray-100">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-1">Size: {item.size} • Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-amber-600 mt-2">
                          GH₵ {(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">GH₵ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="text-green-600 font-bold">Free</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>GH₵ {total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isProcessing || !selectedMethod}
                  className={`w-full py-5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    isProcessing || !selectedMethod
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-600 to-rose-600 text-white hover:shadow-2xl hover:scale-105'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Place Order <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  Secure payment • Your data is protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}