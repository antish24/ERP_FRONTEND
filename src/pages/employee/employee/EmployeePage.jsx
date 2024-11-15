import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../../context/AlertContext';
import axios from 'axios';
import ModalForm from '../../../modal/Modal';
import { Button } from 'antd';
import { BACKENDURL } from '../../../helper/Urls';
import EmployeeTable from '../../../components/tables/employee/EmployeeTable';
import NewEmployee from '../../../components/forms/employee/NewEmployee';
import { FaCloudUploadAlt } from 'react-icons/fa';
import ImportCSV from '../../../helper/ImportCSV';

const EmployeePage = () => {
  const {openNotification} = useContext(AlertContext);

  const [userData,setUserData]=useState([])
  const [loading,setLoading]=useState(false)

  const getUserData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/employee/all`);
      setLoading (false);
      setUserData(res.data.employees)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  useEffect(()=>{
    getUserData()
  },[])


  const [modalOpen, setModalOpen] = useState (false);
  const [modalContent, setModalContent] = useState ([]);
  const [modalTitle, setModalTitle] = useState ('');

  return (
    <div>
      <div style={{height: '50px',display:'flex',gap:'10px'}}>
        <Button type="primary" onClick={() => {setModalOpen (true);setModalContent(<NewEmployee reload={()=>getUserData()} openModalFun={(e) => setModalOpen (e)}/>);setModalTitle('New Employee Form')}}>
          Register Employee
        </Button>
        <Button onClick={() => {setModalOpen (true);setModalContent(<ImportCSV route={'employee'} reload={()=>getUserData()} openModalFun={(e) => setModalOpen (e)}/>);setModalTitle('Import Employee Form')}}>
         <FaCloudUploadAlt/> Import Employee
        </Button>
        <Button type='default' onClick={getUserData} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={modalTitle}
          content={modalContent}
        />
      </div>
      <EmployeeTable loading={loading} reload={()=>getUserData()} userData={userData}/>
    </div>
  )
}

export default EmployeePage