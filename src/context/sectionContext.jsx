import { createContext, useContext, useState } from "react";

const ChangingInSectionContext = createContext();

export const ChangingInSectionContextProvider = ({ children }) => {
  const [changingInSection, SetChangingInSection] = useState(1);
  return (
    <ChangingInSectionContext.Provider
      value={{ changingInSection, SetChangingInSection }}
    >
      {children}
    </ChangingInSectionContext.Provider>
  );
};

export const useSectionContext = () => {
  return useContext(ChangingInSectionContext);
};
