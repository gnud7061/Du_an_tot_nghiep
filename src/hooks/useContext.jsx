import React, { createContext, useContext, useState } from 'react';

const UseContext = createContext();

export function UserProvider({children}){

    
    const [userData,setUserData] = useState(null);
    return(
        <UseContext.Provider value={{userData,setUserData}} >
            {children}
        </UseContext.Provider>
    )
}

export function User(){
    return useContext(UseContext);
}