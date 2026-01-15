// src/pages/Profile.tsx - COMPLETE INTERACTIVE VERSION

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import {
  User, Package, MapPin, CreditCard, Bell, Shield, Gift,
  Camera, ChevronLeft, ChevronRight, Plus, Trash2, Edit2, Check, X,
  Eye, EyeOff, Truck, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface PaymentMethod {
  type: string;
  last4?: string;
  expiry?: string;
  phone?: string;
  account?: string;
  email?: string;
  image: string;
}

interface ShippingAddress {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: string;
  items: Array<{
    name: string;
    image: string;
    size: string;
    quantity: number;
    price: string;
  }>;
  trackingNumber?: string;
  shippingAddress: string;
}

export default function Profile() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');

  // Payment Methods
  const [addingPayment, setAddingPayment] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { type: 'visa', last4: '4242', expiry: '12/26', image: '/02.jpg' },
    { type: 'mtn', phone: '0244123456', image: '/03.jpg' }
  ]);
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [mtnNumber, setMtnNumber] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');

  // Shipping Addresses
  const [addingAddress, setAddingAddress] = useState(false);
  const [shippingAddresses, setShippingAddresses] = useState<ShippingAddress[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '+233 50 000 2025',
      address: '123 Oxford Street',
      city: 'Accra',
      region: 'Greater Accra',
      isDefault: true
    }
  ]);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    region: ''
  });

  // Orders with detailed tracking
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-2025-001',
      date: '2025-01-10',
      status: 'delivered',
      total: 'GH₵ 499.00',
      items: [
        { name: 'Classic White T-Shirt', image: '/tshirt1.jpg', size: 'M', quantity: 2, price: 'GH₵ 149' }
      ],
      trackingNumber: 'TRK123456789',
      shippingAddress: '123 Oxford Street, Accra'
    },
    {
      id: 'ORD-2025-002',
      date: '2025-01-12',
      status: 'shipped',
      total: 'GH₵ 899.00',
      items: [
        { name: 'Midnight Suede Heels', image: '/ws1.jpg', size: '37', quantity: 1, price: 'GH₵ 799' }
      ],
      trackingNumber: 'TRK987654321',
      shippingAddress: '123 Oxford Street, Accra'
    }
  ]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Notifications
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    sms: true
  });

  // Security
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const menu = [
    { id: 'account', label: 'Account Settings', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'addresses', label: 'Shipping Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Privacy & Security', icon: Shield },
    { id: 'rewards', label: 'Loyalty Rewards', icon: Gift },
  ];

  // Payment Methods Functions
  const addPaymentMethod = () => {
    if (!selectedPaymentType) return;

    let newMethod: PaymentMethod = { type: selectedPaymentType, image: '' };
    let image = '';

    if (['mastercard', 'visa'].includes(selectedPaymentType)) {
      if (!cardNumber || !nameOnCard || !expiry || !cvv) {
        toast.error('Please fill all card details');
        return;
      }
      newMethod = { ...newMethod, last4: cardNumber.slice(-4), expiry };
      image = selectedPaymentType === 'mastercard' ? '/01.jpg' : '/02.jpg';
    } else if (selectedPaymentType === 'mtn') {
      if (!mtnNumber) {
        toast.error('Please enter MTN MoMo number');
        return;
      }
      newMethod = { ...newMethod, phone: mtnNumber };
      image = '/03.jpg';
    } else if (selectedPaymentType === 'bank') {
      if (!bankAccount) {
        toast.error('Please enter bank account');
        return;
      }
      newMethod = { ...newMethod, account: bankAccount };
      image = '/04.jpg';
    } else if (selectedPaymentType === 'paypal') {
      if (!paypalEmail) {
        toast.error('Please enter PayPal email');
        return;
      }
      newMethod = { ...newMethod, email: paypalEmail };
      image = 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg';
    }

    setPaymentMethods([...paymentMethods, { ...newMethod, image }]);
    setAddingPayment(false);
    setSelectedPaymentType(null);
    setCardNumber('');
    setNameOnCard('');
    setExpiry('');
    setCvv('');
    setMtnNumber('');
    setBankAccount('');
    setPaypalEmail('');
    toast.success('Payment method added successfully');
  };

  const removePaymentMethod = (index: number) => {
    const updated = paymentMethods.filter((_, i) => i !== index);
    setPaymentMethods(updated);
    toast.success('Payment method removed');
  };

  // Shipping Address Functions
  const addShippingAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.address || !newAddress.city || !newAddress.region) {
      toast.error('Please fill all address fields');
      return;
    }

    const address: ShippingAddress = {
      id: Date.now().toString(),
      ...newAddress,
      isDefault: shippingAddresses.length === 0
    };

    setShippingAddresses([...shippingAddresses, address]);
    setNewAddress({ name: '', phone: '', address: '', city: '', region: '' });
    setAddingAddress(false);
    toast.success('Shipping address added');
  };

  const removeShippingAddress = (id: string) => {
    setShippingAddresses(shippingAddresses.filter(addr => addr.id !== id));
    toast.success('Address removed');
  };

  const setDefaultAddress = (id: string) => {
    setShippingAddresses(shippingAddresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    toast.success('Default address updated');
  };

  // Security Functions
  const handlePasswordChange = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error('Please fill all password fields');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    toast.success('Password updated successfully');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing': return <Clock className="w-5 h-5 text-amber-600" />;
      case 'cancelled': return <X className="w-5 h-5 text-red-600" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-amber-100 text-amber-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700 hover:text-black transition group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-rose-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-3xl font-bold text-white">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-gray-900">albyeb</span>
              <span className="text-xs text-gray-500 tracking-wider">.shopi</span>
            </div>
          </Link>
          <div className="w-20" />
        </div>
      </div>

      <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-amber-50 via-white to-rose-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* User Card */}
          <div className="bg-white rounded-3xl shadow-xl p-10 mb-10 flex items-center gap-10">
            <div className="relative group">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white text-5xl font-light shadow-xl">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-2 right-2 bg-black text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <div>
              <h1 className="text-4xl font-light text-gray-900">{user?.name}</h1>
              <p className="text-lg text-gray-600 mt-1">{user?.email}</p>
              <div className="flex items-center gap-6 mt-4">
                <span className="px-6 py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full text-sm font-medium shadow-md">
                  VIP Member
                </span>
                <span className="text-sm text-gray-500">Joined January 2025</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-10">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-28">
                {menu.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-8 py-5 transition-all ${
                        isActive ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white' : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-5 h-5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl p-10">
                {/* Account Settings */}
                {activeTab === 'account' && (
                  <div>
                    <h2 className="text-3xl font-light mb-8">Account Settings</h2>
                    <p className="text-gray-600 mb-8">Update your personal information</p>
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue={user?.name}
                          className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          defaultValue={user?.email}
                          className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+233 50 000 0000"
                          className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none transition"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-600 to-rose-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition"
                      >
                        Save Changes
                      </button>
                    </form>
                  </div>
                )}

                {/* My Orders */}
                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-3xl font-light mb-8">My Orders</h2>
                    {orders.length === 0 ? (
                      <div className="text-center py-16">
                        <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <p className="text-xl text-gray-600 mb-6">No orders yet</p>
                        <Link
                          to="/shop"
                          className="inline-block bg-gradient-to-r from-amber-600 to-rose-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition"
                        >
                          Start Shopping
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <div key={order.id} className="border-2 rounded-2xl p-6 hover:border-amber-500 transition cursor-pointer" onClick={() => setSelectedOrder(order)}>
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <p className="font-bold text-lg">Order #{order.id}</p>
                                <p className="text-sm text-gray-500">{order.date}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(order.status)}
                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-3 mb-4">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                  <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">Size: {item.size} • Qty: {item.quantity}</p>
                                  </div>
                                  <p className="font-bold text-amber-600">{item.price}</p>
                                </div>
                              ))}
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t">
                              <div>
                                <p className="text-sm text-gray-500">Total Amount</p>
                                <p className="text-2xl font-bold">{order.total}</p>
                              </div>
                              {order.trackingNumber && (
                                <button className="px-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition font-medium">
                                  Track Order
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Shipping Addresses */}
                {activeTab === 'addresses' && (
                  <div>
                    <h2 className="text-3xl font-light mb-8">Shipping Addresses</h2>
                    <p className="text-gray-600 mb-8">Manage your delivery addresses</p>

                    <div className="space-y-4 mb-8">
                      {shippingAddresses.map((address) => (
                        <div key={address.id} className={`border-2 rounded-2xl p-6 ${address.isDefault ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="font-bold text-lg">{address.name}</p>
                              <p className="text-gray-600">{address.phone}</p>
                            </div>
                            {address.isDefault && (
                              <span className="px-4 py-1 bg-amber-500 text-white rounded-full text-xs font-medium">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 mb-4">
                            {address.address}, {address.city}, {address.region}
                          </p>
                          <div className="flex gap-3">
                            {!address.isDefault && (
                              <button
                                onClick={() => setDefaultAddress(address.id)}
                                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                              >
                                Set as Default
                              </button>
                            )}
                            <button
                              onClick={() => removeShippingAddress(address.id)}
                              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" /> Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {!addingAddress ? (
                      <button
                        onClick={() => setAddingAddress(true)}
                        className="w-full bg-gradient-to-r from-amber-600 to-rose-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition"
                      >
                        <Plus className="w-5 h-5" /> Add New Address
                      </button>
                    ) : (
                      <div className="border-2 border-amber-500 rounded-2xl p-6 bg-amber-50">
                        <h3 className="text-xl font-semibold mb-6">New Shipping Address</h3>
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                            className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                          />
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                            className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Street Address"
                            value={newAddress.address}
                            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                            className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="City"
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                              className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                            />
                            <select
                              value={newAddress.region}
                              onChange={(e) => setNewAddress({ ...newAddress, region: e.target.value })}
                              className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                            >
                              <option value="">Select Region</option>
                              <option value="Greater Accra">Greater Accra</option>
                              <option value="Ashanti">Ashanti</option>
                              <option value="Western">Western</option>
                              <option value="Eastern">Eastern</option>
                              <option value="Central">Central</option>
                              <option value="Northern">Northern</option>
                            </select>
                          </div>
                          <div className="flex gap-4">
                            <button
                              onClick={addShippingAddress}
                              className="flex-1 bg-gradient-to-r from-amber-600 to-rose-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition"
                            >
                              Save Address
                            </button>
                            <button
                              onClick={() => {
                                setAddingAddress(false);
                                setNewAddress({ name: '', phone: '', address: '', city: '', region: '' });
                              }}
                              className="flex-1 border-2 border-gray-300 py-4 rounded-xl font-semibold hover:bg-gray-50 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Payment Methods */}
                {activeTab === 'payment' && (
                  <div>
                    <h2 className="text-3xl font-light mb-8">Payment Methods</h2>
                    <p className="text-gray-600 mb-8">Manage your saved payment methods</p>

                    <div className="space-y-4 mb-8">
                      {paymentMethods.map((method, index) => (
                        <div key={index} className="flex items-center justify-between border-2 rounded-2xl p-6 hover:border-amber-500 transition">
                          <div className="flex items-center gap-4">
                            <img src={method.image} alt={method.type} className="w-16 h-10 object-contain" />
                            <div>
                              <p className="font-semibold capitalize">{method.type}</p>
                              <p className="text-sm text-gray-600">
                                {method.last4 ? `•••• •••• •••• ${method.last4}` : method.phone || method.account || method.email}
                              </p>
                              {method.expiry && <p className="text-xs text-gray-500">Expires: {method.expiry}</p>}
                            </div>
                          </div>
                          <button
                            onClick={() => removePaymentMethod(index)}
                            className="text-red-600 hover:text-red-800 flex items-center gap-2 font-medium"
                          >
                            <Trash2 className="w-4 h-4" /> Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    {!addingPayment ? (
                      <button
                        onClick={() => setAddingPayment(true)}
                        className="w-full bg-gradient-to-r from-amber-600 to-rose-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition"
                      >
                        <Plus className="w-5 h-5" /> Add Payment Method
                      </button>
                    ) : (
                      <div className="border-2 border-amber-500 rounded-2xl p-6 bg-amber-50">
                        <h3 className="text-xl font-semibold mb-6">Add New Payment Method</h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                          {[
                            { type: 'mastercard', label: 'Mastercard', img: '/01.jpg' },
                            { type: 'visa', label: 'Visa', img: '/02.jpg' },
                            { type: 'mtn', label: 'MTN MoMo', img: '/03.jpg' },
                            { type: 'bank', label: 'Bank Transfer', img: '/04.jpg' },
                            { type: 'paypal', label: 'PayPal', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' }
                          ].map((payment) => (
                            <button
                              key={payment.type}
                              onClick={() => setSelectedPaymentType(payment.type)}
                              className={`border-2 rounded-xl p-4 flex flex-col items-center transition ${
                                selectedPaymentType === payment.type ? 'border-amber-600 bg-white shadow-lg' : 'border-gray-300 hover:border-amber-400'
                              }`}
                            >
                              <img src={payment.img} alt={payment.label} className="h-12 mb-2" />
                              <span className="text-sm font-medium">{payment.label}</span>
                            </button>
                          ))}
                        </div>

                        {selectedPaymentType && (
                          <div className="space-y-4">
                            {['mastercard', 'visa'].includes(selectedPaymentType) && (
                              <>
                                <input
                                  type="text"
                                  placeholder="Card Number"
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(e.target.value)}
                                  className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                                />
                                <input
                                  type="text"
                                  placeholder="Name on Card"
                                  value={nameOnCard}
                                  onChange={(e) => setNameOnCard(e.target.value)}
                                  className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                  <input
                                    type="text"
                                    placeholder="MM/YY"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                                  />
                                  <input
                                    type="text"
                                    placeholder="CVV"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                                  />
                                </div>
                              </>
                            )}
                            {selectedPaymentType === 'mtn' && (
                              <input
                                type="tel"
                                placeholder="MTN MoMo Number"
                                value={mtnNumber}
                                onChange={(e) => setMtnNumber(e.target.value)}
                                className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                              />
                            )}
                            {selectedPaymentType === 'bank' && (
                              <input
                                type="text"
                                placeholder="Bank Account Number"
                                value={bankAccount}
                                onChange={(e) => setBankAccount(e.target.value)}
                                className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                              />
                            )}
                            {selectedPaymentType === 'paypal' && (
                              <input
                                type="email"
                                placeholder="PayPal Email"
                                value={paypalEmail}
                                onChange={(e) => setPaypalEmail(e.target.value)}
                                className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                              />
                            )}

                            <div className="flex gap-4 mt-6">
                              <button
                                onClick={addPaymentMethod}
                                className="flex-1 bg-gradient-to-r from-amber-600 to-rose-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition"
                              >
                                Add Payment Method
                              </button>
                              <button
                                onClick={() => {
                                  setAddingPayment(false);
                                  setSelectedPaymentType(null);
                                  setCardNumber('');
                                  setNameOnCard('');
                                  setExpiry('');
                                  setCvv('');
                                  setMtnNumber('');
                                  setBankAccount('');
                                  setPaypalEmail('');
                                }}
                                className="flex-1 border-2 border-gray-300 py-4 rounded-xl font-semibold hover:bg-gray-50 transition"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Notifications */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-3xl font-light mb-8">Notifications</h2>
                    <p className="text-gray-600 mb-8">Choose what notifications you want to receive</p>
                    <div className="space-y-6">
                      {[
                        { key: 'orderUpdates', label: 'Order Updates' },
                        { key: 'promotions', label: 'Promotions & Offers' },
                        { key: 'newsletter', label: 'Newsletter' },
                        { key: 'sms', label: 'SMS Notifications' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 border rounded-xl">
                          <span className="font-medium">{item.label}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications[item.key as keyof typeof notifications]}
                              onChange={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-amber-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Privacy & Security */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-3xl font-light mb-8">Privacy & Security</h2>
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-medium mb-4">Change Password</h3>
                        <div className="space-y-4">
                          <div className="relative">
                            <input
                              type={showCurrentPassword ? 'text' : 'password'}
                              placeholder="Current Password"
                              value={passwordForm.currentPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                              className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                              {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                          <div className="relative">
                            <input
                              type={showNewPassword ? 'text' : 'password'}
                              placeholder="New Password"
                              value={passwordForm.newPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                              className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirm New Password"
                              value={passwordForm.confirmPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                              className="w-full p-4 border-2 rounded-xl focus:border-amber-500 outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                          <button
                            onClick={handlePasswordChange}
                            className="w-full bg-gradient-to-r from-amber-600 to-rose-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition"
                          >
                            Update Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loyalty Rewards */}
                {activeTab === 'rewards' && (
                  <div>
                    <h2 className="text-3xl font-light mb-8">Loyalty Rewards</h2>
                    <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl p-10 text-center">
                      <div className="text-6xl font-bold text-amber-600 mb-4">500</div>
                      <p className="text-xl text-gray-600 mb-6">Reward Points</p>
                      <p className="text-gray-500 mb-8">Earn points with every purchase and redeem for exclusive discounts</p>
                      <button className="bg-gradient-to-r from-amber-600 to-rose-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition">
                        Redeem Points
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Order Details #{selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span>{selectedOrder.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Items</h3>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 mb-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Size: {item.size} • Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-amber-600">{item.price}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between border-t pt-4">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold">{selectedOrder.total}</span>
              </div>
              {selectedOrder.trackingNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tracking Number:</span>
                  <span className="font-medium">{selectedOrder.trackingNumber}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Address:</span>
                <span className="text-right">{selectedOrder.shippingAddress}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}