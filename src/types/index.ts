export interface Tyre {
  _id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  sales?: number;
  size?: string;
  description?: string;
  image?: string;
  salesHistory?: SaleRecord[];
}

export interface SaleRecord {
  date: Date;
  quantity: number;
}

export interface Brand {
  name: string;
  color: string;
  logo?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}