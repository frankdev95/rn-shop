import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ProductOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontFamily: "open-sans",
  },
};

const ShopNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="ProductOverview"
        component={ProductOverviewScreen}
        options={{ title: "All Products" }}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ title: "Shopping Bag" }}
      />
    </Stack.Navigator>
  );
};

const ordersNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{ title: "Orders" }}
      />
    </Stack.Navigator>
  );
};

const adminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="UserProductsScreen"
        component={UserProductsScreen}
        options={{ title: "Your Products" }}
      />
      <Stack.Screen name="EditProductScreen" component={EditProductScreen} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Shop"
          component={ShopNavigator}
          options={{
            drawerIcon: ({ focused, size, color }) => {
              const iconName = focused ? "cart-sharp" : "cart-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={ordersNavigator}
          options={{
            drawerIcon: ({ focused, size, color }) => {
              const iconName = focused ? "md-list" : "ios-list-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          }}
        />
        <Drawer.Screen
          name="Admin"
          component={adminNavigator}
          options={{
            drawerIcon: ({ focused, size, color }) => (
              <MaterialIcons
                name="admin-panel-settings"
                size={24}
                color="black"
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
