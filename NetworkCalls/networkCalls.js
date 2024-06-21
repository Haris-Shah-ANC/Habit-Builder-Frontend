import { HOST } from "../config/config"
import axios from "axios";

export const createGoal = (payloadData) => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0MTM1NDc1LCJpYXQiOjE3MTg5NTE0NzUsImp0aSI6Ijc1ZDEwOTI3OTEzYzQ5NWE5NTVhZWIxZmE2NjgzN2I3IiwidXNlcl9pZCI6Mn0.IIAqfwaY6INC1dE0y1bXQBU8qxvjwq_nI7pucIBAb7M"

    return new Promise((resolve, reject) => {
        axios.post(`${HOST}/createplan/`, payloadData,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
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