export interface Categories {
  id: number;
  title: string;
}

export interface SizeAvailable {
  size: string;
  available: boolean;
}

export interface ProductsInfo {
  id: number;
  category: number;
  title: string;
  images: string[];
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  season: string;
  heelSize: string;
  price: number;
  oldPrice: number;
  sizes: SizeAvailable[];
}

export interface SmallInfo {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
}

export interface OrderItem {
  id: number;
  price: number;
  count: number;
}

export interface OrderData {
  owner: {
    phone: string;
    address: string;
  };
  items: OrderItem[];
}

export interface CartInfo {
  id: number;
  title: string;
  size: string;
  amount: number;
  price: number;
  total: number;
}

export interface ServicesState {
  // list: SmallInfo[];
  // item: ProductsInfo | null;
  cart: CartInfo[];
  query: string;
  loading: boolean;
  error: string | null;
}