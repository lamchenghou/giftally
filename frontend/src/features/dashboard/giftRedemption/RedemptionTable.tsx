import { Button, Table, TableProps } from 'antd';
import { RedemptionTableRowData } from '../../../types/dashboard/redemption';
import { useState } from 'react';
import { TeamModel } from '../../../types/dashboard/teams';
import { getTeams } from '../../../api/teamsApi';

export interface RedemptionTableProps {
  columns: TableProps<RedemptionTableRowData>['columns'];
  tableData: RedemptionTableRowData[];
}
const RedemptionTable: React.FC<RedemptionTableProps> = ({
  columns,
  tableData,
}: RedemptionTableProps) => {
  const dummyColumns = [
    {
      title: 'Reedemer Staff ID',
      dataIndex: 'redeemerStaffPassId',
      key: 'redeemerStaffPassId',
    },
    {
      title: 'Team Name',
      dataIndex: 'teamName',
      key: 'teamName',
    },
    {
      title: 'Reedemed at (Epoch ms)',
      dataIndex: 'redeemedAt',
      key: 'redeemedAt',
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
    },
  ];
  const dummyDataToDelete = [
    {
      redeemerStaffPassId: 'STAFF_H123804820G',
      teamName: 'BASS',
      redeemedAt: '1623772799000',
    },
    {
      redeemerStaffPassId: 'STAFF_H123804820G',
      teamName: 'BASS',
      redeemedAt: '1623772799000',
      remarks: 'test',
    },
    {
      redeemerStaffPassId: 'STAFF_H123804820G',
      teamName: 'BASS',
      redeemedAt: '1623772799000',
    },
  ];
  // TODO: delete this dummy code
  const [teams, setTeams] = useState<TeamModel[]>([]);
  async function fetchTeams() {
    const response = await getTeams();
    setTeams(response ?? []);
  }
  return (
    <>
      <Button onClick={fetchTeams} />
      {JSON.stringify(teams)}
      <Table columns={dummyColumns} dataSource={dummyDataToDelete} />
    </>
  );
};

export default RedemptionTable;

// Example data to emulate
