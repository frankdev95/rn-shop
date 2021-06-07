import Order from "../../models/order";
export const ADD_ORDER = "ADD_ORDER";
export const GET_ORDERS = "GET_ORDERS";
export const DELETE_ORDER = "DELETE_ORDER";

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const date = new Date();
      const response = await fetch(
        `https://rn-shop-63fe7-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems,
            amount: totalAmount,
            date: date.toISOString(),
          }),
        }
      );

      if (!response.ok) throw new Error("Error adding order.");

      const data = await response.json();

      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: data.name,
          items: cartItems,
          amount: totalAmount,
          date: date,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://rn-shop-63fe7-default-rtdb.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) throw new Error("Error receiving orders");
      const data = await response.json();

      const loadedOrders = [];
      if (data) {
        for (const [key, value] of Object.entries(data)) {
          loadedOrders.push(
            new Order(key, value.items, value.amount, new Date(value.date))
          );
        }
      }

      dispatch({ type: GET_ORDERS, orders: loadedOrders });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteOrder = (orderId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-shop-63fe7-default-rtdb.firebaseio.com/orders/u1/${orderId}.json?auth=${token}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Error deleting order");

      dispatch({ type: DELETE_ORDER, orderId: orderId });
    } catch (error) {
      throw error;
    }
  };
};
