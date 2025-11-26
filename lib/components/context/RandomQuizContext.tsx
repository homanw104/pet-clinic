'use client';

import { createContext, ReactNode, useState } from "react";

type RandomQuizContextType = {
  refreshQuiz: () => void;
  refreshTimestamp: number;
}

const defaultValue: RandomQuizContextType = {
  refreshQuiz: () => {},
  refreshTimestamp: 0
};

export const RandomQuizContext
  = createContext<RandomQuizContextType>(defaultValue);

export default function RandomQuizContextProvider({ children }: {
  children: ReactNode
}) {
  const [refreshTimestamp, setRefreshTimestamp] = useState(0);

  const refreshQuiz = () => {
    setRefreshTimestamp(Date.now());
  }

  return (
    <RandomQuizContext.Provider value={{ refreshQuiz, refreshTimestamp }}>
      {children}
    </RandomQuizContext.Provider>
  );
}
