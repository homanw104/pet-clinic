import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/store/store";

/**
 * Use throughout the app instead of plain `useDispatch`.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Use throughout the app instead of plain `useSelector`.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Custom render state hook that handles timeouts between states.
 */
export const useRenderState = () => {
  // Timeout between states
  const timeout = 250;

  // Whether to show loading indicator
  const [loading, setLoading] = useState(true);

  // Whether to show error indicator
  const [error, setError] = useState(false);

  // Whether to show content
  const [loaded, setLoaded] = useState(false);
  
  // Whether to show page not found
  const [notFound, setNotFound] = useState(false);
  
  // Timeout references
  const errorTimeout = useRef<NodeJS.Timeout>(setTimeout(() => {}, 0));
  const loadingTimeout = useRef<NodeJS.Timeout>(setTimeout(() => {}, 0));
  const loadedTimeout = useRef<NodeJS.Timeout>(setTimeout(() => {}, 0));
  const notFoundTimeout = useRef<NodeJS.Timeout>(setTimeout(() => {}, 0));

  // Set loading after timeout
  const setShowLoading = useCallback(() => {
    clearTimeout(errorTimeout.current); setError(false);
    clearTimeout(loadedTimeout.current); setLoaded(false);
    clearTimeout(notFoundTimeout.current); setNotFound(false);
    loadingTimeout.current = setTimeout(() => { setLoading(true) }, timeout);
  }, []);

  // Set error after timeout
  const setShowError = useCallback(() => {
    clearTimeout(loadingTimeout.current); setLoading(false);
    clearTimeout(loadedTimeout.current); setLoaded(false);
    clearTimeout(notFoundTimeout.current); setNotFound(false);
    errorTimeout.current = setTimeout(() => { setError(true) }, timeout);
  }, []);

  // Set loaded after timeout
  const setShowLoaded = useCallback(() => {
    clearTimeout(loadingTimeout.current); setLoading(false);
    clearTimeout(errorTimeout.current); setError(false);
    clearTimeout(notFoundTimeout.current); setNotFound(false);
    loadedTimeout.current = setTimeout(() => { setLoaded(true) }, timeout);
  }, []);

  // Set page not found after timeout
  const setShowNotFound = useCallback(() => {
    clearTimeout(loadingTimeout.current); setLoading(false);
    clearTimeout(loadedTimeout.current); setLoaded(false);
    clearTimeout(errorTimeout.current); setError(false);
    notFoundTimeout.current = setTimeout(() => { setNotFound(true) }, timeout);
  }, []);
  
  // Clear timeouts, used when component unmounts
  const clearTimeouts = useCallback(() => {
    clearTimeout(loadingTimeout.current);
    clearTimeout(loadedTimeout.current);
    clearTimeout(errorTimeout.current);
    clearTimeout(notFoundTimeout.current);
  }, []);

  const setRenderState = useCallback((state: string) => {
    switch (state) {
      case "loading":
        setShowLoading();
        break;
      case "error":
        setShowError();
        break;
      case "loaded":
        setShowLoaded();
        break;
      case "notFound":
        setShowNotFound();
        break;
      default:
        setShowLoading();
        break;
    }
  }, [setShowError, setShowLoaded, setShowLoading, setShowNotFound]);
  
  return {
    renderState: { loading, loaded, error, notFound },
    setRenderState: setRenderState,
    clearTimeouts: clearTimeouts,
  };
}
