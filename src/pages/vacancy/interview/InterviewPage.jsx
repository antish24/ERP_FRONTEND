import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../../context/AlertContext';
import axios from 'axios';
import ModalForm from '../../../modal/Modal';
import { Button } from 'antd';
import { BACKENDURL } from '../../../helper/Urls';
import InterviewTable from '../../../components/tables/vacancy/InterviewTable';
import NewInterviewForm from '../../../components/forms/vacancy/NewInterviewForm';

const InterviewPage = () => {
  const {openNotification} = useContext(AlertContext);

  const [interviewData,setinterviewData]=useState([])
  const [loading,setLoading]=useState(false)

  const getinterviewData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/interview/all`);
      setLoading (false);
      setinterviewData(res.data.interviews)
      console.log(res.data.interviews)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  useEffect(()=>{
    getinterviewData()
  },[])


  const [modalOpen, setModalOpen] = useState (false);

  return (
    <div>
      <div style={{height: '50px',display:'flex',gap:'10px'}}>
        <Button type="primary" onClick={() => setModalOpen (true)}>
          Add New Interview
        </Button>
        <Button type='default' onClick={getinterviewData} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={'New Interview Form'}
          content={<NewInterviewForm reload={()=>getinterviewData()} openModalFun={(e) => setModalOpen (e)}/>}
        />
      </div>
      <InterviewTable loading={loading} reload={()=>getinterviewData()} interviewData={interviewData}/>
    </div>
  )
}

export default InterviewPage