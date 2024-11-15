import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../../context/AlertContext';
import axios from 'axios';
import ModalForm from '../../../modal/Modal';
import { Button } from 'antd';
import { BACKENDURL } from '../../../helper/Urls';
import NewAgreement from '../../../components/forms/employee/NewAgreement';
import AgreementTable from '../../../components/tables/employee/AgreementTable';

const AgreementPage = () => {
  const {openNotification} = useContext(AlertContext);

  const [agreementData,setAgreementData]=useState([])
  const [loading,setLoading]=useState(false)

  const getAgreementData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/employee/agreement/all`);
      setLoading (false);
      setAgreementData(res.data.agreements)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  useEffect(()=>{
    getAgreementData()
  },[])


  const [modalOpen, setModalOpen] = useState (false);

  return (
    <div>
      <div style={{height: '50px',display:'flex',gap:'10px'}}>
        <Button type="primary" onClick={() => setModalOpen (true)}>
          Register New Agreement
        </Button>
        <Button type='default' onClick={getAgreementData} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={'New Agreement Form'}
          content={<NewAgreement reload={()=>getAgreementData()} openModalFun={(e) => setModalOpen (e)}/>}
        />
      </div>
      <AgreementTable loading={loading} reload={()=>getAgreementData()} agreementData={agreementData}/>
    </div>
  )
}

export default AgreementPage