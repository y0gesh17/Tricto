'use client';
import { useAppContext } from '@/context/AppContext';
import {
  ShoppingBag,
  Heart,
  MapPin,
  LogOut,
  User
} from 'lucide-react';

const AccountsPage = () => {
  const { userData, isSeller, setIsSeller } = useAppContext();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Account</h2>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        {/* User Info Section */}
        <div className="flex items-center gap-4">
          {userData?.profileImage ? (
            <img
              src={userData.profileImage}
              alt="User"
              className="w-16 h-16 rounded-full object-cover border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm border">
              <User className="w-6 h-6" />
            </div>
          )}

          <div>
            <p className="text-lg font-semibold">{userData?.name || 'Guest User'}</p>
            <p className="text-sm text-gray-500">{userData?.email || 'No email'}</p>
          </div>
        </div>

        {/* Toggle Seller Mode */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Seller Mode</span>
          <button
            onClick={() => setIsSeller(!isSeller)}
            className={`px-4 py-1.5 text-xs rounded-full transition ${
              isSeller
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {isSeller ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Account Actions */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: 'My Orders', icon: <ShoppingBag className="w-5 h-5" />, path: '/cart' },
            { label: 'My Wishlist', icon: <Heart className="w-5 h-5" />, path: '/wishlist' },
            { label: 'Saved Addresses', icon: <MapPin className="w-5 h-5" />, path: '/addresses' },
            { label: 'Logout', icon: <LogOut className="w-5 h-5" />, path: '/logout' },
          ].map(({ label, icon, path }) => (
            <a
              key={label}
              href={path}
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition cursor-pointer"
            >
              {icon}
              <span className="text-sm font-medium">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
