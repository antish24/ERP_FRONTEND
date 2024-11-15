import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'antd'
import ModalForm from '../../../../modal/Modal'
import { BACKENDURL } from '../../../../helper/Urls'
import axios from 'axios'
import { AlertContext } from '../../../../context/AlertContext'
import SalaryAssignmentTable from '../../../../components/tables/payroll/salary/SalaryAssignmentTable'
import NewAssignSalaryStructureForm from '../../../../components/forms/payroll/salary/NewAssignSalaryStructureForm'

const StructureAssignmentPage = () => {
  const {openNotification} = useContext(AlertContext);
  const [componentsData,setcomponentsData]=useState([])
  const [loading,setLoading]=useState(false)

  const [modalTitle, setModalTitle] = useState ('');
  const [modalContent, setModalContent] = useState ([]);
  const [modalOpen, setModalOpen] = useState (false);

  const getComponentsData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/salary/assignment/all`);
      setLoading (false);
      setcomponentsData(res.data.all)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  useEffect(()=>{
    getComponentsData()
  },[])


  const HandleType=()=>{
    setModalTitle('Assign Salary Structure');
    setModalOpen(true)
    setModalContent(<NewAssignSalaryStructureForm reload={()=>getComponentsData()} openModalFun={(e) => setModalOpen (e)}/>)
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
            <Button type='primary' onClick={HandleType}>New Structure Assignment</Button>
            <Button onClick={getComponentsData}>Reload</Button>
            </div>
            <SalaryAssignmentTable loading={loading} reload={getComponentsData} structureData={componentsData}/>
        </div>
    </div>
  )
}

export default StructureAssignmentPage