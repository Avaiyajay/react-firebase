import React , { createContext , useContext, useState , useEffect } from 'react'
import { auth } from '../firebase'; 

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export function Authprovider( { children } ) {
    const [currentUser , setCurrentUser] = useState();
    const [ loading , setLoading ] = useState(true);
      
    const Signup = (email,password) => {
        return auth.createUserWithEmailAndPassword(email,password);
    }

    const Login = (email,password) => {
        return auth.signInWithEmailAndPassword(email,password);
    }
    
    const Passwordreset = (email) => {
        return auth.sendPasswordResetEmail(email);
    }
    
    const Logout = () => {
        return auth.signOut();
    }

    const updateEmail = (email) => {
        return currentUser.updateEmail(email);
    }

    const updatePassword = (password) => {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe
    },[]);

    const value = {
        currentUser,
        Signup,
        Login,
        Logout,
        Passwordreset,
        updatePassword,
        updateEmail  
    }

    return (
        <AuthContext.Provider value = {value} >
            {!loading && children}
        </AuthContext.Provider>
    )
}
