import { HOST } from "../config/config"
import axios from "axios";
import { fetchToken } from "../utilities/utils";

export const createGoal = async (payloadData) => {
    let token = await fetchToken();

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
    const startTime = Date.now();
    console.log('Starting fetchAllGoals');

    let token = await fetchToken();
    // console.log("fetchAllGoals", token)
    console.log(`Token fetched in ${Date.now() - startTime}ms`);

    return new Promise((resolve, reject) => {
        console.log(`Starting API call at ${Date.now() - startTime}ms`);
        axios.get(`${HOST}/userplans/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(`API call completed in ${Date.now() - startTime}ms`);
                resolve(res);
            })
            .catch((err) => {
                console.error(`API call failed after ${Date.now() - startTime}ms:`, err);
                reject(err);
            })
    })
}

export const updateGoal = async (payloadData, goalId) => {
    let token = await fetchToken();

    return new Promise((resolve, reject) => {
        axios.put(`${HOST}/habitapp/topic/${goalId}/`, payloadData,
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

export const fetchAllSubGoals = async (goalId) => {
    let token = await fetchToken();

    return new Promise((resolve, reject) => {

        axios.get(`${HOST}/get-tasks/?topicid=${goalId}`, {
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
    let token = await fetchToken();

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
    let token = await fetchToken();

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

export const addNewSubGoal = async (payloadData) => {
    let token = await fetchToken();

    return new Promise((resolve, reject) => {
        axios.post(`${HOST}/new-task/`, payloadData, {
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

export const updateSubGoal = async (payloadData, subGoalId) => {
    let token = await fetchToken();

    return new Promise((resolve, reject) => {
        axios.put(`${HOST}/update-task/?taskid=${subGoalId}`, payloadData, {
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
    let token = await fetchToken();
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
    let token = await fetchToken();

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
    let token = await fetchToken();

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

export const fetchUserDefinedUnits = async () => {
    let token = await fetchToken();

    return new Promise((resolve, reject) => {
        axios.get(`${HOST}/habitapp/userdefinedunits/`, {
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

export const createNewUnit = async (payloadData) => {
    let token = await fetchToken();

    return new Promise((resolve, reject) => {
        axios.post(`${HOST}/habitapp/userdefinedunits/`, payloadData, {
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

export const recreateGoalNewTimeline = async (payloadData) => {
    // let token = await fetchToken();
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1NDU1NDIyLCJpYXQiOjE3MjAyNzE0MjIsImp0aSI6ImZiMTIxODc2YTkyZTQ4OGI5MTY3YWE1MWQxM2NkZjczIiwidXNlcl9pZCI6NzR9.HPz-XgpDyJbi41qyO7ny0jsX-iJn1Ryp_xoyM6RoSW8"

    console.log("API CALL", token)

    return new Promise((resolve, reject) => {
        axios.post(`${HOST}/renew-plan/`, payloadData,
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