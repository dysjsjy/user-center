//用户相关的状态管理

import { getCurrentUser } from "@/apis/user";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "..";



const userStore = createSlice({
    name: "user",
    initialState: {
        username: "未登录"
    },
    reducers: {
        setUserInfo(state, action) {
            state.username = action.payload
        },
    }
})

// 远程获取登录用户信息
async function fetchLoginUser(dispatch: AppDispatch) {
    try {
        const res = await getCurrentUser();
        if (res.data.code === 0 && res.data.data) {
            dispatch(setUserInfo(res.data.data.username));
        } else {
            console.error('Error in response:', res.data);
        }
    } catch (error) {
        console.error('Request failed:', error);
    }
}

const userReducer = userStore.reducer

const { setUserInfo } = userStore.actions

export { fetchLoginUser }

export default userReducer