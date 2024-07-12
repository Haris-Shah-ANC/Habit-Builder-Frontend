import axios from "axios";
import { HOST } from "../../config/config";

export const signUpUser = (userData) => {
    return new Promise((resolve, reject) => {
        axios.post(`${HOST}/register/`, userData)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

export const loginUser = (userData) => {
    return new Promise((resolve, reject) => {
        axios.post(`${HOST}/login/`, userData)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

export const googleLoginUser = (payloadData) => {
    return new Promise((resolve, reject) => {
        axios.post(`${HOST}/dj-rest-auth/google/login/`, payloadData)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

export const connectSocialAccount = (payloadData, token) => {

    return new Promise((resolve, reject) => {
        axios.post(`${HOST}/google/connect/`, payloadData,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

export const resendValidationEmail = (payloadData) => {

    return new Promise((resolve, reject) => {
        axios.post(`${HOST}/register/resend-email/`, payloadData)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
}