/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { userLogin } from '@/apis/user';
import useLoginUserStore from '@/store/modules/user';

interface FormState {
  userAccount: string;
  userPassword: string;
}

const UserLoginPage: React.FC = () => {
  const [form] = Form.useForm<FormState>();
  const [formState, setFormState] = useState<FormState>({
    userAccount: '',
    userPassword: '',
  });
  
  const navigate = useNavigate();
  const loginUserStore = useLoginUserStore();

  const handleSubmit = async (values: FormState) => {
    try {
      const res = await userLogin(values);
      // 登录成功，把登录态保存到全局状态中
      if (res.data.code === 0 && res.data.data) {
        await loginUserStore.fetchLoginUser();
        message.success('登录成功');
        navigate('/', { replace: true });
      } else {
        message.error('登录失败');
      }
    } catch (error) {
      message.error('登录出错，请稍后再试');
    }
  };

  return (
    <div id="userLoginPage">
      <h2 className="title">用户登录</h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={formState}
        onFinish={handleSubmit}
        style={{ maxWidth: '480px', margin: '0 auto' }}
      >
        <Form.Item
          label="账号"
          name="userAccount"
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input
            placeholder="请输入账号"
            value={formState.userAccount}
            onChange={(e) => setFormState({ ...formState, userAccount: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="密码"
          name="userPassword"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 8, message: '密码不能小于 8 位' },
          ]}
        >
          <Input.Password
            placeholder="请输入密码"
            value={formState.userPassword}
            onChange={(e) => setFormState({ ...formState, userPassword: e.target.value })}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserLoginPage;
