import { useState } from "react";
import { createContext } from "react";

export const userContext = createContext()
export  function CreateUserProvider(props) {
    const [Usertoken,setToken]=useState()
  return (
    <userContext.Provider value={{Usertoken,setToken}}>
        {props.children}
    </userContext.Provider>
  )
}
