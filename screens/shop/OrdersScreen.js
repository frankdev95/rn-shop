import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { IoniconsHeaderButton } from "../../components/UI/HeaderButton";
import { fetchOrders } from "../../store/actions/orders";
import OrderItem from "../../components/shop/OrderItem";
import Colors from "../../constants/Colors";
import AppButton from "../../components/UI/AppButton";

const OrdersScreen = ({ navigation, route }) => {
  const orders = useSelector((state) => state.orders.orders);
  const renderOrderItem = ({ item }) => <OrderItem id={item.id} />;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      await dispatch(fetchOrders());
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const focusListener = navigation.addListener("focus", loadOrders);
    loadOrders();

    return focusListener;
  }, [loadOrders]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item
              iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              onPress={() => navigation.toggleDrawer()}
            />
          </HeaderButtons>
        );
      },
    });
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && !isError && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No orders to show, make some purchases!</Text>
      </View>
    );
  }

  if (!isLoading && isError) {
    return (
      <View style={styles.centered}>
        <Text>{isError}</Text>
        <AppButton title="Try Again" onPress={loadOrders} />
      </View>
    );
  }

  return (
    <FlatList
      style={{ marginTop: 20 }}
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderOrderItem}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
