import { createContext, useState } from "react";
import { productData } from "../assets/Data/productData";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [compareData, setCompareData] = useState([]);
  const [filteredData, setFilteredData] = useState([])

  const compareProducts = (id) => {
    // Check if the product already exists
    const alreadyExists = compareData.some((item) => item.id === id);
    if (!alreadyExists) {
      const productToAdd = productData.find((item) => item.id === id);
      if (productToAdd) {
        setCompareData((prev) => [...prev, productToAdd]);
      }
    }
  };

  const removeproduct = (id) => {
    setCompareData(prev => prev.filter(items => items.id != id))
  }

  const handleFilterProduct = (category, subCategory, sortdata, priceRange, availability) => {
  let filtered = productData;

  // Filter by category
  if (category) {
    filtered = filtered.filter(item => item.category === category);
  }

  // Filter by subcategory
  if (subCategory) {
    filtered = filtered.filter(item => item.subCategory === subCategory);
  }

  // Filter by price range
  const [minPrice, maxPrice] = priceRange;
  filtered = filtered.filter(item => item.price >= minPrice && item.price <= maxPrice);

  // Filter by availability
  filtered = filtered.filter(item => {
    if (availability.inStock && item.stock > 0) return true;
    if (availability.outOfStock && item.stock === 0) return true;
    return false;
  });

  

  // Sorting
  switch (sortdata) {
    case 'ratingInc':
      filtered = filtered.sort((a, b) => a.rating - b.rating);
      break;
    case 'ratingDec':
      filtered = filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'priceInc':
      filtered = filtered.sort((a, b) => a.price - b.price);
      break;
    case 'priceDec':
      filtered = filtered.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  setFilteredData(filtered);
};


  console.log(filteredData);






  return (
    <ProductContext.Provider value={{ compareData, compareProducts, removeproduct, handleFilterProduct, filteredData }}>
      {children}
    </ProductContext.Provider>
  );
};
