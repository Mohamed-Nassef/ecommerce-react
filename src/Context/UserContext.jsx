import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {

    let [token, setToken] = useState(
        localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null);
    let [name, setName] = useState(
        localStorage.getItem("userName") ? localStorage.getItem("userName") : null);


    return (
        <UserContext.Provider value={{ token, setToken, name, setName }}>
            {props.children}
        </UserContext.Provider>
    )

}