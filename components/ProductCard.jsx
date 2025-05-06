import React, { useEffect, useState } from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const discountTiers = [
  { threshold: 100000, discount: 75 },
  { threshold: 50000, discount: 50 },
  { threshold: 25000, discount: 25 },
];

const ProductCard = ({ product }) => {
  const { currency, router, addToCart, editProductDiscountedPrice,products ,editProductFlag} = useAppContext();
  const [selectedTier, setSelectedTier] = useState(null);

  const purchasedCountMap = {
    25000: product.twentyfivethousandslot,
    50000: product.fiftythousandslot,
    100000: product.onelakhslot,
  };

  const getDiscountedPrice = (basePrice, discount) =>
    Math.round(basePrice - (basePrice * discount) / 100);

  // Load default tier's price to global context on mount


  return (
    <div
      onClick={(e) => {
        const target = e.target;
        if (
          target.tagName === 'INPUT' ||
          target.tagName === 'BUTTON' ||
          target.closest('button')
        )
          return;
        router.push('/product/' + product._id);
        scrollTo(0, 0);
      }}
      className="flex flex-col items-start gap-1 max-w-[240px] w-full cursor-pointer bg-white p-3 rounded-xl shadow hover:shadow-lg transition"
    >
      <div className="relative bg-gray-100 rounded-lg w-full h-52 flex items-center justify-center">
        <Image
          src={product.image[0]}
          alt={product.name}
          className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
          width={800}
          height={800}
        />
        <button
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <Image className="h-3 w-3" src={assets.heart_icon} alt="heart_icon" />
        </button>
      </div>

      <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
      <p className="text-xs text-gray-500/70 w-full truncate">{product.description}</p>

      <div className="w-full mt-2 space-y-1">
        {discountTiers.map((tier, index) => {
          const purchasedCount = purchasedCountMap[tier.threshold] || 0;
          const progress = Math.min((purchasedCount / tier.threshold) * 100, 100);
          const price = getDiscountedPrice(product.offerPrice, tier.discount);

          return (
            <div key={index}>
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium">
                  {tier.discount}% off if {tier.threshold.toLocaleString()} bought
                </label>
                <input
                  type="radio"
                  name={`tier-${product._id}`}
                  className="accent-blue-500"
                  checked={selectedTier === index}
                  onChange={() => {
                    setSelectedTier(index);
                    editProductDiscountedPrice(product._id, price);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[11px] text-gray-400">
                {Math.min(purchasedCount, tier.threshold).toLocaleString()} / {tier.threshold.toLocaleString()} purchased
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between w-full mt-2">
        <p className="text-base font-semibold">
          {currency}
       {  selectedTier==null ?product.offerPrice:getDiscountedPrice(product.offerPrice, discountTiers[selectedTier].discount)}
        </p>
        <button
          className="px-4 py-1.5 text-white bg-blue-600 hover:bg-blue-700 rounded-full text-xs"
          onClick={() => {
            addToCart(product._id);
            router.push('/cart');
          }}
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
