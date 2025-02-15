import { createContext, useContext, useState } from "react";

const ChangingInBranchContext = createContext()

export const ChangingInBranchContextProvider = ({children}) => {
    const [changingInBranch, setChangingInBranch] = useState(1)
return(
   <ChangingInBranchContext.Provider value={{changingInBranch, setChangingInBranch}}>
    {children}
   </ChangingInBranchContext.Provider>
)
}

export const useBranchContext = () => {
  return useContext(ChangingInBranchContext);
};