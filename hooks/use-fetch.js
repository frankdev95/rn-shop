import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const useFetch = (action, navigation) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const dispatch = useDispatch();

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      await dispatch(action());
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const focusListener = navigation.addListener("focus", loadItems);
    loadItems();

    return focusListener;
  }, [loadItems]);

  return [isLoading, isError, loadItems];
};

export default useFetch;
