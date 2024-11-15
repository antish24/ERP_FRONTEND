import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import ModalForm from '../../modal/Modal'; // Adjust if needed
import { BACKENDURL } from '../../helper/Urls';
import NewTenderForm from '../../components/forms/project/NewTenderForm';
import TenderTable from '../../components/tables/project/TenderTable';

const TenderPage = () => {
  const [tenderData, setTenderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch tender data from the backend
  const getTenderData =async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKENDURL}/tender/all`); // Adjust URL if needed
      console.log('Fetched Data:', res.data); // Check API response
      setTenderData(res.data); // Directly set data if it's an array
    } catch (error) {
      console.error('Failed to fetch tender data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTenderData();
  }, []);

  return (
    <div>
      <div style={{ height: '50px', display: 'flex', gap: '10px' }}>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add New Tender
        </Button>
        <Button type="default" onClick={getTenderData} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen(false)}
          title={'New Tender Form'}
          content={<NewTenderForm reload={getTenderData} openModalFun={setModalOpen} />}
        />
      </div>
      {/* Pass the fetched tender data and loading state to TenderTable */}
      <TenderTable loading={loading} reload={getTenderData} datas={tenderData} />
    </div>
  );
};

export default TenderPage;