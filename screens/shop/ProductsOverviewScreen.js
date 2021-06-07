import React, { useEffect, useState, useCallback } from "react";
import useFetch from "../../hooks/use-fetch";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { IoniconsHeaderButton } from "../../components/UI/HeaderButton";
import { fetchProducts } from "../../store/actions/products";
import ProductList from "../../components/shop/ProductList";
import Colors from "../../constants/Colors";
import AppButton from "../../components/UI/AppButton";

const ProductOverviewScreen = ({ navigation, route }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const [isLoading, isError, loadProducts] = useFetch(
    fetchProducts,
    navigation
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="cart"
            iconName="md-cart"
            onPress={() => {
              navigation.navigate("CartScreen", {});
            }}
          />
        </HeaderButtons>
      ),
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

  if (!isLoading && isError) {
    return (
      <View style={styles.centered}>
        <Text>{isError}</Text>
        <AppButton title="Try Again" onPress={loadProducts} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Products available, maybe add some?</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ProductList
      onRefresh={loadProducts}
      refreshing={isLoading}
      navigation={navigation}
      products={products}
      isOverview={true}
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

export default ProductOverviewScreen;
