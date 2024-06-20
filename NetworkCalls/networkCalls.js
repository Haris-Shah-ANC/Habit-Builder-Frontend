import { HOST } from "../config/config"
import axios from "axios";

export const createGoal = (payloadData) => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzOTkwMjg0LCJpYXQiOjE3MTg4MDYyODQsImp0aSI6ImU5Yjc3ODNlZWJhNjQ0ODE5NWYyNWYxYjU5NDEwOTk0IiwidXNlcl9pZCI6Mn0.fLuxvN5O3In0REvsZjC0bxRWQt7SRiMwyeq8mDRe8qY"

    return new Promise((resolve, reject) => {
        axios.post(`${HOST}/createplan/`, payloadData,
            {
                headers: {
                    "Authorization": `Token ${token}`
                }
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err);
            })
    })
}