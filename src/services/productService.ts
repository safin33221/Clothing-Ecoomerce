import { Category, CategoryInfo, Product } from '@/types/product';
import { CATEGORIES, MOCK_PRODUCTS } from '@/data/mockProducts';

/**
 * =====================================================================
 * Product Service (API Integration Layer)
 * =====================================================================
 * This service acts as an abstraction between your UI and the backend.
 * Currently, it serves data from local mock data.
 * 
 * To connect your real backend API, simply uncomment the fetch() logic
 * and point it to your API endpoint (e.g. process.env.NEXT_PUBLIC_API_URL).
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const productService = {
  /**
   * Fetch all products or filter by category
   */
  async getProducts(category: Category = 'All'): Promise<Product[]> {
    // === [BACKEND CONNECT OPTION] ===
    // If you have a backend, simply uncomment:
    // const res = await fetch(`${API_BASE_URL}/api/products${category !== 'All' ? `?category=${category}` : ''}`);
    // if (!res.ok) throw new Error('Failed to fetch products');
    // return res.json();

    // Default: Mock data response with simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 80));

    if (category === 'All') {
      return [...MOCK_PRODUCTS];
    }
    return MOCK_PRODUCTS.filter((p) => p.category === category);
  },

  /**
   * Fetch single product by ID
   */
  async getProductById(id: string): Promise<Product | null> {
    // === [BACKEND CONNECT OPTION] ===
    // const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
    // if (!res.ok) return null;
    // return res.json();

    await new Promise((resolve) => setTimeout(resolve, 50));
    const item = MOCK_PRODUCTS.find((p) => p.id === id);
    return item ? { ...item } : null;
  },

  /**
   * Fetch all category definitions and descriptions
   */
  async getCategories(): Promise<CategoryInfo[]> {
    // === [BACKEND CONNECT OPTION] ===
    // const res = await fetch(`${API_BASE_URL}/api/categories`);
    // if (!res.ok) throw new Error('Failed to fetch categories');
    // return res.json();

    return [...CATEGORIES];
  },
};

