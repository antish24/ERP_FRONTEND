import React, {useContext, useEffect, useState} from 'react';
import {AlertContext} from '../../../context/AlertContext';
import axios from 'axios';
import ModalForm from '../../../modal/Modal';
import {Button} from 'antd';
import {BACKENDURL} from '../../../helper/Urls';
import ReportEmployee from '../../../components/forms/employee/ReportEmployee';
import BlacklistTable from '../../../components/tables/employee/BlacklistTable';
import CheckEmployee from '../../../components/forms/employee/CheckEmployee';

const BlacklistPage = () => {
  const {openNotification} = useContext (AlertContext);

  const [userData, setUserData] = useState ([]);
  const [loading, setLoading] = useState (false);

  const getUserData = async () => {
    setLoading (true);
    try {
      const res = await axios.get (`${BACKENDURL}/employee/all`);
      setLoading (false);
      setUserData (res.data.employees);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  };

  useEffect (() => {
    getUserData ();
  }, []);

  const [modalOpen, setModalOpen] = useState (false);
  const [modalContent, setModalContent] = useState ();
  const [modalContentTitle, setModalContentTitle] = useState ('');
  return (
    <div>
      <div style={{height: '50px', display: 'flex', gap: '10px'}}>
        <Button
          type="primary"
          onClick={() => {
            setModalOpen (true);
            setModalContentTitle ('Check Status Form ');
            setModalContent (
              <CheckEmployee
                data={[]}
                reload={() =>{}}
                openModalFun={e => setModalOpen (e)}
              />
            );
          }}
        >
          Check Status
        </Button>
        <Button
          type="primary"
          danger
          onClick={() => {
            setModalOpen (true);
            setModalContentTitle ('Report Employee Form');
            setModalContent (
              <ReportEmployee
                reload={() => getUserData ()}
                openModalFun={e => setModalOpen (e)}
              />
            );
          }}
        >
          Report Employee
        </Button>
        <Button type="default" onClick={getUserData} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={modalContentTitle}
          content={modalContent}
        />
      </div>
      <BlacklistTable
        loading={loading}
        reload={() => getUserData ()}
        userData={userData}
      />
    </div>
  );
};

export default BlacklistPage;
