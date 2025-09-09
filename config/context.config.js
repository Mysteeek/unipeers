import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext(null);

export function AuthProvider({ children }) {
    
    const [currentUser,setCurrentUser] = useState(undefined);

    useEffect(() => {
       onAuthStateChanged(auth,(user) => 
            setCurrentUser(user)
        ),[]});

    return(
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}