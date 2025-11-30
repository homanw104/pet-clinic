"use client";

import { createContext, ReactNode, useState } from "react";

type DiseaseContextType = {
  diseaseId: string;
  setDiseaseId: (id: string) => void;
}

const defaultValue: DiseaseContextType = {
  diseaseId: "",
  setDiseaseId: () => {}
};

export const DiseaseContext
  = createContext<DiseaseContextType>(defaultValue);

export default function DiseaseContextProvider({ children }: {
  children: ReactNode
}) {
  const [diseaseId, setDiseaseId] = useState("");

  return (
    <DiseaseContext.Provider value={{ diseaseId, setDiseaseId }}>
      {children}
    </DiseaseContext.Provider>
  );
}
