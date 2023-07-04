import React from 'react'
import {createContext, useContext, useEffect, useState} from 'react'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({})
// This code exports an AuthProvider component. The AuthProvider is a component that wraps its children components and provides them with the authentication context.
    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;