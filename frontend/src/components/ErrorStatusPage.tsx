import { GiftOutlined, HomeFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router';

interface ErrorStatusPageProps {
  errorImg: string;
}

const ErrorStatusPage: React.FC<ErrorStatusPageProps> = ({
  errorImg,
}: ErrorStatusPageProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center ">
      <img
        src={errorImg}
        alt="GovTech Logo"
        className="animate-pulse container mx-auto mt-[5vh] h-2/6 w-2/6"
      />
      <Button
        size="large"
        icon={<GiftOutlined />}
        onClick={() => navigate('/redemption-dashboard')}
      >
        Go to Dashboard
      </Button>
      <Button
        className="mt-2 pl-5 pr-5"
        size="large"
        icon={<HomeFilled />}
        onClick={() => navigate('/')}
      >
        Return to Home
      </Button>
    </div>
  );
};

export default ErrorStatusPage;
