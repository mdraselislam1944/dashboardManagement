import { useUpdateIndividualProjectsMutation } from '@/redux/features/projects/projects';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const { Option } = Select;

const EditShareProject = ({ data }) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [setProjects,{isSuccess,data:updateData}]=useUpdateIndividualProjectsMutation()
    console.log(data);
    useEffect(() => {
        if (data) {
            const { id, name, description, owner, status, tasks, teamMembers, recentActivities } = data;
            form.setFieldsValue({
                id,
                name,
                description,
                owner,
                status,
                tasks,
                teamMembers: teamMembers?.map(member => member?.id),
                recentActivities: recentActivities?.map(activity => activity?.description)
            });
        }
    }, [data, form]);

    const onFinish = (values) => {
        setProjects(values);

        console.log(updateData)

        // return;
        router.push('/')
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='me-[20vw]'>
            <Form
                form={form}
                name="projectForm"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item name="id" hidden>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Project Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter project name!' }]}
                >
                    <Input defaultValue={data?.name} />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter project description!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Owner"
                    name="owner"
                    rules={[{ required: true, message: 'Please select project owner!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: 'Please select project status!' }]}
                >
                    <Select>
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Tasks"
                    name="tasks"
                >
                    <Input.TextArea
                        autoSize={{ minRows: 3, maxRows: 6 }}
                        value={data?.tasks}

                    />
                </Form.Item>

                <Form.Item
                    label="Team Members"
                    name="teamMembers"
                >
                    <Select mode="multiple">
                        {/* Render options for team members */}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Recent Activities"
                    name="recentActivities"
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button className='w-full' type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditShareProject;
