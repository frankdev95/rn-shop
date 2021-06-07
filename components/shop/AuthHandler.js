import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShopNavigator from "../../navigation/ShopNavigator";
import AuthNavigator from "../../navigation/AuthNavigator";
import { authSession } from "../../store/actions/auth";
import Spinner from "../../components/UI/Spinner";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthHandler = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) return;

      const parsedData = JSON.parse(userData);
      const { token, userId, expiration } = parsedData;

      if (new Date(expiration) <= new Date() || !token || !userId) return;

      dispatch(authSession(token, userId));
    };

    tryLogin();
  }, []);
  return isLoggedIn ? <ShopNavigator /> : <AuthNavigator />;
};
export default AuthHandler;
