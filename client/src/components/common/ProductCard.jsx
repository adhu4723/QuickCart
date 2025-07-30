import {
  ChartNoAxesColumnIncreasing,
  Heart,
  ShoppingBag,
  Star,
} from 'lucide-react';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import CompareModal from './CompareModal';
import { ProductContext } from '../../context/ProductContext';
import StarRating from './StarRating';



function ProductCard({ productData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [compareModal, setcompareModal] = useState(false);
  const { compareProducts } = useContext(ProductContext);

  return (
    <>
      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} productData={productData} />
      )}
      {compareModal && <CompareModal onClose={() => setcompareModal(false)} />}

      <div className="w-full shadow-lg group bg-white py-3 rounded-2xl px-2 transition-transform duration-300 transform hover:-translate-y-1">
        <div className="border border-gray-300 bg-gray-200  w-full rounded-xl relative overflow-hidden">
          <img
            className="p-4 h-[250px] w-full object-contain"
            src={productData?.img || productData?.images[0] || ''}
            alt={productData?.name || ''}
          />

          {/* Quick View Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="
              uppercase w-full bg-[#0371a8]/80 text-white py-3 
              absolute bottom-0 left-0 
              opacity-100 translate-y-0 
              md:opacity-0 md:translate-y-4 
              md:group-hover:opacity-100 md:group-hover:translate-y-0 
              transition-all duration-300 ease-in-out
              cursor-pointer
            "
          >
            quick view
          </button>
        </div>

        <div className="text-center mt-2">
          <Link className="text-gray-500 font-light uppercase text-xs">
            Accessories, Caps
          </Link>
          <h1 className="text-gray-600 line-clamp-1 capitalize">{productData?.name || ''}</h1>
          {productData?.discountedPrice ? (
            <div className="flex items-center justify-center gap-2">
              <p className="text-gray-500 line-through text-sm">₹{productData.price}</p>
              <p className="text-red-600 font-semibold text-lg">₹{productData.discountedPrice}</p>
            </div>
          ) : (
            <p className="text-gray-800 font-medium">₹{productData.price}</p>
          )}

          {/* ⭐ Star Rating */}
          <StarRating rating={productData?.rating || 0} />

          <div className="flex justify-center gap-2 mt-2 relative">
            {/* Heart Icon */}
            <button
              className="
                cursor-pointer
                absolute left-0 top-1/2 -translate-y-1/2 
                opacity-100 translate-x-0 
                md:opacity-0 md:-translate-x-4 
                md:group-hover:opacity-100 md:group-hover:translate-x-0 
                transition-all duration-300 ease-in-out
                bg-gray-200 p-2 rounded
              "
            >
              <Heart size={18} />
            </button>

            {/* 🛒 Add to Cart */}
            <button
              disabled={productData.stock === 0}
              className={`
                uppercase text-xs px-3 py-2 flex gap-2 items-center 
                ${productData.stock === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-800 md:group-hover:bg-gray-900 md:group-hover:text-white cursor-pointer'
                }
              `}
            >
              <ShoppingBag />
              {productData.stock === 0 ? 'Out of stock' : 'Add to cart'}
            </button>

            {/* Chart Icon */}
            <button
              onClick={() => {
                setcompareModal(true);
                compareProducts(productData._id);
              }}
              className="
                absolute right-0 top-1/2 -translate-y-1/2 
                opacity-100 translate-x-0 
                md:opacity-0 md:translate-x-4 
                md:group-hover:opacity-100 md:group-hover:translate-x-0 
                transition-all duration-300 ease-in-out
                bg-gray-200 p-2 rounded cursor-pointer
              "
            >
              <ChartNoAxesColumnIncreasing size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
