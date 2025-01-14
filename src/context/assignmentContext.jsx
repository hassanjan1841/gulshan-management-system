import { createContext, useContext, useState } from "react";

const ChangingInAssignmentContext = createContext()

export const ChangingInAssignmentContextProvider = ({children}) => {
    const [changingInAssignment, setChangingInAssignment] = useState(1)
return(
   <ChangingInAssignmentContext.Provider value={{changingInAssignment, setChangingInAssignment}}>
    {children}
   </ChangingInAssignmentContext.Provider>
)
}

export const useAssignmentContext = () => {
  return useContext(ChangingInAssignmentContext);
};