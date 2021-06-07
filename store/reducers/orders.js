import * as React from "react";
import Order from "../../models/order";
import { ADD_ORDER, DELETE_ORDER, GET_ORDERS } from "../actions/orders";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return { orders: action.orders };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );

      return {
        orders: state.orders.concat(newOrder),
      };
    case DELETE_ORDER:
      const updatedOrders = state.orders.filter(
        (order) => order.id !== action.orderId
      );
      console.log(updatedOrders);
      return { orders: updatedOrders };
    default:
      return state;
  }
};
