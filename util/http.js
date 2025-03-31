import axios from "axios";

const BACKEND_URL = 'https://expense-tracker-3794e-default-rtdb.firebaseio.com';

export const storeExp = async (expData) => {
    const response = await axios.post(
         BACKEND_URL + '/expenses.json',
        expData
    );
    const id = response.data.name;
    return id;
}

export const fetchExp = async () => {
    const response = await axios.get(BACKEND_URL + '/expenses.json');

    const expenses = [];
    for(const key in response.data) {
        const expObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        }
        expenses.push(expObj);
    }
    return expenses;
}
export const updateExp = (id, expData) => {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expData);
}
export const deleteExp = (id) => {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}