import React from 'react'
import { Tabs } from 'antd';
import IncomeTax from '../../../components/tabs/payroll/IncomeTax';
import PenstionFund from '../../../components/tabs/payroll/PenstionFund';
import NetPaymentTab from '../../../components/tabs/payroll/NetPaymentTab';
import SumationPayroll from '../../../components/tabs/payroll/SumationPayroll';

const PayrollReportPage = () => {
  const tabs = [
    {
      key: '1',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          Income Tax
        </div>
      ),
      children:<IncomeTax/>,
    },
    {
      key: '3',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          Penstion
        </div>
      ),
      children:<PenstionFund/>,
    },
    {
      key: '2',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          Net Payment
        </div>
      ),
      children:<NetPaymentTab/>,
    },
    {
      key: '4',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
         Summation
        </div>
      ),
      children:<SumationPayroll/>,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={tabs} style={{width: '100%'}} />
    </div>
  )
}

export default PayrollReportPage