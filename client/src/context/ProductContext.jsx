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

  const handleFilterProduct = (category, subCategory, sortdata) => {
    console.log('sortdata', sortdata);
    switch (sortdata) {
      case 'ratingInc':
        setFilteredData(productData.sort((a,b)=>a.rating-b.rating))
        
        break;
        case 'ratingDec':
        setFilteredData(productData.sort((a,b)=>b.rating-a.rating))
        
        break;
        case 'priceInc':
        setFilteredData(productData.sort((a,b)=>a.price-b.price))
        
        break;
         case 'priceDec':
        setFilteredData(productData.sort((a,b)=>b.price-a.price))
        
        break;
    
      default:
        console.log('invalid');
        
        break;
    }

    if (subCategory) {
      // Filter by both category and subcategory
      setFilteredData(productData.filter(
        item => item.category === category && item.subCategory === subCategory
      ));
    } else {
      // Only category-level filter
      setFilteredData(productData.filter(item => item.category === category));
    }
  };

  console.log(filteredData);






  return (
    <ProductContext.Provider value={{ compareData, compareProducts, removeproduct, handleFilterProduct, filteredData }}>
      {children}
    </ProductContext.Provider>
  );
};
