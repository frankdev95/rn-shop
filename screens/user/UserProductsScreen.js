import React from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/use-fetch";
import ProductList from "../../components/shop/ProductList";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {
  IoniconsHeaderButton,
  AntDesignHeaderButton,
} from "../../components/UI/HeaderButton";
import { fetchProducts } from "../../store/actions/products";

const UserProductsScreen = ({ navigation, route }) => {
  const products = useSelector((state) => state.products.userProducts);
  const [isLoading, isError, loadOrders] = useFetch(fetchProducts, navigation);

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
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={AntDesignHeaderButton}>
            <Item
              iconName="plussquareo"
              onPress={() => navigation.navigate("EditProductScreen", {})}
            />
          </HeaderButtons>
        );
      },
    });
  }, [navigation]);

  return (
    <ProductList
      navigation={navigation}
      products={products}
      isOverview={false}
      onEditProduct={(productId) =>
        navigation.navigate("EditProductScreen", {
          productId: productId,
        })
      }
    />
  );
};

export default UserProductsScreen;
