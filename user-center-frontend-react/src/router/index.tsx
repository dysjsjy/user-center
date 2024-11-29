import UserManage from "@/pages/Admin/userManage";
import Home from "@/pages/Home";
import UserLogin from "@/pages/User/Login";
import UserRegister from "@/pages/User/Register";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/user/login',
        element: <UserLogin/>
    },
    {
        path: '/user/register',
        element: <UserRegister/>
    },
    {
        path: '/admin/userManage',
        element: <UserManage/>
    }
])

export { router }