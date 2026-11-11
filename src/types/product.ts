export type Category = 'All' | 'Winter' | 'T-Shirts' | 'Full Sleeve Shirts' | 'Jackets';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  name: string;
  detail: string;
  category: Category;
  price: number;
  was?: number; // Previous price for discounted items
  tag?: 'New' | 'Low stock' | 'Sale';
  image: string;
  description?: string;
  availableSizes?: ProductSize[];
}

export interface CartItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

export interface CategoryInfo {
  name: Category;
  description: string;
}

