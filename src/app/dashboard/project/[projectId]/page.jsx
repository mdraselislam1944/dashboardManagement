'use client'
import ProjectDetailPage from '@/components/shared/ProjectDetailPage';
import { useGetIndividualProjectsQuery } from '@/redux/features/projects/projects';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {  Button, Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
const { Header, Sider, Content } = Layout;
const ProjectIndividualPage = ({params}) => {
    const {data}=useGetIndividualProjectsQuery(params?.projectId);
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
   
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
                        <ProjectDetailPage data={data}/>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default ProjectIndividualPage;