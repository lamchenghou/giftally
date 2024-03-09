import PageWrapper from '../../../components/PageWrapper';
import RedemptionTable from './RedemptionTable';

const RedemptionDashboard: React.FC = () => {
  return (
    <PageWrapper breadcrumbs={[]}>
      <RedemptionTable columns={[]} tableData={[]} />
    </PageWrapper>
  );
};

export default RedemptionDashboard;
