import AsyncStorage from "@react-native-async-storage/async-storage";

export const fillLoginDetails = async () => {
    let status = await AsyncStorage.getItem("logInStatus");

    let token = "",
        email = "",
        username = "";

    if (status === "true") {
        token = await AsyncStorage.getItem("token");
        email = await AsyncStorage.getItem("useremail");
        username = await AsyncStorage.getItem("username");
        userId = await AsyncStorage.getItem("userId");
    } else {
        status = "false";
    }
    setLoginDetails(username, email, status, token, userId)
}

export const clearLoginDetails = async () => {
    await AsyncStorage.setItem("logInStatus", "false");
    await AsyncStorage.setItem("token", "");
    await AsyncStorage.setItem("useremail", "");
    await AsyncStorage.setItem("username", "");
    await AsyncStorage.setItem("userId", "");

    setLoginDetails("", "", "false", "", "");
}

const setLoginDetails = (username, email, status, token, userId) => {
    return {
        username: username,
        email: email,
        status: status,
        token: token,
        userId: userId
    }
}

export const setLoginStatus = async (info) => {
    await AsyncStorage.setItem("logInStatus", info);
}

export const setToken = async (token) => {
    await AsyncStorage.setItem("token", token);
}

export const setUsername = async (info) => {
    await AsyncStorage.setItem("username", info);
}

export const setUserEmail = async (info) => {
    await AsyncStorage.setItem("useremail", info);
}

export const setUserId = async (info) => {
    await AsyncStorage.setItem("userId", `${info}`);
}

export const getLoginStatus = async () => {
    let status = await AsyncStorage.getItem("logInStatus");
    if (status === "true") return true;
    else return false;
}

export const getToken = async () => {
    let token = await AsyncStorage.getItem("token");
    return token;
}

export const getUsername = async () => {
    let username = await AsyncStorage.getItem("username");
    return username;
}

export const getUserEmail = async () => {
    let useremail = await AsyncStorage.getItem("useremail");
    return useremail;
}

export const getUserId = async () => {
    let userId = await AsyncStorage.getItem("userId");
    return userId;
}

