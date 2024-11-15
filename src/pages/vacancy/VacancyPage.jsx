import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../context/AlertContext';
import axios from 'axios';
import ModalForm from '../../modal/Modal';
import { Button } from 'antd';
import { BACKENDURL } from '../../helper/Urls';
import VacancyTable from '../../components/tables/vacancy/VacancyTable';
import NewVancayForm from '../../components/forms/vacancy/NewVacancyForm';

const VacancyPage = () => {
  const {openNotification} = useContext(AlertContext);

  const [vacancyData,setvacancyData]=useState([])
  const [loading,setLoading]=useState(false)

  const getvacancyData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/vacancy/all`);
      setLoading (false);
      setvacancyData(res.data.vacancys)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  useEffect(()=>{
    getvacancyData()
  },[])


  const [modalOpen, setModalOpen] = useState (false);

  return (
    <div>
      <div style={{height: '50px',display:'flex',gap:'10px'}}>
        <Button type="primary" onClick={() => setModalOpen (true)}>
          Add New Vacancy
        </Button>
        <Button type='default' onClick={getvacancyData} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={'New Vacancy Form'}
          content={<NewVancayForm reload={()=>getvacancyData()} openModalFun={(e) => setModalOpen (e)}/>}
        />
      </div>
      <VacancyTable loading={loading} reload={()=>getvacancyData()} vacancyData={vacancyData}/>
    </div>
  )
}

export default VacancyPage