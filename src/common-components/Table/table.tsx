import React, { useState } from "react";
import { Card, Table, ConfigProvider } from "antd";
import "./tableCss.css";
interface TableColumn {
  title?: string;
  dataIndex?: string;
  key?: string;
}
interface TableRowData {
  engagements?: string | React.ReactNode;
  client?: string;
  time?: string;
  date?: string;
  referralSource?: string;
  engagement?: string;
  agreementTitle?: string;
  engagementName?: string;
  requestedHour?: string;
  rates?: number;
  description?: string;
  referralType?: string;
  name?: string;
  link?: string;
  experts?: string;
  hours?: string;
  rate?: string;
  timeFrame?: string;
  contactFor?: string;
  notificationName?: React.ReactNode;
  activationTime?: React.ReactNode;
  sentTo?: React.ReactNode;
  email?: string;
  actions?: React.ReactNode;
  engagementTitle?: string;
  documentTitle?: string;
  projectExibits?: string;
  users?: React.ReactNode;
  clientName?: string;
  expertName?: string;
  billingPeriod?: string;
  noOfHours?: string;
  invoiceRatesAndInvoiceAmount?: string;
  paymentRateAndPaymentAmount?: string;
  notificationDetails?: string;
  businessName?: string;
  contactEmail?: string;
  status?: string;
  startDate?: string;
  totalBilled?: string;
  totalPaid?: string;
}
interface TableRowProps {
  children: React.ReactNode;
}
type TableProps = {
  columns: TableColumn[];
  data: TableRowData[];
  showHeader?: boolean;
  span?: number;
  paginationEnabled?: boolean;
  columnStyle?: string;
};
const TableComponent: React.FC<TableProps> = ({
  columns,
  data,
  showHeader = false,
  paginationEnabled = true,
  columnStyle,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const TableRow: React.FC<TableRowProps> = ({ children }) => (
    <Card
      className="max-h-fit mb-3 border border-[#E2E2E2] text-[15px] text-black font-khula font-normal"
      bodyStyle={{
        padding: "0",
       }}
    >
        <div className="hidden sm:flex justify-between items-center p-[5px]">
      {React.Children.map(children, (child, index) => (
        <div key={index} className={`sm:col-span-1 ${columnStyle}`}>
          {child}
        </div>
      ))}
    </div>
    <div className="sm:hidden flex flex-col p-[5px]">
      {React.Children.map(children, (child, index) => (
        <div key={index} className="mb-2">
          {child}
        </div>
      ))}
    </div>
    </Card>
  );
  const components = {
    header: {
      row: showHeader ? TableRow : () => null,
    },
    body: {
      row: TableRow,
    },
  };
  const tableColumns = columns.map((column) => ({
    ...column,
    title: (
      <div className="text-[#808080] text-[14px] font-khula font-semibold">
        {column.title}
      </div>
    ),
  }));
  return (
    <>
     <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#FFFFFF',
      },
    }}
  >
   <Table
        columns={tableColumns}
        dataSource={data}
        components={components}
        showHeader={showHeader}
        className="custom-table"
        pagination={paginationEnabled && {
          responsive: true,
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize || 10);
          },
         className: 'custom-pagination-class',
          style: {
            marginTop: "16px",
            justifyContent: "center",
          },
        }}
      />
      </ConfigProvider>
    </>
  );
};
export default TableComponent;