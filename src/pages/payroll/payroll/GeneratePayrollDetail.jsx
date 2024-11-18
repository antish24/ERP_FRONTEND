import React, { useContext, useEffect, useState } from 'react';
import PayrollTable from '../../../components/tables/payroll/PayrollTable';
import { AlertContext } from '../../../context/AlertContext';
import axios from 'axios';
import { BACKENDURL } from '../../../helper/Urls';
import { useParams } from 'react-router-dom';

const GeneratePayrollDetail = () => {
  
  const {openNotification} = useContext(AlertContext);
  const [payrollData,setPayrollData]=useState([])
  const [loading,setLoading]=useState(false)
  const params=useParams()

  const getPayrollData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/payroll/generate/list?id=${params.id}`);
      setLoading (false);
      setPayrollData(res.data.list)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  useEffect(()=>{
    getPayrollData()
  },[])

  return <div><PayrollTable loading={loading} reload={getPayrollData} payrollData={payrollData} /></div>;
};

export default GeneratePayrollDetail;
