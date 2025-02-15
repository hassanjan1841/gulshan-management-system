import { createContext, useContext, useState } from "react";

const ChangingInBatchContext = createContext()

export const ChangingInBatchContextProvider = ({children}) => {
    const [changingInBatch, SetChangingInBatch] = useState(1)
return(
   <ChangingInBatchContext.Provider value={{changingInBatch, SetChangingInBatch}}>
    {children}
   </ChangingInBatchContext.Provider>
)
}

export const useBatchContext = () => {
  return useContext(ChangingInBatchContext);
};