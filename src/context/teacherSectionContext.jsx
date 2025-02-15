import { createContext, useContext, useState } from "react";

const TeacherSectionContext = createContext()

export const TeacherSectionContextProvider = ({children}) => {
    const [teacherSection, setTeacherSection] = useState(null)
return(
   <TeacherSectionContext.Provider value={{teacherSection, setTeacherSection}}>
    {children}
   </TeacherSectionContext.Provider>
)
}

export const useTeacherSectionContext = () => {
  return useContext(TeacherSectionContext);
};