import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'antd'
import ModalForm from '../../../modal/Modal'
import { BACKENDURL } from '../../../helper/Urls'
import axios from 'axios'
import { AlertContext } from '../../../context/AlertContext'
import LeaveApplicationTable from '../../../components/tables/leave/LeaveApplicationTable'
import NewLeaveApplicationForm from '../../../components/forms/leave/NewLeaveApplicationForm'

const LeaveApplicationPage = () => {
  const {openNotification} = useContext(AlertContext);
  const [applicationData,setapplicationData]=useState([])
  const [loading,setLoading]=useState(false)

  const [modalTitle, setModalTitle] = useState ('');
  const [modalContent, setModalContent] = useState ([]);
  const [modalOpen, setModalOpen] = useState (false);

  const getLeaveApplicationData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/leave/application/all`);
      setLoading (false);
      setapplicationData(res.data.all)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  useEffect(()=>{
    getLeaveApplicationData()
  },[])


  const HandleType=()=>{
    setModalTitle('Leave Application');
    setModalOpen(true)
    setModalContent(<NewLeaveApplicationForm reload={()=>getLeaveApplicationData()} openModalFun={(e) => setModalOpen (e)}/>)
  }

  return (
    <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
      <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={modalTitle}
          content={modalContent}
        />
        <div style={{width:'100%'}}>
            <div style={{display:'flex',gap:'5px',marginBottom:'5px'}}>
            <Button type='primary' onClick={HandleType}>Add Leave Application</Button>
            <Button onClick={getLeaveApplicationData}>Reload</Button>
            </div>
            <LeaveApplicationTable loading={loading} reload={getLeaveApplicationData} applicationData={applicationData}/>
        </div>
    </div>
  )
}

export default LeaveApplicationPage