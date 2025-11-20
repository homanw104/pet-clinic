/**
 * Hooks to return properties to improve accessibility in the app.
 */

import React, { KeyboardEvent, useCallback, useState } from "react";

export function useAccessibleButton(onClick?: (e: any) => void) {
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick?.(event);
      setIsButtonActive(true);
      if (event.key === " ") event.preventDefault();
    }
  }, [onClick]);

  const handleKeyUp = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      setIsButtonActive(false);
    }
  }, []);

  return {
    role: "button",
    tabIndex: 0,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    isButtonActive: isButtonActive
  };
}
