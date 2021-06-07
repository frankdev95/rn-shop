import * as React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import AppButton from "../UI/AppButton";
import Colors from "../../constants/Colors";

const ProductItem = (props) => {
  const source = { uri: props.imageUrl };
  return (
    <TouchableOpacity style={{ width: "50%" }} onPress={props.onViewDetails}>
      <View style={styles.productContainer}>
        <View style={styles.imgContainer}>
          <Image source={source} style={styles.img} />
        </View>
        <View style={styles.productInfoContainer}>
          <View style={styles.productDetails}>
            <Text style={styles.price}>{props.price}</Text>
            <Text style={styles.title}>{props.title}</Text>
          </View>
          <View>
            {props.isOverview && (
              <View style={styles.productOptions}>
                <AppButton
                  btnStyle={styles.detailsBtn}
                  title="Details"
                  onPress={props.onViewDetails}
                />
                <AppButton
                  btnStyle={styles.addBtn}
                  textStyle={{ fontSize: 22 }}
                  title="+"
                  onPress={props.onAddToCart}
                />
              </View>
            )}
            {!props.isOverview && (
              <View style={styles.productOptions}>
                <AppButton
                  btnStyle={styles.detailsBtn}
                  title="Edit"
                  onPress={props.onEditProduct}
                />
                <TouchableOpacity onPress={props.onDeleteProduct}>
                  <Entypo name="trash" size={24} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    borderColor: "#d1d9d9",
    borderWidth: 1,
    height: 300,
    padding: 10,
  },
  imgContainer: {
    height: "60%",
  },
  img: {
    borderRadius: 5,
    width: "100%",
    height: "100%",
  },
  productInfoContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 5,
  },
  productDetails: {},
  price: {
    fontFamily: "open-sans",
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontFamily: "open-sans",
    color: "#536162",
    fontSize: 13,
  },
  productOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  addBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 2,
  },
});

export default ProductItem;
