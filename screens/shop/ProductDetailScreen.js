import * as React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import AppButton from "../../components/UI/AppButton";
import { addToCart } from "../../store/actions/cart";
import Colors from "../../constants/Colors";

const ProductDetailScreen = ({ navigation, route }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const product = products.find(
    (product) => product.id === route.params.productId
  );

  const source = { uri: product.imageUrl };

  return (
    <ScrollView contentContainerStyle={styles.productContainer}>
      <View>
        <View style={styles.imgContainer}>
          <Image source={source} style={styles.img} />
        </View>
        <View>
          <View style={styles.shoppingContainer}>
            <FontAwesome
              name="shopping-cart"
              size={24}
              color={Colors.primary}
            />
            <Text style={styles.shoppingText}>Shopping</Text>
          </View>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{`£${product.price}`}</Text>
        <AppButton
          onPress={() => dispatch(addToCart(product))}
          btnStyle={styles.addBtn}
          title="ADD TO CART"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  img: {
    borderRadius: 5,
    width: "100%",
    height: 350,
  },
  shoppingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  shoppingText: {
    fontWeight: "bold",
    color: Colors.primary,
    marginLeft: 5,
  },
  title: {
    fontSize: 30,
    fontFamily: "open-sans-bold",
    marginBottom: 10,
  },
  description: {
    fontFamily: "open-sans",
    color: "#536162",
    fontSize: 14,
  },
  priceContainer: {
    borderTopWidth: 1,
    borderTopColor: "#536162",
    paddingVertical: 15,
    marginVertical: 10,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 25,
    fontWeight: "bold",
  },
  addBtn: {
    borderRadius: 20,
    backgroundColor: Colors.primary,
    width: "100%",
    paddingVertical: 20,
    marginTop: 20,
  },
});

export default ProductDetailScreen;
