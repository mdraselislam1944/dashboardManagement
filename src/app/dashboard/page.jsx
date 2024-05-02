'use client'
import { redirect } from 'next/navigation';

import { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Popconfirm, Table, theme } from 'antd';
import { useDeleteIndividualProjectsMutation, useGetProjectsQuery } from '@/redux/features/projects/projects';
import Link from 'next/link';
const { Header, Sider, Content } = Layout;

const Dashboard = () => {
    const token = localStorage?.getItem('userInfo');
    useEffect(() => {
        if (!token) {
            redirect('/logIn')
        }
    }, [token]);

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { data } = useGetProjectsQuery();
    const [deleteProject] = useDeleteIndividualProjectsMutation();
    // console.log(data)
    const value = 1;

    const columns = [
        {
            title: 'Project Name',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Owner',
            width: 100,
            dataIndex: 'owner',
            key: 'owner',
            fixed: 'left',
            sorter: true,
        },
        {
            title: 'Description',
            width: 100,
            dataIndex: 'description',
            key: 'description',
            fixed: 'left',
            sorter: true,
        },
        {
            title: 'View',
            key: 'view',
            fixed: 'right',
            width: 100,
            render: (id) => (
                <a href={`/dashboard/project/${id?.id}`}>View</a>
            ),
        },
        {
            title: 'Edit',
            key: 'edit',
            fixed: 'right',
            width: 100,
            render: (id) => (
                <a href={`/dashboard/editProject/${id?.id}`}>Edit</a>
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            fixed: 'delete',
            width: 100,
            render: (record) => (
                <Popconfirm
                    title="Are you sure you want to delete this project?"
                    onConfirm={() => handleDelete(record?.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <a>Delete</a>
                </Popconfirm>
            ),
        },
    ];

    const handleDelete = async (id) => {
        await deleteProject(id);
        window.location.reload();
    }
    return (
        <div className="min-h-screen">
            <Layout className="min-h-screen">
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link href="/dashboard">
                                dashboard
                                {/* <a>Dashboard</a> */}
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Table
                            columns={columns}
                            dataSource={data}
                            scroll={{
                                x: 1300,
                            }}
                        />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default Dashboard;
