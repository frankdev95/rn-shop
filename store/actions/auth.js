import AsyncStorage from "@react-native-async-storage/async-storage";
export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";
export const AUTH_USER = "AUTH_USER";

export const signUp = (fields) => {
  return async (dispatch) => dispatchAuth(dispatch, SIGN_UP, fields);
};

export const signIn = (fields) => {
  return async (dispatch) => dispatchAuth(dispatch, SIGN_IN, fields);
};

export const authSession = (token, userId) => ({
  type: AUTH_USER,
  payload: { idToken: token, localId: userId },
});

async function dispatchAuth(dispatch, type, fields) {
  const url =
    type === SIGN_UP
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHnm0urOA44SjdxFUCq2QNrtI-wXcfnho"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHnm0urOA44SjdxFUCq2QNrtI-wXcfnho";

  const { name, email, password } = fields;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorId = errorData.error.message;
      let message = "Ooops, something went wrong!";

      if (errorId === "EMAIL_EXISTS") {
        message = "An account with this email already exists.";
      }
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "No registered users with this email.";
      }
      if (errorId === "INVALID_PASSWORD") {
        message = "Password is invalid!";
      }

      throw new Error(message);
    }

    const data = await response.json();

    dispatch({ type: AUTH_USER, payload: data });
    const expiration = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    ).toISOString();
    saveDataToStorage(data.idToken, data.localId, expiration);
  } catch (error) {
    throw error;
  }
}

const saveDataToStorage = (token, userId, expiration) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiration,
    })
  );
};
