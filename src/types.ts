export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
  specifications: Record<string, string>;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Electronics' | 'Fashion' | 'Shoes' | 'Watches' | 'Accessories';

export interface User {
  name: string;
  email: string;
  avatar: string;
}
