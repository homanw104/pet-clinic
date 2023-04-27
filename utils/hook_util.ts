import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";

/**
 * Use throughout the app instead of plain `useDispatch`.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Use throughout the app instead of plain `useSelector`.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Custom loading state hook that handles timeouts between states.
 */
export const useLoadingState = () => {
  // Timeout between states
  const timeout = 250;

  // Whether to show loading indicator
  const [loading, setLoading] = useState(true);

  // Whether to show error indicator
  const [error, setError] = useState(false);

  // Whether to show content
  const [loaded, setLoaded] = useState(false);

  // Timeout references
  const errorTimeout = useRef<NodeJS.Timeout>();
  const loadingTimeout = useRef<NodeJS.Timeout>();
  const loadedTimeout = useRef<NodeJS.Timeout>();

  // Set loading after timeout
  const setShowLoading = useCallback(() => {
    console.log("loading")
    clearTimeout(errorTimeout.current); setError(false);
    clearTimeout(loadedTimeout.current); setLoaded(false);
    loadingTimeout.current = setTimeout(() => { setLoading(true) }, timeout);
  }, []);

  // Set error after timeout
  const setShowError = useCallback(() => {
    console.log("error")
    clearTimeout(loadingTimeout.current); setLoading(false);
    clearTimeout(loadedTimeout.current); setLoaded(false);
    errorTimeout.current = setTimeout(() => { setError(true) }, timeout);
  }, []);

  // Set loaded after timeout
  const setShowLoaded = useCallback(() => {
    console.log("loaded")
    clearTimeout(loadingTimeout.current); setLoading(false);
    clearTimeout(errorTimeout.current); setError(false);
    loadedTimeout.current = setTimeout(() => { setLoaded(true) }, timeout);
  }, []);

  // Clear timeouts, used when component unmounts
  const clearTimeouts = useCallback(() => {
    clearTimeout(loadingTimeout.current);
    clearTimeout(loadedTimeout.current);
    clearTimeout(errorTimeout.current);
  }, []);

  return {
    showLoading: loading,
    showError: error,
    showLoaded: loaded,
    setShowLoading: setShowLoading,
    setShowError: setShowError,
    setShowLoaded: setShowLoaded,
    clearTimeouts: clearTimeouts,
  };
}
