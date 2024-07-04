import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        username: '',
        email: '',
        status: 'false',
        token: '',
        userId: ''
    });

    const fillLoginDetails = async () => {
        let status = await AsyncStorage.getItem("logInStatus");

        if (status === "true") {
            const token = await AsyncStorage.getItem("token");
            const email = await AsyncStorage.getItem("useremail");
            const username = await AsyncStorage.getItem("username");
            const userId = await AsyncStorage.getItem("userId");

            setAuthState({
                username,
                email,
                status,
                token,
                userId
            });
        } else {
            setAuthState({
                username: '',
                email: '',
                status: 'false',
                token: '',
                userId: ''
            });
        }
    };

    const clearLoginDetails = async () => {
        await AsyncStorage.setItem("logInStatus", "false");
        await AsyncStorage.setItem("token", "");
        await AsyncStorage.setItem("useremail", "");
        await AsyncStorage.setItem("username", "");
        await AsyncStorage.setItem("userId", "");

        setAuthState({
            username: '',
            email: '',
            status: 'false',
            token: '',
            userId: ''
        });
    };

    useEffect(() => {
        fillLoginDetails();
    }, []);

    return (
        <AuthContext.Provider value={{ authState, setAuthState, fillLoginDetails, clearLoginDetails }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
