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

export const deleteSpecificSubGoal = async (subGoalId) => {
    // let token = await fetchToken();
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NDkyOTg0LCJpYXQiOjE3MTkzMDg5ODQsImp0aSI6IjNjM2IwZTkwMDhlODQwZWU5MjFhODBhZGJhNDA5YzZiIiwidXNlcl9pZCI6NzR9.Tev6jzYS8WaLniMmrEf8PbEIk44BNyyK1NI7jqgiItg"

    return new Promise((resolve, reject) => {
        axios.delete(`${HOST}/delete-task/?taskid=${subGoalId}`, {
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

export const incrementSubGoalCount = async (payloadData, subGoalId) => {
    console.log("payload", payloadData);
    // let token = await fetchToken();
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NDkyOTg0LCJpYXQiOjE3MTkzMDg5ODQsImp0aSI6IjNjM2IwZTkwMDhlODQwZWU5MjFhODBhZGJhNDA5YzZiIiwidXNlcl9pZCI6NzR9.Tev6jzYS8WaLniMmrEf8PbEIk44BNyyK1NI7jqgiItg"

    return new Promise((resolve, reject) => {
        axios.post(`${HOST}/new-timestamp/?taskid=${subGoalId}`, payloadData,
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

export const getAllTimeStamps = async (subGoalId) => {
    // let token = await fetchToken();
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NDkyOTg0LCJpYXQiOjE3MTkzMDg5ODQsImp0aSI6IjNjM2IwZTkwMDhlODQwZWU5MjFhODBhZGJhNDA5YzZiIiwidXNlcl9pZCI6NzR9.Tev6jzYS8WaLniMmrEf8PbEIk44BNyyK1NI7jqgiItg"

    return new Promise((resolve, reject) => {

        axios.get(`${HOST}/task-timestamps/?taskid=${subGoalId}`, {
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

export const deleteTimeStamp = async (timeStampId) => {
    // let token = await fetchToken();
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NDkyOTg0LCJpYXQiOjE3MTkzMDg5ODQsImp0aSI6IjNjM2IwZTkwMDhlODQwZWU5MjFhODBhZGJhNDA5YzZiIiwidXNlcl9pZCI6NzR9.Tev6jzYS8WaLniMmrEf8PbEIk44BNyyK1NI7jqgiItg"

    return new Promise((resolve, reject) => {
        axios.delete(`${HOST}/delete-timestamp/?id=${timeStampId}`, {
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
