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

// TODO : replace with actual endpoint
export const sendVerificationEmail = (payloadData) => {

    return new Promise((resolve, reject) => {
        axios.post(`${HOST}/send_verify_registration_mail_view/`, payloadData)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

export const sendResetPasswordEmail = (payloadData) => {

    return new Promise((resolve, reject) => {
        axios.post(`${HOST}/password-reset/`, payloadData)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

// TODO : replace with actual endpoint
export const resetPassword = () => {

    return new Promise((resolve, reject) => {
        axios.post(`${HOST}/change-password/`, payloadData)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
}
