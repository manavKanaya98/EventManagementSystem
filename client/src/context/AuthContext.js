import {useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const[user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
        setLoading(false);
    }, [])

    const loggedIn = (userDetails) => {
        localStorage.setItem("user", JSON.stringify(userDetails));
        setUser(userDetails);
    };

    const loggedOut = (userDetails) => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, loggedIn, loggedOut }}>
            {children}
        </AuthContext.Provider>
    );

};



