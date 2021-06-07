import * as React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const CartItem = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const item = cartItems[props.id];
  const source = { uri: item.productImg };

  return (
    <View style={styles.itemContainer}>
      <Image source={source} style={styles.img} />
      <View style={styles.overviewContainer}>
        <View style={styles.detailsContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {item.productTitle}
          </Text>
          <Text style={styles.price}>{`£${item.productPrice}`}</Text>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={props.onDeleteItem}>
            <Entypo
              style={{ alignSelf: "flex-end" }}
              name="cross"
              size={18}
              color="#536162"
            />
          </TouchableOpacity>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={props.onAddItem}>
              <AntDesign name="pluscircle" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{`${item.quantity < 10 ? "0" : ""}${
              item.quantity
            }`}</Text>
            <TouchableOpacity onPress={props.onRemoveItem}>
              <AntDesign name="minuscircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  overviewContainer: {
    paddingLeft: 20,
    paddingVertical: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  img: {
    borderRadius: 20,
    width: 70,
    height: 70,
  },
  detailsContainer: {
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    width: 150,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 16,
  },
  quantity: {
    marginHorizontal: 6,
    fontFamily: "open-sans-bold",
  },
  optionsContainer: {
    justifyContent: "space-between",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CartItem;
