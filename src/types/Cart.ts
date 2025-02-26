interface CartState {
    cart: Products[];
  }
  
  type CartAction =
    | { type: "SET_CART"; cart: Products[] }
    | { type: "ADD_TO_CART"; product: Products }
    | { type: "REMOVE_FROM_CART"; id: string }
    | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
    | { type: "CLEAR_CART" };