import { GiftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center ">
      <img
        src="giftally-logo-black-text.png"
        alt="GiftAlly Logo"
        className="container mx-auto mt-[10vh] h-3/6 w-3/6"
      />

      <Button
        size="large"
        icon={<GiftOutlined />}
        onClick={() => navigate('/redemption-dashboard')}
        className="animate-bounce"
      >
        Start Gifting!
      </Button>
    </div>
  );
};

export default HomePage;
