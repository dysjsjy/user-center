import { userRegister } from "@/apis/user"
import { Button, Card, Form, Input, message } from "antd"
import { useNavigate } from "react-router-dom"
import './index.scss'


const UserRegister = () => {

    const navigate = useNavigate()

    interface formState {
        username: string
        password: string
        checkpassword: string
    }

    const onFinish = async (value: formState) => {
        // 判断两次输入的密码是否一致
        if (value.password !== value.checkpassword) {
            message.error("二次输入的密码不一致");
            return;
        }
        const res = await userRegister(value);
        // 注册成功，跳转到登录页面
        if (res.data.code === 0 && res.data.data) {
            message.success("注册成功");
            navigate('/user/login')
        } else {
            message.error("注册失败，" + res.data.description);
        }
    };

    return (
        <div className="login">
            <Card className="login-container">
                <div id="title">注册</div>
                {/* 登录表单 */}
                <Form onFinish={onFinish} validateTrigger="onBlur">
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}>
                        <Input size="large" placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}>
                        <Input size="large" placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item
                        name="checkpassword"
                        rules={[
                            {
                                required: true,
                                message: '请确认密码',
                            },
                        ]}>
                        <Input size="large" placeholder="请确认密码" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default UserRegister