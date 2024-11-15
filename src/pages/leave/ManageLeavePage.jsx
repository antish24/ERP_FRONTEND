import React, {useContext, useEffect, useState} from 'react';
import LeaveTypesTable from '../../components/tables/leave/LeaveTypesTable';
import {Button} from 'antd';
import HolidayTable from '../../components/tables/leave/HolidayTable';
import ModalForm from '../../modal/Modal';
import NewLeaveTypeForm from '../../components/forms/leave/NewLeaveTypeForm';
import NewHolidayForm from '../../components/forms/leave/NewHolidayForm';
import {BACKENDURL} from '../../helper/Urls';
import axios from 'axios';
import {AlertContext} from '../../context/AlertContext';
import LeaveAllocation from '../../components/tables/leave/LeaveAllocation';
import NewAllocationForm from '../../components/forms/leave/NewAllocationForm';

const ManageLeavePage = () => {
  const {openNotification} = useContext (AlertContext);

  const [leavewData, setLeavewData] = useState ([]);
  const [holidayData, setHolidayData] = useState ([]);
  const [allocationData, setAllocationData] = useState ([]);
  const [loading, setLoading] = useState (false);
  const [allocationLoading, setAllocationLoading] = useState (false);
  const [loadingHoliday, setLoadingHoliday] = useState (false);

  const [modalTitle, setModalTitle] = useState ('');
  const [modalContent, setModalContent] = useState ([]);
  const [modalOpen, setModalOpen] = useState (false);

  const getLeaveTypesData = async () => {
    setLoading (true);
    try {
      const res = await axios.get (`${BACKENDURL}/leave/alltype`);
      setLoading (false);
      setLeavewData (res.data.leaveTypes);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  };

  const getHolidayData = async () => {
    setLoadingHoliday (true);
    try {
      const res = await axios.get (`${BACKENDURL}/leave/allholiday`);
      setLoadingHoliday (false);
      setHolidayData (res.data.holidays);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoadingHoliday (false);
    }
  };

  const getAllocation = async () => {
    setAllocationLoading (true);
    try {
      const res = await axios.get (`${BACKENDURL}/leave/allocations`);
      setAllocationLoading (false);
      setAllocationData (res.data.all);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setAllocationLoading (false);
    }
  };

  useEffect (() => {
    getLeaveTypesData ();
    getAllocation ();
    getHolidayData ();
  }, []);

  const HandleType = () => {
    setModalTitle ('Add Leave Type');
    setModalOpen (true);
    setModalContent (
      <NewLeaveTypeForm
        reload={() => getLeaveTypesData ()}
        openModalFun={e => setModalOpen (e)}
      />
    );
  };

  const HandleHoliday = () => {
    setModalOpen (true);
    setModalTitle ('Add Holiday');
    setModalContent (
      <NewHolidayForm
        reload={() => getHolidayData ()}
        openModalFun={e => setModalOpen (e)}
      />
    );
  };

  const HandleAllocation = () => {
    setModalOpen (true);
    setModalTitle ('Leave Allocation Form');
    setModalContent (
      <NewAllocationForm
        reload={() => getAllocation ()}
        openModalFun={e => setModalOpen (e)}
      />
    );
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={modalTitle}
          content={modalContent}
        />
        <div style={{width: '62%'}}>
          <div style={{display: 'flex', gap: '5px', marginBottom: '5px'}}>
            <Button type="primary" onClick={HandleType}>Add Leave Type</Button>
            <Button onClick={getLeaveTypesData}>Reload</Button>
          </div>
          <LeaveTypesTable loading={loading} leaveData={leavewData} />
        </div>
        <div style={{width: '36%'}}>
          <div style={{display: 'flex', gap: '5px', marginBottom: '5px'}}>
            <Button type="primary" onClick={HandleHoliday}>Add Holiday</Button>
            <Button onClick={getHolidayData}>Reload</Button>
          </div>
          <HolidayTable loading={loadingHoliday} holidayData={holidayData} />
        </div>
      </div>
      <div style={{width: '100%'}}>
        <div style={{display: 'flex', gap: '5px', marginBottom: '5px'}}>
          <Button type="primary" onClick={HandleAllocation}>Leave Allocation</Button>
          <Button onClick={getAllocation}>Reload</Button>
        </div>
        <LeaveAllocation leaveData={allocationData} loading={allocationLoading} />
      </div>
    </div>
  );
};

export default ManageLeavePage;
