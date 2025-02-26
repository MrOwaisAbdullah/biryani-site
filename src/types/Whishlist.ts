export interface WishlistAction {
    type: 'ADD_TO_WISHLIST' | 'REMOVE_FROM_WISHLIST' | 'CLEAR_WISHLIST' | 'SET_WISHLIST';
    product?: Products;  
    id?: string;        
  }
  
  export interface WishlistItem {
    _id: string;
    title: string;
    price: number;
    image: string;
    slug: { current: string };
  }