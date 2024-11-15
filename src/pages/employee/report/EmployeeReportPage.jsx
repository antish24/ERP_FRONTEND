import React, { useState } from 'react';
import BarChart from '../../../components/graph/BarChart';
import { Button } from 'antd';
import ModalForm from '../../../modal/Modal';
import GenerateExcelReport from '../../../components/forms/employee/GenerateExcelReport';

const EmployeeReportPage = () => {
    const [modalOpen, setModalOpen] = useState (false);
    const [modalTitle, setModalTitle] = useState ('');
    const [modalContent, setModalContent] = useState ([]);

  const monthlyLeaves = {
    labels: ['Jun', 'Jul', 'Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'],
    datasets: [
      {
        label: 'Quantity',
        data: [2, 4, 1,13,8,4,19,4,11,8,19,23],
        borderColor: 'rgba(54, 162, 235,1)',
        backgroundColor: 'rgba(54, 162, 235,.5)',
      },
    ],
  };

  const positionWise = {
    labels: ['Software Dev', 'Guard', 'Sales'],
    datasets: [
      {
        label: 'Quantity',
        data: [1, 2, 1],
        borderColor: 'rgba(54, 162, 235,1)',
        backgroundColor: 'rgba(54, 162, 235,.5)',
      },
    ],
  };

  const branchWise = {
    labels: ['Leme Hotel', 'Head Office'],
    datasets: [
      {
        label: 'Quantity',
        data: [2, 0],
        borderColor: 'rgba(54, 162, 235,1)',
        backgroundColor: 'rgba(54, 162, 235,.5)',
      },
    ],
  };

  const monthlyOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'This Year Hired Employee ',
      },
    },
  };

  const vacancyOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Yearly Report',
      },
    },
  };

  const braOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Branch Wise',
      },
    },
  };

  const posOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Position Wise Leave',
      },
    },
  };

  return (
    <div>
        <Button
        onClick={()=>{
            setModalContent(<GenerateExcelReport
            loadingFieldOptionData={false}
            fieldOptionData={Array(10).fill(0).map ((position,index) => ({
                value: index,
                label: index,
              }))}
            reportEndPoint={'/employee/report/field'}
              openModalFun={e => setModalOpen (e)}
            />)
            ;
            setModalOpen(true);
            setModalTitle(`Employee Report Form`);
          }}
        >Generate Report</Button>
        <ModalForm
        open={modalOpen}
        close={() => setModalOpen (false)}
        title={modalTitle}
        content={modalContent}
      />
    <div style={{display:'flex',marginTop:'10px',flexWrap:'wrap',justifyContent:"space-between",rowGap:'10px',width:'100%'}}>
      <div style={{width: '32%',padding:'5px',background:"rgb(250,250,250)",borderRadius:'5px'}}>
        <BarChart lineData={branchWise} options={braOptions} />
      </div>

      <div style={{width: '32%',padding:'5px',background:"rgb(250,250,250)",borderRadius:'5px'}}>
        <BarChart lineData={monthlyLeaves} options={monthlyOptions} />
      </div>

      <div style={{width: '32%',padding:'5px',background:"rgb(250,250,250)",borderRadius:'5px'}}>
        <BarChart lineData={positionWise} options={posOptions} />
      </div>

    </div>
    </div>
  );
};

export default EmployeeReportPage;
