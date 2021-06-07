import PRODUCTS from "../../data/product";
import Product from "../../models/product";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTS,
} from "../actions/products";
let isLoaded = false;

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      };
    case DELETE_PRODUCT:
      return {
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.productId
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.productId
        ),
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.updatedFields.id,
        action.updatedFields.userId,
        action.updatedFields.title,
        action.updatedFields.url,
        action.updatedFields.description,
        +action.updatedFields.price
      );

      return {
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case EDIT_PRODUCT:
      const userProductIndex = state.userProducts.findIndex(
        (product) => product.id === action.productInfo.productId
      );

      const productIndex = state.availableProducts.findIndex(
        (product) => product.id === action.productInfo.productId
      );

      const editedProduct = new Product(
        action.productInfo.productId,
        state.userProducts[userProductIndex].ownerId,
        action.productInfo.fields.title,
        action.productInfo.fields.url,
        action.productInfo.fields.description,
        state.userProducts[userProductIndex].price
      );

      availableProducts = [...state.availableProducts];
      availableProducts[productIndex] = editedProduct;

      const userProducts = [...state.userProducts];
      userProducts[userProductIndex] = editedProduct;

      return {
        availableProducts: availableProducts,
        userProducts: userProducts,
      };

    default:
      return state;
  }
};
