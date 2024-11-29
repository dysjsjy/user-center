/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Input, Table, Image, Tag, Button, message } from 'antd';
import dayjs from 'dayjs';
import { deleteUser, searchUsers } from '@/apis/user'

const { Search } = Input;

const UserManagePage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [data, setData] = useState<any[]>([]);

  // 获取数据
  const fetchData = async (username: string = '') => {
    try {
      const res = await searchUsers(username);
      if (res.data.data) {
        setData(res.data.data);
      } else {
        message.error('获取数据失败');
      }
    } catch (error) {
      message.error('请求失败，请稍后重试');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 搜索数据
  const onSearch = (value: string) => {
    setSearchValue(value);
    fetchData(value);
  };

  // 删除用户
  const doDelete = async (id: string) => {
    if (!id) return;
    try {
      const res = await deleteUser(id);
      if (res.data.code === 0) {
        message.success('删除成功');
        fetchData(searchValue);
      } else {
        message.error('删除失败');
      }
    } catch (error) {
      message.error('请求失败，请稍后重试');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      key: 'userAccount',
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      render: (avatarUrl: string) => <Image src={avatarUrl} width={120} />,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (createTime: string) => dayjs(createTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '用户角色',
      dataIndex: 'userRole',
      key: 'userRole',
      render: (userRole: number) => (
        userRole === 1 ? <Tag color="green">管理员</Tag> : <Tag color="blue">普通用户</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Button danger onClick={() => doDelete(record.id)}>
          删除
        </Button>
      ),
    },
  ];

  return (
    <div id="userManagePage">
      <Search
        style={{ maxWidth: 320, marginBottom: 20 }}
        placeholder="输入用户名搜索"
        enterButton="搜索"
        size="large"
        onSearch={onSearch}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default UserManagePage;
