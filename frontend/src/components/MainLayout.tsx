import {
  GiftTwoTone,
  GithubOutlined,
  LinkedinFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Col, Layout, Menu, MenuProps, Row, Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { PropsWithChildren, useState } from 'react';
import { GovTechColors } from '../utils/theme';
import Grid from 'antd/es/card/Grid';
import { useLocation, useNavigate } from 'react-router';

const MainLayout: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  // ================== Hooks ==================
  const [sideMenuCollapsed, setSideMenuCollapsed] = useState<boolean>(false);

  const navigate = useNavigate();

  const location = useLocation();

  // ================== Component Props ==================
  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <GiftTwoTone twoToneColor="#ff6961" />,
      label: 'Gift Redemption',
      onClick: () => navigate('/redemption-dashboard'),
    },
    {
      key: '2',
      icon: <TeamOutlined style={{ color: GovTechColors.BLUE }} />,
      label: 'Team List',
      onClick: () => navigate('/team-list'),
    },
  ];

  const pathNameToKeyMap: { [pathName: string]: string } = {
    ['/redemption-dashboard']: '1',
    ['/team-list']: '2',
  };
  const { Text } = Typography;

  return (
    <>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={sideMenuCollapsed}
          // responsiveness
          collapsedWidth="0"
          breakpoint="xs"
          // since we have a state for collapse
          // we need to change that state onBreakpoint
          onBreakpoint={(c) => setSideMenuCollapsed(c)}
        >
          <div className="flex flex-col h-full">
            <a href="/">
              <img src="giftally-logo.png" alt="GiftAlly Logo" />
            </a>

            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[pathNameToKeyMap[location.pathname] ?? '1']}
              items={menuItems}
            />

            <Grid className="mt-auto p-4">
              <Row>
                <Text className="font-thin text-sm text-white/[.33]">
                  Made by: Lam Cheng Hou
                </Text>
              </Row>
              <Row gutter={6}>
                <Col>
                  <a
                    href="https://github.com/lamchenghou/giftally"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubOutlined
                      style={{ color: 'white', opacity: '80%' }}
                    />
                  </a>
                </Col>
                <Col>
                  <a
                    href="https://www.linkedin.com/in/lamchenghou/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedinFilled style={{ color: GovTechColors.BLUE }} />
                  </a>
                </Col>
              </Row>
            </Grid>
          </div>
        </Sider>

        <Layout>
          <Header className="bg-christmas-wallpaper">
            <Button
              icon={
                sideMenuCollapsed ? (
                  <MenuUnfoldOutlined style={{ color: 'white' }} />
                ) : (
                  <MenuFoldOutlined style={{ color: 'white' }} />
                )
              }
              onClick={() => setSideMenuCollapsed((c) => !c)}
            />
            <Text className="pl-3 text-lg/loose text-white">
              {'GiftAlly - Your Ally in Giving'}
            </Text>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              minHeight: 'calc(100vh - 120px)',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
