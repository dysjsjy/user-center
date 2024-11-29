/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";


const Home = () => {
    const name = useSelector((state: any) => state.user.username)
    return (
        <div>你好，{name}</div>
    )
}

export default Home;