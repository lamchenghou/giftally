import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  LoadingOutlined,
} from '@ant-design/icons';
import { Spin } from 'antd';
import { ReactNode } from 'react';

interface RedemptionStatusProps {
  canRedeem: boolean;
  teamName: string;
  isStatusLoading: boolean;
}

const RedemptionStatus: React.FC<RedemptionStatusProps> = ({
  canRedeem,
  teamName,
  isStatusLoading,
}: RedemptionStatusProps) => {
  const iconIfCanRedeem: ReactNode = canRedeem ? (
    <CheckCircleTwoTone twoToneColor="green" />
  ) : (
    <CloseCircleTwoTone twoToneColor="red" />
  );
  const textIfCanRedeem: ReactNode = canRedeem
    ? `${teamName} is eligible for redemption!`
    : `${teamName} has already redeemed!`;
  return isStatusLoading ? (
    <Spin className="flex ml-auto" indicator={<LoadingOutlined spin />} />
  ) : (
    <div className="flex ml-auto">
      {iconIfCanRedeem}
      <span className="w-1" />
      {textIfCanRedeem}
    </div>
  );
};

export default RedemptionStatus;
