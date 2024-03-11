import { notification } from 'antd';
import PageWrapper from '../../components/PageWrapper';
import TeamListTable from './TeamListTable';

const TeamListPage: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const handleShowSuccess = (teamName: string) => {
    api['success']({
      message: `Successfully removed redemption record for ${teamName}`,
      description: `To redeem again, go to dashboard.`,
    });
  };

  return (
    <>
      {contextHolder}
      <PageWrapper breadcrumbs={[{ title: 'Team List' }]}>
        <TeamListTable handleShowSuccess={handleShowSuccess} />
      </PageWrapper>
    </>
  );
};

export default TeamListPage;
