import { Badge, Descriptions } from "antd";

const ProjectDetailPage = ({data}) => {
    console.log(data)
    const items = [
        {
          key: '1',
          label: 'Project Name',
          children: data?.name
        },
        {
          key: '2',
          label: 'Description',
          children: data?.description
        },
        {
          key: '3',
          label: 'Owner',
          children: data?.owner
        },
        {
          key: '4',
          label: 'Status',
          children: data?.status
        },
        {
          key: '5',
          label: 'Tasks',
          children: data?.tasks
        },
        {
          key: '6',
          label: 'Team Members',
          children: data?.teamMembers?.map(member => (
            <p key={member?.id}>{member?.name} - {member?.role}</p>
          ))
        },
        {
          key: '7',
          label: 'Recent Activities',
          children: data?.recentActivities?.map(activity => (
            <p key={activity?.id}>{activity?.description}</p>
          ))
        }
      ];
   
    return (
        <div>
        <Descriptions title="Project Details" bordered items={items} />
        </div>
    );
};

export default ProjectDetailPage;