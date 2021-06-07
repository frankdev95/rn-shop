import React, { useState, useReducer, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, Text, Alert, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { signIn, signUp } from "../../store/actions/auth";
import AppButton from "../../components/UI/AppButton";
import Spinner from "../../components/UI/Spinner";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";

const formReducer = (state, action) => {
  if (action.type === "UPDATE") {
    const inputValidities = {
      ...state.inputValidities,
      [action.name]: action.isValid,
    };

    let formIsValid = true;
    for (const key in inputValidities) {
      formIsValid = formIsValid && inputValidities[key];
    }

    return {
      inputValues: {
        ...state.inputValues,
        [action.name]: action.value,
      },
      inputValidities: inputValidities,
      formIsValid,
    };
  }
  if (action.type === "NAME_IS_VALID") {
    return {
      ...state,
      inputValidities: {
        ...state.inputValidities,
        name: true,
      },
    };
  }
};

const AuthScreen = ({ navigation, route }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
      email: "",
      password: "",
    },
    inputValidities: {
      name: false,
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (isError) {
      Alert.alert("An Error Occurred!", isError, [
        {
          text: "Ok",
        },
      ]);
    }
  }, [isError]);

  const welcomeText = isSignUp
    ? "Welcome! Signup to get started"
    : "Hello Again! Welcome back";

  const changeTextHandler = useCallback(
    (name, value, isValid) => {
      dispatchFormState({ type: "UPDATE", name, value, isValid });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    if (!isSignUp) dispatchFormState({ type: "NAME_IS_VALID" });
    if (!formState.formIsValid) {
      return Alert.alert(
        "Invalid Fields",
        "Please check fields are correctly filled out.",
        [
          {
            text: "OK",
          },
        ]
      );
    }

    const action = isSignUp
      ? signUp(formState.inputValues)
      : signIn(formState.inputValues);

    setIsError(null);
    setIsLoading(true);

    try {
      await dispatch(action);
      if (isSignUp) {
        Alert.alert("Congrats!", "You have successfully signed up!", [
          {
            text: "Login",
            onPress: () => setIsSignUp((prev) => !prev),
          },
        ]);
      }
    } catch (err) {
      setIsError(err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>{welcomeText}</Text>
        </View>
        <View style={styles.formContainer}>
          {isSignUp && (
            <Input
              id="name"
              fieldStyle={styles.field}
              placeholder="Name"
              style={styles.input}
              required={true}
              errorText="Name field required."
              onInputChange={changeTextHandler}
            />
          )}
          <Input
            id="email"
            fieldStyle={styles.field}
            placeholder="Email Address"
            style={styles.input}
            email={true}
            errorText="Email invalid, please enter a valid email address."
            onInputChange={changeTextHandler}
            autoCapitalize="none"
          />
          <Input
            id="password"
            fieldStyle={styles.field}
            placeholder="Password"
            style={styles.input}
            min={6}
            errorText="Password must be at least 6 characters"
            onInputChange={changeTextHandler}
          />
          <AppButton
            title={isSignUp ? "Sign Up" : "Sign In"}
            btnStyle={styles.confirmBtn}
            onPress={authHandler}
          />
          <View style={styles.switchScreenContainer}>
            <Text>
              {isSignUp
                ? "Already Have An Account?"
                : "Need To Create An Account?"}
            </Text>
            <TouchableOpacity onPress={() => setIsSignUp((prev) => !prev)}>
              <Text style={styles.switchText}>
                {isSignUp ? "Sign In" : "Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  container: {
    marginTop: 50,
    marginHorizontal: 30,
  },
  field: {
    borderBottomWidth: 0,
    marginVertical: 2,
  },
  input: {
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 3,
  },
  welcomeTextContainer: {
    width: "60%",
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 35,
  },
  confirmBtn: {
    paddingVertical: 15,
  },
  switchScreenContainer: {
    flexDirection: "row",
  },
  switchText: {
    textDecorationLine: "underline",
    marginLeft: 5,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthScreen;
