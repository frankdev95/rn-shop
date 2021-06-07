import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import AppButton from "../../components/UI/AppButton";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";

const CartScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const cartItems = useSelector((state) => {
    const transformedItems = [];
    for (const key in state.cart.items) {
      transformedItems.push({
        productId: key,
        quantity: state.cart.items[key].quantity,
        productPrice: state.cart.items[key].productPrice,
        productTitle: state.cart.items[key].productTitle,
        productImg: state.cart.items[key].productImg,
        totalAmount: state.cart.items[key].totalAmount,
      });
    }
    return transformedItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const products = useSelector((state) => state.products.availableProducts);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const itemsAmount = cartItems.reduce((acc, val) => (acc += val.quantity), 0);

  const shippingAmount = 4.99;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      Alert.alert(isError, "Could not add order, please try again", [
        {
          text: "Ok",
        },
      ]);
    }
  }, [isError]);

  const renderCartItem = ({ item }) => (
    <CartItem
      id={item.productId}
      onDeleteItem={() => dispatch(cartActions.deleteFromCart(item.productId))}
      onAddItem={() => {
        const currentProduct = products.find(
          (product) => product.id === item.productId
        );
        dispatch(cartActions.addToCart(currentProduct));
      }}
      onRemoveItem={() => dispatch(cartActions.removeFromCart(item.productId))}
    />
  );

  const sendOrderHandler = async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      await dispatch(orderActions.addOrder(cartItems, totalAmount));
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={renderCartItem}
      />
      <View style={styles.overviewContainer}>
        <View style={styles.overviewField}>
          <Text>Subtotal</Text>
          <Text>{`£${totalAmount.toFixed(2)} GBP`}</Text>
        </View>
        <View style={styles.overviewField}>
          <Text>Shipping</Text>
          <Text>{`£${+shippingAmount.toFixed(2)} GBP`}</Text>
        </View>
        <View style={styles.overviewField}>
          <Text>Bag Total</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginRight: 10 }}>{`${itemsAmount} Items`}</Text>
            <Text>{`£${(totalAmount + shippingAmount).toFixed(2)} GBP`}</Text>
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <AppButton
          onPress={sendOrderHandler}
          title="Proceed to Checkout"
          btnStyle={styles.checkoutBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkoutBtn: {
    borderRadius: 30,
    backgroundColor: Colors.primary,
    width: "90%",
    paddingVertical: 20,
  },
  btnContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  overviewContainer: {
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  overviewField: {
    marginVertical: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartScreen;
