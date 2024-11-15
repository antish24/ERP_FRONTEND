import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'antd'
import ModalForm from '../../../modal/Modal'
import { BACKENDURL } from '../../../helper/Urls'
import axios from 'axios'
import { AlertContext } from '../../../context/AlertContext'
import GeneratePayrollTable from '../../../components/tables/payroll/GeneratePayrollTable'
import GeneratePayrollForm from '../../../components/forms/payroll/GeneratePayrollForm'

const GeneratePayroll = () => {
  const {openNotification} = useContext(AlertContext);
  const [generatedPayrollData,setgeneratedPayrollData]=useState([])
  const [loading,setLoading]=useState(false)

  const [modalTitle, setModalTitle] = useState ('');
  const [modalContent, setModalContent] = useState ([]);
  const [modalOpen, setModalOpen] = useState (false);

  const getGeneratedPayrollData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/payroll/generate/all`);
      setLoading (false);
      setgeneratedPayrollData(res.data.all)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  useEffect(()=>{
    getGeneratedPayrollData()
  },[])


  const HandleType=()=>{
    setModalTitle('Generate Payroll Form');
    setModalOpen(true)
    setModalContent(<GeneratePayrollForm reload={()=>getGeneratedPayrollData()} openModalFun={(e) => setModalOpen (e)}/>)
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
            <Button type='primary' onClick={HandleType}>Generate Payroll</Button>
            <Button onClick={getGeneratedPayrollData}>Reload</Button>
            </div>
            <GeneratePayrollTable loading={loading} reload={getGeneratedPayrollData} payrollData={generatedPayrollData}/>
        </div>
    </div>
  )
}

export default GeneratePayroll