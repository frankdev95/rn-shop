import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://rn-shop-63fe7-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();
      const loadedProducts = [];
      for (const [key, value] of Object.entries(data)) {
        loadedProducts.push(
          new Product(
            key,
            value.ownerId || "u1",
            value.title,
            value.url,
            value.description,
            +value.price
          )
        );
      }

      dispatch({
        type: GET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(
          (product) => product.ownerId === userId
        ),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-shop-63fe7-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Error when deleting product");
      dispatch({ type: DELETE_PRODUCT, productId: productId });
    } catch (error) {
      throw error;
    }
  };
};

export const editProduct = (productId, fields) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-shop-63fe7-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fields),
        }
      );

      if (!response.ok) throw new Error("Error updating product");

      dispatch({
        type: EDIT_PRODUCT,
        productInfo: {
          productId: productId,
          fields: fields,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const createProduct = (fields) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://rn-shop-63fe7-default-rtdb.firebaseio.com/products.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...fields,
            ownerId: userId,
          }),
        }
      );

      if (!response.ok) throw new Error("Error creating new product");

      const data = await response.json();

      const updatedFields = {
        ...fields,
        id: data.name,
        userId,
      };
      dispatch({ type: CREATE_PRODUCT, updatedFields });
    } catch (error) {
      throw error;
    }
  };
};
