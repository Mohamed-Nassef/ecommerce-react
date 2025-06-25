import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {

    let [token, setToken] = useState(
        localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null);


    return (
        <UserContext.Provider value={{ token, setToken }}>
            {props.children}
        </UserContext.Provider>
    )

}