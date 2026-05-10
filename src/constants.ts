import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Acoustic Ultra Headphones',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    description: 'Experience pure sound with active noise cancellation and 40-hour battery life.',
    specifications: {
      Connectivity: 'Bluetooth 5.2',
      'Battery Life': '40 Hours',
      Drivers: '40mm Neodymium',
      Weight: '250g'
    }
  },
  {
    id: '2',
    name: 'Midnight Chronograph Watch',
    price: 189.50,
    category: 'Watches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    description: 'A classic timepiece with a modern twist. Sapphire glass and genuine leather strap.',
    specifications: {
      Movement: 'Swiss Quartz',
      'Water Resistance': '50m',
      Case: 'Stainless Steel',
      Glass: 'Sapphire'
    }
  },
  {
    id: '3',
    name: 'Tempo Canvas Runners',
    price: 89.00,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    description: 'Minimalist canvas sneakers built for everyday durability and simple style.',
    specifications: {
      Material: 'Organic Canvas',
      Sole: 'Natural Rubber',
      Closure: 'Lace-up',
      Ventilation: 'High'
    }
  },
  {
    id: '4',
    name: 'Terra Suede Tote',
    price: 185.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    description: 'A spacious and structure-neutral tote handcrafted from sustainably sourced suede.',
    specifications: {
      Material: 'Premium Suede',
      Hardware: 'Matte Steel',
      Capacity: '12L',
      Internal: 'Zip Pocket'
    }
  },
  {
    id: '5',
    name: 'Horizon Vision Frames',
    price: 210.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    description: 'Elegant, lightweight frames equipped with blue-light filtering and smart audio.',
    specifications: {
      Lenses: 'Blue-light Tech',
      Audio: 'Open-ear Spacial',
      Weight: '32g',
      Charging: 'Magnetic'
    }
  },
  {
    id: '6',
    name: 'Urban Explorer Jacket',
    price: 245.00,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    rating: 4.4,
    description: 'Water-resistant and windproof jacket for the modern adventurer.',
    specifications: {
      Shell: 'Gore-Tex',
      Lining: 'Merino Wool',
      Zippers: 'YKK Waterproof',
      Pockets: '6'
    }
  },
  {
    id: '7',
    name: 'Minimalist Card Holder',
    price: 45.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    description: 'Slim profiles only. Fits up to 8 cards and folded cash.',
    specifications: {
      Material: 'Italian Leather',
      Security: 'RFID Blocking',
      Thickness: '3mm',
      Slots: '4'
    }
  },
  {
    id: '8',
    name: 'Evo Performance Pods',
    price: 159.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    description: 'Total freedom. Sweat-proof earbuds with industry-leading audio transparency.',
    specifications: {
      Rating: 'IPX7',
      Charging: 'USB-C / Wireless',
      Microphones: 'Dual Beamforming',
      'Transparency Mode': 'Yes'
    }
  }
];

export const CATEGORIES: string[] = ['All', 'Electronics', 'Fashion', 'Shoes', 'Watches', 'Accessories'];
