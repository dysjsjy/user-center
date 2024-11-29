import { userLogin } from "@/apis/user"
import { Button, Card, Form, Input, message } from "antd"
import { useNavigate } from "react-router-dom"
import './index.scss'
import { fetchLoginUser } from "@/store/modules/user"
import { useDispatch } from 'react-redux'

const UserLogin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    interface formState {
        userAccount: string;
        userPassword: string;
      }

    const onFinish = async (value: formState) => {
        const res = await userLogin(value)
        if (res.data.code === 0 && res.data.data) {
            fetchLoginUser(dispatch)
            message.success("登录成功");
            navigate('/')
        } else {
            message.error("登录失败");
        }
    };

    return (
        <div className="login">
            <Card className="login-container">
                <div id="title">登录</div>
                {/* 登录表单 */}
                <Form onFinish={onFinish} validateTrigger="onBlur">
                    <Form.Item
                        name="userAccount"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}>
                        <Input size="large" placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item
                        name="userPassword"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}>
                        <Input size="large" placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default UserLogin
