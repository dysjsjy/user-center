//axios的封装处理

import axios from "axios";


const request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000
})

request.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


export { request }