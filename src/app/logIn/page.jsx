"use client";
import { useLogInQuery } from '@/redux/features/auth/auth';
import { Button, Form, Input } from 'antd';
import { LoadingOutlined, LockOutlined, UserAddOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const LogInPage = () => {
    const {data,isLoading}=useLogInQuery('');
    const router = useRouter();
    const handleLogIn =async (values) => {
        for (const user of data) {
            if (user.email === values.email && user.password === values.password) {
                localStorage.setItem('userInfo',JSON.stringify(user))
                router.push('/')
            }
            else{
                console.log('unsuccess')
            }
        }
    };
    if(isLoading){
        return  <h1 className='text-center text-red-500 my-5'><LoadingOutlined /></h1>
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleLogIn}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email',
                        },
                    ]}
                >
                    <Input prefix={<UserAddOutlined  className="site-form-item-icon" />} type="email" placeholder="Email"   className="px-20 py-4"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        className="px-20 py-4"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button w-full pt-2 pb-7">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LogInPage;
