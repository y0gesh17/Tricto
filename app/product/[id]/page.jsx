"use client"
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Image from "next/image";
// import Navbar from "../../../components/Navbar";
// import Footer from "../../../components/Footer";
// import { useAppContext } from "../context/AppContext";
// import Loading from "./Loading";
// import ProductCard from "./ProductCard";
// import assets from "../assets";

const Product = () => {
    const { id } = useParams();
    const { products, router, addToCart } = useAppContext();

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);
    const [selectedTier, setSelectedTier] = useState(0);

    const discountTiers = [
        { threshold: 100000, discount: 75, slot: productData?.onelakhslot },
        { threshold: 50000, discount: 50, slot: productData?.fiftythousandslot },
        { threshold: 25000, discount: 25, slot: productData?.twentyfivethousandslot },
    ];

    const getDiscountedPrice = (basePrice, discount) =>
        Math.round(basePrice - (basePrice * discount) / 100);

    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        setProductData(product);
    };

    useEffect(() => {
        fetchProductData();
    }, [id, products.length]);

    return productData ? (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="px-5 lg:px-16 xl:px-20">
                        <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                            <Image
                                src={mainImage || productData.image[0]}
                                alt="alt"
                                className="w-full h-auto object-cover mix-blend-multiply"
                                width={1280}
                                height={720}
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {productData.image.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => setMainImage(image)}
                                    className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                                >
                                    <Image
                                        src={image}
                                        alt="alt"
                                        className="w-full h-auto object-cover mix-blend-multiply"
                                        width={1280}
                                        height={720}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
                            {productData.name}
                        </h1>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                                <Image className="h-4 w-4" src={assets.star_dull_icon} alt="star_dull_icon" />
                            </div>
                            <p>(4.5)</p>
                        </div>
                        <p className="text-gray-600 mt-3">
                            {productData.description}
                        </p>

                        <div className="space-y-2 mt-4">
                            {discountTiers.map((tier, index) => {
                                const progress = Math.min((tier.slot || 0) / tier.threshold * 100, 100);
                                const price = getDiscountedPrice(productData.offerPrice, tier.discount);
                                return (
                                    <div key={index}>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-600">
                                                {tier.discount}% off if {tier.threshold.toLocaleString()} bought
                                            </span>
                                            <input
                                                type="radio"
                                                name="tier-select"
                                                checked={selectedTier === index}
                                                onChange={() => setSelectedTier(index)}
                                                className="accent-orange-500"
                                            />
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-green-500"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            {Math.min(tier.slot || 0, tier.threshold).toLocaleString()} / {tier.threshold.toLocaleString()} purchased
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <p className="text-3xl font-medium mt-6">
                            ${getDiscountedPrice(productData.offerPrice, discountTiers[selectedTier].discount)}
                            <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                                ${productData.price}
                            </span>
                        </p>

                        <hr className="bg-gray-600 my-6" />
                        <div className="overflow-x-auto">
                            <table className="table-auto border-collapse w-full max-w-72">
                                <tbody>
                                    <tr>
                                        <td className="text-gray-600 font-medium">Brand</td>
                                        <td className="text-gray-800/50 ">Generic</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-600 font-medium">Color</td>
                                        <td className="text-gray-800/50 ">Multi</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-600 font-medium">Category</td>
                                        <td className="text-gray-800/50">{productData.category}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center mt-10 gap-4">
                            <button onClick={() => addToCart(productData._id)} className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                                Add to Cart
                            </button>
                            <button onClick={() => { addToCart(productData._id); router.push('/cart') }} className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition">
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mb-4 mt-16">
                        <p className="text-3xl font-medium">Featured <span className="font-medium text-orange-600">Products</span></p>
                        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                        {products.slice(0, 5).map((product, index) => <ProductCard key={index} product={product} />)}
                    </div>
                    <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                        See more
                    </button>
                </div>
            </div>
            <Footer />
        </>
    ) : <Loading />;
};

export default Product;
