import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'antd'
import ModalForm from '../../../../modal/Modal'
import { BACKENDURL } from '../../../../helper/Urls'
import axios from 'axios'
import { AlertContext } from '../../../../context/AlertContext'
import NewSalaryStructureForm from '../../../../components/forms/payroll/salary/NewSalaryStructureForm'
import SalaryStructureTable from '../../../../components/tables/payroll/salary/SalaryStructureTable'

const SalaryStructurePage = () => {
  const {openNotification} = useContext(AlertContext);
  const [componentsData,setcomponentsData]=useState([])
  const [loading,setLoading]=useState(false)

  const [modalTitle, setModalTitle] = useState ('');
  const [modalContent, setModalContent] = useState ([]);
  const [modalOpen, setModalOpen] = useState (false);

  const getComponentsData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/salary/structure/all`);
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
    setModalTitle('New Salary Structure');
    setModalOpen(true)
    setModalContent(<NewSalaryStructureForm reload={()=>getComponentsData()} openModalFun={(e) => setModalOpen (e)}/>)
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
            <Button type='primary' onClick={HandleType}>Add Structure</Button>
            <Button onClick={getComponentsData}>Reload</Button>
            </div>
            <SalaryStructureTable loading={loading} reload={getComponentsData} structureData={componentsData}/>
        </div>
    </div>
  )
}

export default SalaryStructurePage