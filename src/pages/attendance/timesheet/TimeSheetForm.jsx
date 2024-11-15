import React, { useContext, useState } from 'react'
import TimeSheetFormTable from '../../../components/tables/payroll/TimeSheetFormTable'
import FiterTimeSheetForm from '../../../components/forms/payroll/FiterTimeSheetForm';
import { BACKENDURL } from '../../../helper/Urls';
import axios from 'axios';
import { AlertContext } from '../../../context/AlertContext';

const TimeSheetForm = () => {
  const {openNotification} = useContext(AlertContext);

  const [timesheetData,setTimesheetData]=useState([])
  const [loading,setLoading]=useState(false)

  const getTimeSheetFormData=async({day,month,site,type})=>{
    setLoading(true)
    setTimesheetData([])
    try {
      const res = await axios.get(`${BACKENDURL}/timesheet/getform?day=${day}&&month=${month}&&site=${site}&&type=${type}`);
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
      <div><FiterTimeSheetForm  loading={loading} reload={getTimeSheetFormData}/></div>
        <TimeSheetFormTable reload={getTimeSheetFormData} timesheetData={timesheetData}/>
    </div>
  )
}

export default TimeSheetForm