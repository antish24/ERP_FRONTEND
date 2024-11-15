import React, { useContext, useEffect, useState } from 'react'
import LeaveBalanceTable from '../../../components/tables/leave/LeaveBalanceTable'
import { AlertContext } from '../../../context/AlertContext';
import { BACKENDURL } from '../../../helper/Urls';
import axios from 'axios';
import FilterBalance from '../../../components/forms/leave/FilterBalance';

const LeaveBalancePage = () => {
  const {openNotification} = useContext(AlertContext);
  const [leaveBalanceData,setLeaveBalanceData]=useState([])
  const [loading,setLoading]=useState(false)


  const getLeaveBalanceData=async({year})=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/leave/balance/all?year=${year}`);
      setLoading (false);
      setLeaveBalanceData(res.data.all)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  return (
    <div>
      <FilterBalance reload={getLeaveBalanceData}/>
      <LeaveBalanceTable loading={loading} leaveData={leaveBalanceData}/>
    </div>
  )
}

export default LeaveBalancePage