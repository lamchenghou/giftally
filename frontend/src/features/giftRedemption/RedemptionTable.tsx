import {
  Pagination,
  Spin,
  Table,
  TablePaginationConfig,
  TableProps,
  Tooltip,
  Typography,
} from 'antd';
import { RedemptionTableRowData } from '../../types/dashboard/redemption';
import { useEffect, useState } from 'react';
import { TeamModel } from '../../types/dashboard/teams';
import { getRedemptionHistory } from '../../api/teamsApi';
import { Nullable } from '../../utils/TypeUtility';
import { convertEpochMsToDateTime } from '../../utils/TimeUtility';

interface RedemptionTableProps {
  isFormSubmitting: boolean;
}

const RedemptionTable: React.FC<RedemptionTableProps> = ({
  isFormSubmitting,
}: RedemptionTableProps) => {
  // ======================== Pagination ================================
  const onPaginationChange = (page: number, pageSize: number) => {
    setPaginationSettings((curr) => ({ ...curr, current: page, pageSize }));
  };
  const [paginationSettings, setPaginationSettings] = useState<
    Partial<TablePaginationConfig>
  >({
    current: 1,
    total: 10,
    pageSize: 5,
    showSizeChanger: true,
    onChange: onPaginationChange,
    pageSizeOptions: [5, 10, 20, 50],
  });

  // ======================== States & Data ================================
  const [tableData, setTableData] = useState<RedemptionTableRowData[]>([]);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  useEffect(() => {
    async function fetchRedemptionHistory() {
      setIsTableLoading(true);
      const count = paginationSettings?.pageSize ?? 10;
      const offset = ((paginationSettings?.current ?? 1) - 1) * count;
      const data: TeamModel[] =
        (await getRedemptionHistory(count, offset)) ?? [];
      console.log(data);
      if (data) {
        setTableData(
          data.map((team: TeamModel, idx: number) => ({
            key: idx,
            teamName: team.teamName,
            collectorId: team.collectorId,
            redeemedAt: team.redeemedAt,
          })),
        );
      }
      setIsTableLoading(false);
    }
    fetchRedemptionHistory();
  }, [paginationSettings, isFormSubmitting]);

  // ======================== TableColumns ================================
  const renderCollectorIdCell = (collectorId: Nullable<string>) => {
    if (collectorId === null) {
      return <p>Not yet redeemed.</p>;
    }
    return <p>{collectorId}</p>;
  };

  const renderRedeemedAtCell = (redeemedAt: Nullable<string>) => {
    if (redeemedAt === null) {
      return <p>Not yet redeemed.</p>;
    }
    return (
      <Tooltip placement="topLeft" title={`${redeemedAt} epoch ms`}>
        <p>{convertEpochMsToDateTime(Number(redeemedAt))}</p>
      </Tooltip>
    );
  };
  const tableColumns: TableProps['columns'] = [
    {
      title: 'Team',
      dataIndex: 'teamName',
      key: 'teamName',
    },
    {
      title: 'Collector Staff Pass ID',
      dataIndex: 'collectorId',
      key: 'collectorId',
      render: renderCollectorIdCell,
    },
    {
      title: 'Reedemed at',
      dataIndex: 'redeemedAt',
      key: 'redeemedAt',
      render: renderRedeemedAtCell,
    },
  ];
  const { Text } = Typography;
  return (
    <>
      <div className="flex flex-row">
        <Text className="text-xl mb-4 font-semibold">Redemption History</Text>
        {!isTableLoading && (
          <Pagination className="ml-auto" {...paginationSettings} />
        )}
      </div>
      <div className="flex flex-row justify-center">
        {isTableLoading ? (
          <Spin tip="Loading" className="mt-10" />
        ) : (
          <Table
            columns={tableColumns}
            dataSource={tableData}
            sticky
            bordered
          />
        )}
      </div>
    </>
  );
};

export default RedemptionTable;