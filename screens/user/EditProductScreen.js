import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialCommunityHeaderButton } from "../../components/UI/HeaderButton";
import { createProduct, editProduct } from "../../store/actions/products";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";

const formReducer = (state, action) => {
  if (action.type === "UPDATE") {
    const inputValidities = {
      ...state.inputValidities,
      [action.name]: action.isValid,
    };

    let formIsValid = true;
    for (const key in inputValidities)
      formIsValid = formIsValid && inputValidities[key];

    return {
      inputValues: {
        ...state.inputValues,
        [action.name]: action.value,
      },
      inputValidities: inputValidities,
      formIsValid,
    };
  }
  return state;
};

const EditProductScreen = ({ navigation, route }) => {
  const { productId } = route.params;
  const products = useSelector((state) => state.products.userProducts);
  const product = products.find((product) => product.id === productId);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const dispatch = useDispatch();

  const [formState, dispactchFormState] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : "",
      url: product ? product.imageUrl : "",
      price: product ? product.price : "",
      description: product ? product.description : "",
    },
    inputValidities: {
      title: product ? true : false,
      url: product ? true : false,
      price: product ? true : false,
      description: product ? true : false,
    },
    formIsValid: product ? true : false,
  });

  useEffect(() => {
    if (isError) {
      const alertTitle = product
        ? "Edit product unsuccessful"
        : "Create product unsuccessful";
      Alert.alert(alertTitle, isError, [
        {
          text: "Ok",
        },
      ]);
      setIsError(null);
    }
  }, [isError]);

  const changeTextHandler = useCallback(
    (name, value, isValid) => {
      dispactchFormState({
        type: "UPDATE",
        name,
        value,
        isValid,
      });
    },
    [dispactchFormState]
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: productId ? "Edit Product" : "Add Product",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialCommunityHeaderButton}>
          <Item
            iconName="sticker-check-outline"
            onPress={() => {
              if (!formState.formIsValid) {
                Alert.alert(
                  "Please check fields",
                  "Please make sure all fields are valid",
                  [
                    {
                      text: "Ok",
                    },
                  ]
                );
                return;
              }

              const dispatchProduct = async () => {
                setIsLoading(true);
                try {
                  if (product)
                    await dispatch(
                      editProduct(productId, formState.inputValues)
                    );

                  if (!product)
                    await dispatch(createProduct(formState.inputValues));
                  navigation.goBack();
                } catch (error) {
                  setIsError(error.message);
                }

                setIsLoading(false);
              };
              dispatchProduct();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, product, formState]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          placeholder="Enter title:"
          autoCapitalize="sentences"
          initialValue={formState.inputValues.title}
          initialValidity={formState.inputValidities.title}
          required={true}
          onInputChange={changeTextHandler}
          errorText="Please enter a title"
        />
        <Input
          id="url"
          label="Image URL"
          name="url"
          placeholder="Enter url:"
          initialValue={formState.inputValues.url}
          initialValidity={formState.inputValidities.url}
          onInputChange={changeTextHandler}
          required={true}
          errorText="Please enter an image url"
        />
        {!productId && (
          <Input
            id="price"
            label="Price"
            name="price"
            placeholder="Enter price:"
            keyboardType="decimal-pad"
            min={0}
            onInputChange={changeTextHandler}
          />
        )}
        <Input
          id="description"
          label="Description"
          name="description"
          placeholder="Enter description:"
          multiline
          numberOfLines={3}
          initialValue={formState.inputValues.description}
          initialValidity={formState.inputValidities.description}
          onInputChange={changeTextHandler}
          required={true}
          errorText="Please enter a description"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
