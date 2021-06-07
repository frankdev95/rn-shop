import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  REMOVE_FROM_CART,
} from "../actions/cart";
import { DELETE_PRODUCT } from "../actions/products";
import CartItem from "../../models/cartItem";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      let configuredItem;
      if (state.items[addedProduct.id]) {
        configuredItem = new CartItem(
          addedProduct.id,
          state.items[addedProduct.id].quantity + 1,
          addedProduct.price,
          addedProduct.title,
          addedProduct.imageUrl,
          state.items[addedProduct.id].totalAmount + addedProduct.price
        );
      } else {
        configuredItem = new CartItem(
          addedProduct.id,
          1,
          addedProduct.price,
          addedProduct.title,
          addedProduct.imageUrl,
          addedProduct.price
        );
      }

      return {
        items: { ...state.items, [addedProduct.id]: configuredItem },
        totalAmount: state.totalAmount + addedProduct.price,
      };
    case REMOVE_FROM_CART:
      let productId = action.productId;
      const productToRemove = { ...state.items[productId] };
      let updatedItems = { ...state.items };

      if (productToRemove.quantity > 1) {
        productToRemove.quantity -= 1;
        productToRemove.totalAmount -= productToRemove.productPrice;
        updatedItems = { ...state.items, [productId]: productToRemove };
      } else {
        delete updatedItems[productId];
      }

      return {
        items: updatedItems,
        totalAmount: state.totalAmount - productToRemove.productPrice,
      };

    case DELETE_FROM_CART:
      productId = action.productId;

      if (!state.items[productId]) return state;

      const itemTotal = state.items[productId].totalAmount;
      updatedItems = { ...state.items };

      delete updatedItems[productId];

      return {
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    case ADD_ORDER:
      return initialState;
    default:
      return state;
  }
  return state;
};
