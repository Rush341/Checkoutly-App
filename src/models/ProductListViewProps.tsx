import { ApiService } from "../services/ApiServices";
import { logger } from "../utils/logger";

export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    creationAt: string; // ISO date string
    updatedAt: string;
}

export interface Product {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    images: string[];
    category: Category;
    creationAt: string;
    updatedAt: string;
}

export interface ProductListViewProps {
    products: Product[];
    filteredProducts: Product[];
    isLoading: boolean;
    onProductPress: (product: Product) => void;
    onSearch: (text: string) => void;
    searchText: string;
    filterCount: number;
    navigationToFilterScreen: ()=>void
}

export const fetchProducts = async (
    title?: string,
    categoryId?: string,
    minPrice?: string,
    maxPrice?: string
  ) => {
    try {
      const params = new URLSearchParams();
  
      if (title) params.append('title', title);
      if (categoryId) params.append('categoryId', categoryId);
      if (minPrice) params.append('price_min', minPrice);
      if (maxPrice) params.append('price_max', maxPrice);
  
      const queryString = params.toString();
      const url = `https://api.escuelajs.co/api/v1/products${queryString ? '/?' + queryString : ''}`;
      const response = await ApiService.get(url);
      return response;
    } catch (error) {
      logger.error('Failed to fetch products', error);
      return [];
    }
  };
  
  