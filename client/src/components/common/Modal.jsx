import React, { useEffect } from 'react';
import { ChartNoAxesColumnIncreasing, Heart, ShoppingBag, X } from 'lucide-react';

function Modal({ onClose, productData }) {

    useEffect(() => {
        // Disable scroll when modal opens
        document.body.style.overflow = 'hidden';

        // Re-enable scroll when modal unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className='h-screen px-2 w-screen bg-black/50 fixed top-0 left-0 flex items-center justify-center z-50'>
            <div className='bg-white max-w-3xl w-full h-[80vh] overflow-y-scroll md:h-fit lg:h-fit p-5 shadow-2xl rounded-lg relative'>
                {/* Close button */}
                <button onClick={onClose} className='absolute top-4 right-4 text-gray-600 hover:text-black'>
                    <X size={24} />
                </button>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>

                    {/* Modal content */}
                    <img src={productData?.img} alt={productData?.name} className='w-full h-64 object-contain mb-4' />
                    <div className='space-y-2'>
                        <h1 className='text-2xl font-bold mb-2'>{productData?.name}</h1>
                        <hr className='text-gray-200 my-4' />
                        <p className='text-gray-500 font-light'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, excepturi.
                        </p>

                        <p className='text-gray-700 text-xl font-semibold mt-2 mb-2'> ${productData?.price}</p>
                        <p className='text-gray-400 font-light text-sm'>AVAILABILITY: <span className='uppercase ml-2  text-black font-semibold'>In Stock</span></p>
                        <p className='text-gray-400 font-light text-sm'>SKU: <span className='uppercase ml-2 text-black font-semibold'>In 654111995-1-1-2</span></p>
                        <hr className='text-gray-200 my-4' />
                        <div className='flex gap-2 items-center'>
                            <div className='flex items-center gap-2 border border-gray-300 w-fit '>
                                <button className='border-r cursor-pointer border-gray-300 px-2 py-2'>-</button>
                                <p className='font-semibold'>0</p>
                                <button className='border-l cursor-pointer border-gray-300 px-2 py-2'>+</button>
                            </div>
                            <button className='hover:bg-[#0371a8] cursor-pointer bg-gray-900 text-white uppercase text-xs px-3 py-2 flex gap-2 items-center'>
                                <ShoppingBag />
                                add to cart
                            </button>
                            <button className='border cursor-pointer border-gray-200 p-2 rounded'>
                                <Heart size={18} />
                            </button>
                            <button className='border cursor-pointer border-gray-200 p-2 rounded'>
                                <ChartNoAxesColumnIncreasing size={18} />
                            </button>
                        </div>
                        <hr className='text-gray-200 my-4' />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Modal;
