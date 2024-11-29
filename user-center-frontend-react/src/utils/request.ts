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

// Add a response interceptor
request.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      console.log(response);
  
      const { data } = response;
      // 未登录
      if (data.code === 40100) {
        // 不是获取用户信息接口，或者不是登录页面，则跳转到登录页面
        if (
          !response.request.responseURL.includes("user/current") &&
          !window.location.pathname.includes("/user/login")
        ) {
          window.location.href = `/user/login?redirect=${window.location.href}`;
        }
      }
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

export { request }