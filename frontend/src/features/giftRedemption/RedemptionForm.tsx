import { Button, Card, Form, Select, SelectProps } from 'antd';
import { useCallback, useState } from 'react';
import { searchStaff } from '../../api/staffApi';
import { StaffModel } from '../../types/dashboard/staff';
import { getTeam, reedemForTeam } from '../../api/teamsApi';
import { debounce } from 'lodash';
import { GiftOutlined, TeamOutlined } from '@ant-design/icons';
import RedemptionStatus from './RedemptionStatus';
import { GovTechColors } from '../../utils/theme';

interface RedemptionFormStruct {
  staffPassIdFormInput: string;
}

interface RedemptionFormProps {
  handleShowSuccess: (teamName: string, staffId: string) => void;
  isFormSubmitting: boolean;
  setIsFormSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO use useStyles
const RedemptionForm: React.FC<RedemptionFormProps> = ({
  handleShowSuccess,
  isFormSubmitting,
  setIsFormSubmitting,
}: RedemptionFormProps) => {
  // ======================== Hooks & States ================================
  const [redemptionForm] = Form.useForm();

  // For data display
  const [staffData, setStaffData] = useState<StaffModel[]>([]);
  const [teamSelected, setTeamSelected] = useState<string>('');
  const [selectedTeamRedemptionStatus, setSelectedTeamRedemptionStatus] =
    useState<boolean>(false);
  // For form
  const [isStatusLoading, setIsLoadingStatus] = useState<boolean>(false);

  // Clean up method
  const resetLocalState = (): void => {
    redemptionForm.resetFields();
    setStaffData([]);
    setTeamSelected('');
    setSelectedTeamRedemptionStatus(false);
  };

  // ======================== Api calls and data ========================
  const selectOptions: SelectProps['options'] = staffData.map(
    (staff: StaffModel) => ({
      value: staff.staffPassId,
      label: staff.staffPassId,
    }),
  );

  const staffIdToTeamNameMap: { [staffId: string]: string } = staffData.reduce(
    (acc, curr: StaffModel) => ({ ...acc, [curr.staffPassId]: curr.teamName }),
    {},
  );

  // ============================== Handlers ================================
  const handleSelect = async (selectedStaffId: string) => {
    setIsLoadingStatus(true);
    setTeamSelected(staffIdToTeamNameMap[selectedStaffId] ?? '');
    // Since multiple people might be using the same app, we can't
    // rely on data we fetched a few minutes ago. Redemption history
    // is bound to change, but staff/team data isn't. Thus, we fetch
    // the team redemption status every team selected. Additionally,
    // we also handle potential race `condition in the backend, by
    // returning a failed response if another redeemer has redeemed
    // around the same time (by some miscomm irl).
    const response = await getTeam(staffIdToTeamNameMap[selectedStaffId]);
    // defensive programming
    if (response) {
      setSelectedTeamRedemptionStatus(!response.hasRedeemed);
    } else {
      setSelectedTeamRedemptionStatus(false);
    }
    setIsLoadingStatus(false);
    // Set options to only the one selected (UX)
    setStaffData([
      {
        staffPassId: selectedStaffId,
        teamName: staffIdToTeamNameMap[selectedStaffId],
        createdAt: '0',
      },
    ]);
  };

  const handleSubmitForm = async (_values: RedemptionFormStruct) => {
    async function handleRedeem() {
      setIsFormSubmitting(true);
      await reedemForTeam(
        teamSelected,
        redemptionForm.getFieldValue('staffPassIdFormInput'),
      );
      // Do something with response
      setIsFormSubmitting(false);
    }
    handleRedeem();
    // Show success to user
    handleShowSuccess(
      teamSelected,
      redemptionForm.getFieldValue('staffPassIdFormInput'),
    );
    // Clean up
    resetLocalState();
  };

  const handleSelectSearch = useCallback(
    debounce(async (searchStr: string) => {
      // We only search if the searchStr given is above 2 characters to maintain
      // performance. If the dataset grows larger, this threshold will have to
      // increase
      if (searchStr.length >= 3) {
        const staff = await searchStaff(searchStr);
        if (staff) {
          setStaffData(staff);
        }
      } else {
        setStaffData([]);
      }
    }, 500),
    [],
  );

  return (
    <>
      <Card title="Redeem Gift 🎁" bordered>
        <Form form={redemptionForm} onFinish={handleSubmitForm}>
          <Form.Item
            name={['staffPassIdFormInput']}
            label="Staff Pass ID"
            required={true}
            labelCol={{ span: 24 }}
          >
            <Select
              options={selectOptions}
              showSearch
              onSearch={handleSelectSearch}
              onSelect={handleSelect}
              disabled={isFormSubmitting}
              notFoundContent={null}
              filterOption={false}
              data-testid="inputBoxAlwaysPresent"
            />
          </Form.Item>
        </Form>
        {teamSelected !== '' && (
          <div className="mb-7 flex flex-row">
            <TeamOutlined
              className="text-lg"
              style={{ color: GovTechColors.GREEN }}
            />
            <span className="pl-2">{`Team: ${teamSelected}`}</span>
            <RedemptionStatus
              canRedeem={selectedTeamRedemptionStatus}
              teamName={teamSelected}
              isStatusLoading={isStatusLoading}
              data-testid="formitem2"
            />
          </div>
        )}
        <Button
          type="primary"
          onClick={redemptionForm.submit}
          icon={<GiftOutlined style={{ color: GovTechColors.GREEN }} />}
          className={
            selectedTeamRedemptionStatus
              ? 'animate-bounce hover:animate-pulse'
              : ''
          }
          disabled={
            teamSelected === '' ||
            isFormSubmitting ||
            !selectedTeamRedemptionStatus
          }
          ghost
          data-testid="redeemButtonAlwaysPresent"
        >
          Redeem
        </Button>
      </Card>
    </>
  );
};

export default RedemptionForm;
