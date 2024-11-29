/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";

const Home: React.FC = () => {
    // 使用类型定义来访问状态
    const name = useSelector((state: any) => state.loginUserStore.loginUser.username);
  
    return <div>你好，{name}</div>;
  };

export default Home;