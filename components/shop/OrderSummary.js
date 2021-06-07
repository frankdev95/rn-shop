import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const OrderSummary = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const items = orders.find((order) => order.id === props.orderId).items;

  return (
    <View style={styles.container}>
      <View style={styles.tableHead}>
        <Text style={{ ...styles.tableChild, ...styles.tableText }}>Item</Text>
        <Text style={{ ...styles.tableChild, ...styles.tableText }}>
          Quantity
        </Text>
        <Text style={{ ...styles.tableChild, ...styles.tableText }}>Price</Text>
        <Text style={{ ...styles.tableChild, ...styles.tableText }}>Total</Text>
      </View>
      {items.map((item) => (
        <View key={item.productId} style={styles.tableRow}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ ...styles.tableChild, ...styles.productTitle }}
          >
            {item.productTitle}
          </Text>
          <Text style={styles.tableChild}>{item.quantity}</Text>
          <Text style={styles.tableChild}>{`£${item.productPrice}`}</Text>
          <Text style={styles.tableChild}>{`£${item.totalAmount}`}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  tableHead: {
    marginTop: 20,
    marginBottom: 5,
    flexDirection: "row",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  tableText: {
    fontFamily: "open-sans",
    fontSize: 15,
    fontWeight: "700",
  },
  tableRow: {
    flexDirection: "row",
    marginVertical: 5,
  },
  tableChild: {
    flexBasis: "25%",
  },
  productTitle: {
    paddingRight: 5,
  },
});

export default OrderSummary;
