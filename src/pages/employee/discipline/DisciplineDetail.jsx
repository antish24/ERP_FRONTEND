import {Button, Descriptions, Image, Table, Tag, Tooltip} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { FaUserLock} from 'react-icons/fa6';
import {MdFilePresent, MdPrint, MdReport } from 'react-icons/md';
import ModalForm from '../../../modal/Modal';
import ReportEmployee from '../../../components/forms/employee/ReportEmployee';
import { Link, useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { AlertContext } from '../../../context/AlertContext';
import { BACKENDURL } from '../../../helper/Urls';
import axios from 'axios';
import { FormatDay } from '../../../helper/FormateDay';

const DisciplineDetail = () => {

  const {openNotification} = useContext(AlertContext);
  const params = useParams ();
  const [disciplineDetail, setdisciplineDetail] = useState ([]);
  const [loadingdisciplineDetail, setLoadingdisciplineDetail] = useState (false);

  const getdisciplineDetail = async () => {
    setLoadingdisciplineDetail (true);
    try {
      const res = await axios.get (
        `${BACKENDURL}/employee/discipline/detail?id=${params.id}`
      );
      setLoadingdisciplineDetail (false);
      setdisciplineDetail (res.data.list);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoadingdisciplineDetail (false);
    }
  };

  useEffect (() => {
    getdisciplineDetail ();
  }, []);


      const disciplineInfoData = [
        {key: '1',label: 'Employee IDNO',children:<Link to={`/employee/detail/${disciplineDetail.IDNO}`}>{disciplineDetail.IDNO}</Link>},
        {key: '2',label: 'Employee Full Name',children:<>{disciplineDetail.fullName}</>},
        {key: '3',label: 'incidentDate',children:<>{FormatDay(disciplineDetail.incidentDate)}</>},
        {key: '4',label: 'Description',children:<TextArea value={disciplineDetail.description}></TextArea>,span:3},
        {key: '5',label: 'Attachment',children:<Image/>,span:3},
        {key: '6',label: 'Witnesses',children:'',span:3},
        {key: '7',label: 'Employee Acknowledgment',children:'',span:3},
        {key: '8',label: 'Disciplinary Action Taken',children:"Warning"},
        {key: '11',label: 'Approved By',children:"EMP-00001"},
        {key: '10',label: 'Approved Date',children:"01 jul 2024"},
        {key: '9',label: 'Management Comments',children:"Space for manager or HR to provide additional context.",span:3},
        {key: '9',label: 'Status',children:<Tag color='success'>Approved</Tag>},
      ];

  const [modalOpen, setModalOpen] = useState (false);

  return (
    <div>
      <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={'Report Employee Form'}
          content={<ReportEmployee reload={()=>console.log('fun')} openModalFun={(e) => setModalOpen(e)}/>}
        />
      <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginBottom:'10px'}}>
        <Button><MdPrint/>Employee Acknowledgment</Button>
        <Button><MdFilePresent/>Take Action</Button>
        <Tooltip title='Status'><Button type='primary'><FaUserLock/>Status</Button></Tooltip>
        <Tooltip title='Report to Blacklist'><Button onClick={()=>setModalOpen(true)} danger><MdReport color='red'/>Report</Button></Tooltip>
      </div>
      <Descriptions
        style={{width: '100%'}}
        column={{xs: 1, sm: 1}}
        bordered
        size="small"
        items={disciplineInfoData}
      />
    </div>
  );
};

export default DisciplineDetail;
