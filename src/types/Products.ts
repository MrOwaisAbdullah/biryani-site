interface Products {
    _id: string;
    title: string;
    price: number;
    priceWithoutDiscount?: number;
    image: string;
    description?: string;
    slug?: {
      current: string;
    }
    quantity?: number; 
    seller?: { _id: string };
    weight?: number;
  }