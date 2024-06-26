import { HOST } from "../config/config"
import axios from "axios";
import { fetchToken } from "../utilities/utils";

export const createGoal = async (payloadData) => {
    // let token = await fetchToken();
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NDkyOTg0LCJpYXQiOjE3MTkzMDg5ODQsImp0aSI6IjNjM2IwZTkwMDhlODQwZWU5MjFhODBhZGJhNDA5YzZiIiwidXNlcl9pZCI6NzR9.Tev6jzYS8WaLniMmrEf8PbEIk44BNyyK1NI7jqgiItg"

    return new Promise((resolve, reject) => {
        axios.post(`${HOST}/createplan/`, payloadData,
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

export const fetchAllGoals = async () => {
    // let token = await fetchToken();
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NDkyOTg0LCJpYXQiOjE3MTkzMDg5ODQsImp0aSI6IjNjM2IwZTkwMDhlODQwZWU5MjFhODBhZGJhNDA5YzZiIiwidXNlcl9pZCI6NzR9.Tev6jzYS8WaLniMmrEf8PbEIk44BNyyK1NI7jqgiItg"

    return new Promise((resolve, reject) => {

        axios.get(`${HOST}/userplans/`, {
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

export const deleteSpecificGoal = async (goalId) => {
    // let token = await fetchToken();
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NDkyOTg0LCJpYXQiOjE3MTkzMDg5ODQsImp0aSI6IjNjM2IwZTkwMDhlODQwZWU5MjFhODBhZGJhNDA5YzZiIiwidXNlcl9pZCI6NzR9.Tev6jzYS8WaLniMmrEf8PbEIk44BNyyK1NI7jqgiItg"

    return new Promise((resolve, reject) => {
        axios.delete(`${HOST}/habitapp/topic/${goalId}/`, {
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