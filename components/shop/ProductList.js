import React from "react";
import { View, FlatList, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cart";
import { deleteProduct } from "../../store/actions/products";
import { deleteFromCart } from "../../store/actions/cart";
import ProductItem from "../../components/shop/ProductItem";

const ProductList = (props) => {
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this product?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
          dispatch(deleteFromCart(id));
        },
      },
    ]);
  };

  const renderProductItem = ({ item }) => (
    <ProductItem
      title={item.title}
      price={`£${item.price}`}
      imageUrl={item.imageUrl}
      isOverview={props.isOverview}
      onViewDetails={() =>
        props.navigation.navigate("ProductDetailScreen", {
          productId: item.id,
          title: item.title,
        })
      }
      onAddToCart={() => dispatch(addToCart(item))}
      onEditProduct={() => props.onEditProduct(item.id)}
      onDeleteProduct={deleteHandler.bind(this, item.id)}
    />
  );

  return (
    <View>
      <FlatList
        onRefresh={props.onRefresh}
        refreshing={props.refreshing}
        numColumns={2}
        data={props.products}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
      />
    </View>
  );
};

export default ProductList;
