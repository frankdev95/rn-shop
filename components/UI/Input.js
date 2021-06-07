import React, { useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";
const INPUT_FOCUS = "INPUT_FOCUS";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      // touched is true when element loses focused
      return {
        ...state,
        touched: true,
      };
    case INPUT_FOCUS:
      return {
        ...state,
        touched: false,
      };
  }
};

const Input = (props) => {
  const [inputState, dispatchInputState] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initialValidity,
    touched: false,
  });
  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const changeTextHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text.length < props.min) {
      isValid = false;
    }
    if (props.max != null && +text.length > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatchInputState({
      type: INPUT_CHANGE,
      value: text,
      isValid,
    });
  };

  const lostFocusHandler = () =>
    dispatchInputState({
      type: INPUT_BLUR,
    });

  const focusInputHandler = () =>
    dispatchInputState({
      type: INPUT_FOCUS,
    });

  return (
    <React.Fragment>
      <View style={{ ...styles.field, ...props.fieldStyle }}>
        {props.label && <Text style={styles.label}>{props.label}</Text>}
        <TextInput
          {...props}
          value={inputState.value}
          onChangeText={changeTextHandler}
          onBlur={lostFocusHandler}
          onFocus={focusInputHandler}
        />
      </View>
      {!inputState.isValid && inputState.touched && (
        <Text>{props.errorText}</Text>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  field: {
    marginVertical: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  label: {
    fontFamily: "open-sans-bold",
  },
});

export default Input;
