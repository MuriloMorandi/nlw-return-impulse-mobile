import axios from "axios"

const api = axios.create({
    baseURL: "http://192.168.0.41:3333",
})

export async function sendFeedback({data}:{data:any}) {
    try {
        return await api.post('/feedbacks', data)
    } catch (error) {
        console.log(error)
    }
}