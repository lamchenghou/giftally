import {
  GiftTwoTone,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, MenuProps, Space, Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { PropsWithChildren, useState } from 'react';
import { GovTechColors } from '../utils/theme';

const MainLayout: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [sideMenuCollapsed, setSideMenuCollapsed] = useState<boolean>(false);

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <GiftTwoTone twoToneColor="#ff6961" />,
      label: 'Gift Redemption',
    },
    {
      key: '2',
      icon: <TeamOutlined style={{ color: GovTechColors.BLUE }} />,
      label: 'Modify Teams',
    },
  ];
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
          <div className="h-[3.75rem]" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={menuItems}
          />
        </Sider>

        <Layout>
          <Header>
            <Button
              icon={
                sideMenuCollapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )
              }
              onClick={() => setSideMenuCollapsed((c) => !c)}
            />
            <Text className="pl-3 text-lg/loose">
              {'GiftAlly - Your Ally in Giving Gifts'}
            </Text>
          </Header>
          <Content
            style={{
              margin: '24px 16px',

              minHeight: 280,
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG3,
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
