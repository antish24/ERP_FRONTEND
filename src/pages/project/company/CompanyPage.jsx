import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../../context/AlertContext';
import axios from 'axios';
import ModalForm from '../../../modal/Modal';
import { Button } from 'antd';
import { BACKENDURL } from '../../../helper/Urls';
import NewCompanyForm from '../../../components/forms/project/NewCompanyForm';
import CompanyTable from '../../../components/tables/project/CompanyTable';

const CompanyPage = () => {
  const {openNotification} = useContext(AlertContext);

  const [companyData,setCompanyData]=useState([])
  const [loading,setLoading]=useState(false)

  const getCompanies=async()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/company/all`);
      setLoading (false);
      setCompanyData(res.data.companies)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  useEffect(()=>{
    getCompanies()
  },[])


  const [modalOpen, setModalOpen] = useState (false);

  return (
    <div>
      <div style={{height: '50px',display:'flex',gap:'10px'}}>
        <Button type="primary" onClick={() => setModalOpen (true)}>
          Add New Company
        </Button>
        <Button type='default' onClick={getCompanies} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={'New Company Form'}
          content={<NewCompanyForm reload={()=>getCompanies()} openModalFun={(e) => setModalOpen (e)}/>}
        />
      </div>
      <CompanyTable loading={loading} reload={()=>getCompanies()} companyData={companyData}/>
    </div>
  )
}

export default CompanyPage