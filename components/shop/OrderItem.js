import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { EvilIcons, Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteOrder } from "../../store/actions/orders";
import Colors from "../../constants/Colors";
import OrderSummary from "./OrderSummary";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const orders = useSelector((state) => state.orders.orders);
  const order = orders.find((order) => order.id === props.id);
  const dispatch = useDispatch();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.orderContainer}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderId}>{order.id.toString().slice(1, 5)}</Text>
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.total}>{`£${order.totalAmount.toFixed(
              2
            )}`}</Text>
            <Text style={styles.date}>{order.readableDate}</Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowDetails((prev) => !prev)}
            style={styles.btnContainer}
          >
            <EvilIcons
              style={styles.icon}
              name="arrow-right"
              size={44}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteBtnContainer}
            onPress={() => dispatch(deleteOrder(order.id))}
          >
            <Entypo name="circle-with-cross" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {showDetails && <OrderSummary orderId={props.id} />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "dashed",
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
  },
  orderContainer: {
    flexDirection: "row",
  },
  orderIdContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: 75,
    height: 75,
    marginRight: 15,
  },
  orderId: {
    fontSize: 20,
    color: Colors.primary,
  },
  summaryContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 5,
  },
  detailsContainer: {
    justifyContent: "space-between",
  },
  total: {
    fontSize: 22,
    fontFamily: "open-sans",
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
  },
  btnContainer: {
    alignSelf: "center",
    transform: [{ rotate: "90deg" }],
  },
  deleteBtnContainer: {
    position: "absolute",
    right: -5,
    top: -5,
  },
});

export default OrderItem;
