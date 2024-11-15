import React, { useContext, useEffect, useState } from 'react'
import LeaveTypesTable from '../../components/tables/leave/LeaveTypesTable'
import { Button } from 'antd'
import HolidayTable from '../../components/tables/leave/HolidayTable'
import ModalForm from '../../modal/Modal'
import { BACKENDURL } from '../../helper/Urls'
import axios from 'axios'
import { AlertContext } from '../../context/AlertContext'
import NewDocForm from '../../components/forms/doc/NewDocForm'
import NewDocTypeForm from '../../components/forms/doc/NewDocTypeForm'
import DocTable from '../../components/tables/doc/DocTable'
import DocTypesTable from '../../components/tables/doc/DocTypesTable'

const DocPage = () => {
  const {openNotification} = useContext(AlertContext);

  const [docTypeData,setdocTypeData]=useState([])
  const [docData,setdocData]=useState([])
  const [loading,setLoading]=useState(false)
  const [loadingDoc,setLoadingDoc]=useState(false)

  const [modalTitle, setModalTitle] = useState ('');
  const [modalContent, setModalContent] = useState ([]);
  const [modalOpen, setModalOpen] = useState (false);

  const getDocTypesData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/doc/type/all`);
      setLoading (false);
      setdocTypeData(res.data.docTypes)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  const getdocData=async()=>{
    setLoadingDoc(true)
    try {
      const res = await axios.get(`${BACKENDURL}/doc/all`);
      setLoadingDoc (false);
      setdocData(res.data.docs)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoadingDoc (false);
    }
  }

  useEffect(()=>{
    getDocTypesData()
    getdocData()
  },[])


  const HandleType=()=>{
    setModalOpen(true)
    setModalTitle('Add Doc Type');
    setModalContent(<NewDocTypeForm reload={()=>getDocTypesData()} openModalFun={(e) => setModalOpen (e)}/>)
  }

  const handleDoc=()=>{
    setModalTitle('Add Doc');
    setModalOpen(true)
    setModalContent(<NewDocForm reload={()=>getdocData()} openModalFun={(e) => setModalOpen (e)}/>)
    }

  return (
    <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
      <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={modalTitle}
          content={modalContent}
        />
        <div style={{width:'62%'}}>
            <div style={{display:'flex',gap:'5px',marginBottom:'5px'}}>
            <Button type='primary' onClick={handleDoc}>Add Doc</Button>
            <Button onClick={getdocData}>Reload</Button>
            </div>
            <DocTable loading={loadingDoc} data={docData} reload={getdocData}/>
        </div>
        <div style={{width:'36%'}}>
        <div style={{display:'flex',gap:'5px',marginBottom:'5px'}}>
            <Button type='primary' onClick={HandleType}>Add Doc Type</Button>
            <Button onClick={getDocTypesData}>Reload</Button>
            </div>
          <DocTypesTable loading={loading} reload={getDocTypesData} data={docTypeData}/>
        </div>
    </div>
  )
}

export default DocPage