import { Divider, Typography, notification } from 'antd';
import PageWrapper from '../../components/PageWrapper';
import RedemptionForm from './RedemptionForm';
import RedemptionTable from './RedemptionTable';
import { useState } from 'react';

const RedemptionDashboard: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  // Since we are not using redux, we maintain this to trigger
  // a refresh in the table. This will represent a submission
  // state which will both disable the button and rereneder the
  // table.

  const [isFormSubmitting, setIsFormingSubmitting] = useState<boolean>(false);
  const handleShowSuccess = (
    teamName: string,
    staffId: string,
    staffCount: number,
  ) => {
    api['success']({
      message: `Successfully tracked redemption for ${teamName}`,
      description: `Collected by staff of id ${staffId}. Please collect for ${staffCount} employee(s)`,
      duration: 10,
    });
  };
  const { Text } = Typography;

  return (
    <>
      {contextHolder}
      <PageWrapper breadcrumbs={[{ title: 'Gift Redemption' }]}>
        <Text className="border inline-block p-3 mb-5 rounded-xl bg-[rgba(111,188,152,0.5)] text-2xl font-light">
          Gift Redemption @ GovTech
        </Text>

        <RedemptionForm
          handleShowSuccess={handleShowSuccess}
          isFormSubmitting={isFormSubmitting}
          setIsFormSubmitting={setIsFormingSubmitting}
        />
        <Divider />

        <RedemptionTable isFormSubmitting={isFormSubmitting} />
      </PageWrapper>
    </>
  );
};

export default RedemptionDashboard;
