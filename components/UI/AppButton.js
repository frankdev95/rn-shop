import * as React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const AppButton = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...props.btnStyle }}
      activeOpacity={props.activeOpacity}
      onPress={props.onPress}
    >
      <Text style={{ ...styles.text, ...props.textStyle }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 13,
    color: "white",
    textAlign: "center",
  },
});

export default AppButton;
