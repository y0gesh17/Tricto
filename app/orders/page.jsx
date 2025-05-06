'use client';
import { useAppContext } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import React from 'react';

const Orders = () => {
  const { orders, currency } = useAppContext();

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-10">
        <h1 className="text-3xl font-semibold text-gray-700 mb-8">My Orders</h1>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders placed yet.</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <div key={index} className="border border-gray-300 rounded-xl p-6 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg text-gray-700 font-medium">Order #{order.id}</p>
                  <p className="text-sm text-orange-600 font-semibold">{order.status}</p>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Placed on: {new Date(order.placedAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Deliver to: {order.address.fullName}, {order.address.area}, {order.address.city}, {order.address.state}
                </p>

                <table className="min-w-full text-sm table-auto border-t border-gray-300 pt-4">
                  <thead>
                    <tr className="text-left text-gray-600 border-b">
                      <th className="py-2">Product</th>
                      <th className="py-2">Qty</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="flex items-center gap-3 py-4 pr-4">
                          <Image
                            src={item.image[0]}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="rounded-md bg-gray-100 w-12 h-12 object-cover"
                          />
                          <span className="text-gray-800">{item.name}</span>
                        </td>
                        <td className="py-4">{item.quantity}</td>
                        <td className="py-4">
                          {currency}
                          {item.flag == 1 ? item.discountedPrice : item.offerPrice}
                        </td>
                        <td className="py-4">
                          {currency}
                          {(item.quantity * (item.flag == 1 ? item.discountedPrice : item.offerPrice)).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
