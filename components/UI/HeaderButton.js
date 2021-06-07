import * as React from "react";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";
import { Platform } from "react-native";
import Colors from "../../constants/Colors";

export const IoniconsHeaderButton = (props) => {
  return (
    <HeaderButton
      IconComponent={Ionicons}
      iconSize={25}
      color={Platform.OS === "android" ? "white" : Colors.primary}
      {...props}
    />
  );
};

export const AntDesignHeaderButton = (props) => {
  return (
    <HeaderButton
      IconComponent={AntDesign}
      iconSize={22}
      color={Platform.OS === "android" ? "white" : Colors.primary}
      {...props}
    />
  );
};

export const MaterialCommunityHeaderButton = (props) => {
  return (
    <HeaderButton
      IconComponent={MaterialCommunityIcons}
      iconSize={22}
      color={Platform.OS === "android" ? "white" : Colors.primary}
      {...props}
    />
  );
};
