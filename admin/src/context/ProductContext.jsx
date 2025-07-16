// context/ProductContext.js
import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add product with images (FormData)
  const addProduct = async (formValues, fileList) => {
    const formData = new FormData();
    for (const key in formValues) {
      formData.append(key, formValues[key]);
    }

    fileList.forEach(file => {
      formData.append('images', file.originFileObj);
    });

    try {
      const res = await axiosInstance.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProducts(prev => [...prev, res.data]);
      return { success: true };
    } catch (err) {
      console.error('Error adding product:', err);
      return { success: false, error: err.response?.data?.error || 'Something went wrong' };
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
