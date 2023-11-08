interface Product {
  name: string;
  brand: string;
  category: {
    name: string;
  };
  price: string;

  // other properties
}

export class OrderItem {
  product?: Product;
  quantity?: number;
}
