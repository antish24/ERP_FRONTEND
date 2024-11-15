import React, { useContext, useEffect, useState } from 'react'
import TimeSheetTable from '../../../components/tables/payroll/TimeSheetTable'
import { AlertContext } from '../../../context/AlertContext';
import { BACKENDURL } from '../../../helper/Urls';
import axios from 'axios';
import FiterTimeSheet from '../../../components/forms/payroll/FiterTimeSheet';

const TimeSheet = () => {

  const {openNotification} = useContext(AlertContext);

  const [timesheetData,setTimesheetData]=useState([])
  const [loading,setLoading]=useState(false)

  const getTimeSheetData=async({month,site,type})=>{
    setLoading(true)
    setTimesheetData([])
    try {
      const res = await axios.get(`${BACKENDURL}/timesheet/all?month=${month}&&site=${site}&&type=${type}`);
      setLoading (false);
      openNotification('success', `${res.data.all.length} data found`, 3, 'green');
      setTimesheetData(res.data.all)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  return (
    <div>
      <div style={{display:'flex',height:'60px',justifyContent:'space-between'}}>
        <span style={{fontSize:'20px'}}>TimeSheet List </span>
      <div style={{display:'flex',gap:'10px'}}>
        <FiterTimeSheet loading={loading} reload={getTimeSheetData}/>
      </div>
      </div>

      <TimeSheetTable loading={loading} timesheetData={timesheetData}/></div>
  )
}

export default TimeSheet