import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Card } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { ReactNode } from 'react';

export interface PageWrapperProps {
  breadcrumbs: BreadcrumbItemType[];
  children: ReactNode;
}
const PageWrapper: React.FC<PageWrapperProps> = ({
  breadcrumbs,
  children,
}: PageWrapperProps) => {
  const homeBreadCrumb: BreadcrumbItemType = {
    href: '/',
    title: <HomeOutlined />,
  };

  const breadCrumbItems: BreadcrumbItemType[] = [
    homeBreadCrumb,
    ...breadcrumbs,
  ];
  return (
    <div className="min-h-[100vh] flex flex-col">
      <Breadcrumb className="h-full" items={breadCrumbItems} />
      <Card className="flex-grow">{children}</Card>
    </div>
  );
};

export default PageWrapper;
