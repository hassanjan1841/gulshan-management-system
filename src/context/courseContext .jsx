import { createContext, useContext, useState } from "react";

const ChangingInCourseContext = createContext()

export const ChangingInCourseContextProvider = ({children}) => {
    const [changingInCourse, setChangingInCourse] = useState(1)
return(
   <ChangingInCourseContext.Provider value={{changingInCourse, setChangingInCourse}}>
    {children}
   </ChangingInCourseContext.Provider>
)
}

export const useCourseContext = () => {
  return useContext(ChangingInCourseContext);
};