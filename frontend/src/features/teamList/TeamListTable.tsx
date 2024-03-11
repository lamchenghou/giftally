import {
  Pagination,
  Spin,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { RedemptionHistoryCountGetData } from '../../types/dashboard/redemption';
import { useEffect, useState } from 'react';
import { TeamListTableRowData, TeamModel } from '../../types/dashboard/teams';
import { getTeams, getTeamsCount, unredeemForTeam } from '../../api/teamsApi';
import { Nullable } from '../../utils/TypeUtility';
import { convertEpochMsToDateTime } from '../../utils/TimeUtility';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

interface TeamListTableProps {
  handleShowSuccess: (teamName: string) => void;
}

const TeamListTable: React.FC<TeamListTableProps> = ({
  handleShowSuccess,
}: TeamListTableProps) => {
  // ======================== Pagination =======================================
  const onPaginationChange = (page: number, pageSize: number) => {
    setPaginationSettings((curr) => ({ ...curr, current: page, pageSize }));
  };
  const [paginationSettings, setPaginationSettings] = useState<
    Partial<TablePaginationConfig>
  >({
    current: 1,
    total: 10,
    pageSize: 10,
    showSizeChanger: true,
    onChange: onPaginationChange,
    pageSizeOptions: [5, 10, 20, 50],
  });

  // ======================== States & Data ====================================
  const [tableData, setTableData] = useState<TeamListTableRowData[]>([]);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  // To trigger reupdates of table, avoid clasehs with isTableLoading
  // (for pagination purposes)
  const [isUnredeeming, setIsUnredeeming] = useState<boolean>(false);

  // For the total count, to support pagination ================================
  useEffect(() => {
    async function fetchTeamsCount() {
      const data: Nullable<RedemptionHistoryCountGetData> =
        await getTeamsCount();
      if (data) {
        setPaginationSettings({ ...paginationSettings, total: data.count });
      }
    }
    fetchTeamsCount();
  }, []);

  // For the submittion of form, and any change in paginationSettings ==========
  useEffect(() => {
    async function fetchTeams() {
      setIsTableLoading(true);
      const count = paginationSettings?.pageSize ?? 10;
      const offset = ((paginationSettings?.current ?? 1) - 1) * count;
      const data: TeamModel[] = (await getTeams(count, offset)) ?? [];
      if (data) {
        setTableData(
          data.map((team: TeamModel, idx: number) => ({
            key: idx,
            teamName: team.teamName,
            hasRedeemed: team.hasRedeemed,
            collectorId: team.collectorId,
            redeemedAt: team.redeemedAt,
          })),
        );
      }
      setIsTableLoading(false);
    }
    fetchTeams();
  }, [paginationSettings, isUnredeeming]);

  // ======================== Handlers =====================================
  const handleUnredeemFor = async (teamName: string) => {
    setIsUnredeeming(true);
    await unredeemForTeam(teamName);
    handleShowSuccess(teamName);
    setIsUnredeeming(false);
  };
  // ======================== TableColumns =====================================
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

  const renderHasRedeemedCell = (hasRedeemed: boolean, record: TeamModel) => {
    if (hasRedeemed) {
      return (
        <>
          <CheckCircleTwoTone twoToneColor="green" />
          <Tag
            color="lime"
            className="ml-2 cursor-pointer"
            onClick={() => handleUnredeemFor(record.teamName)}
          >
            Unredeem
          </Tag>
        </>
      );
    } else {
      return <CloseCircleTwoTone twoToneColor="red" />;
    }
  };

  const tableColumns: TableProps['columns'] = [
    {
      title: 'Team',
      dataIndex: 'teamName',
      key: 'teamName',
    },
    {
      title: 'Redeemed?',
      dataIndex: 'hasRedeemed',
      key: 'hasRedeemed',
      render: renderHasRedeemedCell,
    },
    {
      title: 'Collector Staff Pass ID',
      dataIndex: 'collectorId',
      key: 'collectorId',
      render: renderCollectorIdCell,
    },
    {
      title: 'Redeemed at',
      dataIndex: 'redeemedAt',
      key: 'redeemedAt',
      render: renderRedeemedAtCell,
    },
  ];
  const { Text } = Typography;
  return (
    <>
      <div className="flex flex-row">
        <Text className="text-xl mb-4 font-semibold">Team List</Text>
        {!isTableLoading && (
          <Pagination className="ml-auto" {...paginationSettings} />
        )}
      </div>
      <div className="flex flex-row justify-center">
        {isTableLoading ? (
          <Spin className="mt-10" />
        ) : (
          <Table
            columns={tableColumns}
            dataSource={tableData}
            sticky
            bordered
            pagination={false}
          />
        )}
      </div>
    </>
  );
};

export default TeamListTable;
