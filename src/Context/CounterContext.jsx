import { createContext } from "react";
import { useState } from "react";

export const CounterContext = createContext();

export default function CounterContextProvider(props) {
    const [count, setCount] = useState(0);
    function changeCount() {
        setCount(Math.random() * 100);
    }
    return (
        <CounterContext.Provider value={{ count, changeCount }}>
            {props.children}
        </CounterContext.Provider>
    );
}
