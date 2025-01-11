import { createContext, useContext, useState } from "react";

const ChangingInStudentContext = createContext()

export const ChangingInStudentContextProvider = ({children}) => {
    const [changingInStudent, setChangingInStudent] = useState(1)
return(
   <ChangingInStudentContext.Provider value={{changingInStudent, setChangingInStudent}}>
    {children}
   </ChangingInStudentContext.Provider>
)
}

export const useStudentContext = () => {
  return useContext(ChangingInStudentContext);
};