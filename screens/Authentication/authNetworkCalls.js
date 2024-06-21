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