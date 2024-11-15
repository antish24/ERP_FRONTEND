import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { BACKENDURL } from '../../../helper/Urls';
import NewPlanForm from '../../../components/forms/project/PlanForm';
import PlanTable from '../../../components/tables/project/PlanTable';
import ModalForm from '../../../modal/Modal';

const PlanPage = () => {
  const [planData, setPlanData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const getPlanData = async() => {
    setLoading(true);
    setPlanData([])
    try {
      const res = await axios.get(`${BACKENDURL}/plan/plans`); // Adjust URL if needed
      console.log('Fetched Plan Data:', res.data); // Check API response
      setPlanData(res.data.data || res.data); // Adjust based on API response structure
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch plan data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPlanData();
  }, []);

  return (
    <div>
      <div style={{ height: '50px', display: 'flex', gap: '10px' }}>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add New Plan
        </Button>
        <Button type="default" onClick={getPlanData} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen(false)}
          title={'New Plan Form'}
          content={<NewPlanForm reload={getPlanData} openModalFun={setModalOpen} />}
        />
      </div>
      <PlanTable loadingData={loading} datas={planData} />
    </div>
  );
};

export default PlanPage;