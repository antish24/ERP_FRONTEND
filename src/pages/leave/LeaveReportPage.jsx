import React, {useContext, useEffect, useState} from 'react';
import BarChart from '../../components/graph/BarChart';
import {BACKENDURL} from '../../helper/Urls';
import axios from 'axios';
import {AlertContext} from '../../context/AlertContext';
import {Button, DatePicker, Form, Select} from 'antd';

const LeaveReportPage = () => {
  const [yearlyLoading, setYearlyLoading] = useState (false);
  const [yearlyDayLoading, setYearlyDayLoading] = useState (false);
  const [yearlyOrgLoading, setYearlyOrgLoading] = useState (false);
  const [yearlyDayReportData, setYearlyDayReportData] = useState (false);
  const [yearlyReportData, setYearlyReportData] = useState (false);
  const [orgWiseReportData, setOrgWiseReportData] = useState (false);
  const {openNotification} = useContext (AlertContext);
  const [form, form1, form3] = Form.useForm ();

  const [branchData, setBranchData] = useState ([]);
  const [branchId, setBranchId] = useState ('');
  const [loadingBranch, setLoadingBranch] = useState (false);

  const getBranchData = async () => {
    setLoadingBranch (true);
    try {
      const res = await axios.get (`${BACKENDURL}/organzation/branch/all`);
      setLoadingBranch (false);
      setBranchData (res.data.branchs);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoadingBranch (false);
    }
  };

  const branchOptions = branchData.length
    ? branchData.map (branch => ({
        value: branch.id,
        label: branch.name,
      }))
    : [];

  useEffect (() => {
    getBranchData ();
  }, []);

  const [departmentData, setDepartmentData] = useState ([]);
  const [loadingDepartment, setLoadingDepartment] = useState (false);
  const [departmentId, setDepartmentId] = useState ('');

  const getDepartmentData = async id => {
    setLoadingDepartment (true);
    form.resetFields (['department']);
    try {
      const res = await axios.get (
        `${BACKENDURL}/organzation/department/find?branchId=${id}`
      );
      setLoadingDepartment (false);
      setDepartmentData (res.data.departments);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoadingDepartment (false);
    }
  };

  const departmentOptions = departmentData.length
    ? departmentData.map (department => ({
        value: department.id,
        label: department.name,
      }))
    : [];

  useEffect (
    () => {
      getDepartmentData (branchId);
    },
    [branchId]
  );

  const [positionData, setPositionData] = useState ([]);
  const [loadingPosition, setLoadingPosition] = useState (false);

  const getPositionData = async id => {
    setLoadingPosition (true);
    form.resetFields (['position']);
    try {
      const res = await axios.get (
        `${BACKENDURL}/organzation/position/find?departmentId=${id}`
      );
      setLoadingPosition (false);
      setPositionData (res.data.positions);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoadingPosition (false);
    }
  };

  const positionOptions = positionData.length
    ? positionData.map (position => ({
        value: position.id,
        label: position.name,
      }))
    : [];

  useEffect (
    () => {
      getPositionData (departmentId);
    },
    [departmentId]
  );

  const getYearlyLeaveReport = async values => {
    setYearlyLoading (true);
    try {
      const res = await axios.get (
        `${BACKENDURL}/leave/report/yearlyleaves?year=${values.year}&&status=${values.status}`
      );
      setYearlyLoading (false);
      setYearlyReportData (res.data.report);
    } catch (error) {
      console.log (error);
      setYearlyLoading (false);
      openNotification ('error', error.response.data.message, 3, 'red');
    }
  };

  const getOrgWiseData = async values => {
    setYearlyOrgLoading (true);
    try {
      const res = await axios.get (
        `${BACKENDURL}/leave/report/orgwise?year=${values.year}&&status=${values.status}&&departmentId=${values.department}&&positionId=${values.position}&&branchId=${values.branch}`
      );
      setYearlyOrgLoading (false);
      setOrgWiseReportData (res.data.report);
    } catch (error) {
      console.log (error);
      setYearlyOrgLoading (false);
      openNotification ('error', error.response.data.message, 3, 'red');
    }
  };

  const getYearlyLeaveDaysReport = async values => {
    setYearlyDayLoading (true);
    try {
      const res = await axios.get (
        `${BACKENDURL}/leave/report/yearlydays?year=${values.years}`
      );
      setYearlyDayLoading (false);
      setYearlyDayReportData (res.data.report);
    } catch (error) {
      setYearlyDayLoading (false);
      openNotification ('error', error.response.data.message, 3, 'red');
    }
  };

  const yearlyLeaves = {
    labels: yearlyLoading
      ? [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]
      : yearlyReportData && yearlyReportData.map (l => l.month),
    datasets: [
      {
        label: 'Quantity',
        data: yearlyLoading
          ? Array (12).fill (0).map (l => l)
          : yearlyReportData && yearlyReportData.map (l => l.leaveCount),
        borderColor: 'rgba(54, 162, 235,1)',
        backgroundColor: 'rgba(54, 162, 235,.5)',
      },
    ],
  };

  const yearlyLeavesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Yearly Leave Application Report',
      },
    },
  };

  const yearlyLeavesDays = {
    labels: yearlyDayLoading
      ? [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]
      : yearlyDayReportData && yearlyDayReportData.map (l => l.month),
    datasets: [
      {
        label: 'Quantity',
        data: yearlyDayLoading
          ? Array (12).fill (0).map (l => l)
          : yearlyDayReportData && yearlyDayReportData.map (l => l.totalDays),
        borderColor: 'rgba(54, 162, 235,1)',
        backgroundColor: 'rgba(54, 162, 235,.5)',
      },
    ],
  };

  const yearlyLeavesDayOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Yearly Leave Days Report',
      },
    },
  };

  const OrgWise = {
    labels: yearlyOrgLoading
      ? [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]
      : orgWiseReportData && orgWiseReportData.map (l => l.month),
    datasets: [
      {
        label: 'Quantity',
        data: yearlyOrgLoading
          ? Array (12).fill (0).map (l => l)
          : orgWiseReportData && orgWiseReportData.map (l => l.leaveCount),
        borderColor: 'rgba(54, 162, 235,1)',
        backgroundColor: 'rgba(54, 162, 235,.5)',
      },
    ],
  };

  const OrgWiseOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Yearly Organzation Wise Report',
      },
    },
  };

  const FindPosition = (name, value) => {
    if (name === 'branch') {
      setBranchId (value);
    } else if (name === 'department') {
      setDepartmentId (value);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: '10px',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '49%',
          padding: '5px',
          background: 'rgb(250,250,250)',
          borderRadius: '5px',
        }}
      >
        <Form
          layout="vertical"
          onFinish={getYearlyLeaveReport}
          form={form}
          style={{display: 'flex'}}
        >
          <Form.Item
            name="year"
            style={{margin: '5px', width: '150px'}}
            rules={[
              {
                required: true,
                message: 'Select Year',
              },
            ]}
          >
            <DatePicker picker="year" style={{width: '100%'}} />
          </Form.Item>
          <Form.Item
            name="status"
            style={{margin: '5px', width: '150px'}}
            rules={[
              {
                required: true,
                message: 'Select Status',
              },
            ]}
          >
            <Select
              placeholder="Search to Select"
              options={[
                {value: 'Approved', lable: 'Approved'},
                {value: 'Pending', lable: 'Pending'},
                {value: 'Failed', lable: 'Failed'},
              ]}
            />
          </Form.Item>
          <Form.Item style={{margin: '5px'}}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={yearlyLoading}
              loading={yearlyLoading}
            >
              Get Report
            </Button>
          </Form.Item>
        </Form>
        <BarChart lineData={yearlyLeaves} options={yearlyLeavesOptions} />
      </div>

      <div
        style={{
          width: '49%',
          padding: '5px',
          background: 'rgb(250,250,250)',
          borderRadius: '5px',
        }}
      >
        <Form
          layout="vertical"
          onFinish={getYearlyLeaveDaysReport}
          form={form1}
          style={{display: 'flex'}}
        >
          <Form.Item
            name="years"
            style={{margin: '5px', width: '150px'}}
            rules={[
              {
                required: true,
                message: 'Select Year',
              },
            ]}
          >
            <DatePicker picker="year" style={{width: '100%'}} />
          </Form.Item>
          <Form.Item style={{margin: '5px'}}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={yearlyDayLoading}
              loading={yearlyDayLoading}
            >
              Get Report
            </Button>
          </Form.Item>
        </Form>
        <BarChart
          lineData={yearlyLeavesDays}
          options={yearlyLeavesDayOptions}
        />
      </div>

      <div
        style={{
          width: '100%',
          padding: '5px',
          background: 'rgb(250,250,250)',
          borderRadius: '5px',
        }}
      >
        <Form
          layout="vertical"
          onFinish={getOrgWiseData}
          form={form3}
          style={{display: 'flex'}}
        >
          <Form.Item
            name="year"
            label="Year"
            style={{margin: '5px', width: '150px'}}
            rules={[
              {
                required: true,
                message: 'Select Year',
              },
            ]}
          >
            <DatePicker picker="year" style={{width: '100%'}} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            style={{margin: '5px', width: '150px'}}
            rules={[
              {
                required: true,
                message: 'Select Status',
              },
            ]}
          >
            <Select
              placeholder="Search to Select"
              options={[
                {value: 'Approved', lable: 'Approved'},
                {value: 'Pending', lable: 'Pending'},
                {value: 'Failed', lable: 'Failed'},
              ]}
            />
          </Form.Item>
          <Form.Item name="branch" label='Branch' style={{margin: '5px', width: '150px'}}>
            <Select
              options={branchOptions}
              onChange={e => {
                FindPosition ('branch', e);
              }}
            />
          </Form.Item>
          <Form.Item name="department" label="Department" style={{margin: '5px', width: '150px'}}>
            <Select
              options={departmentOptions}
              onChange={e => FindPosition ('department', e)}
            />
          </Form.Item>
          <Form.Item name="position" label="Position"  style={{margin: '5px', width: '150px'}}>
            <Select
              options={positionOptions}
              onChange={e => {
                FindPosition ('position', e);
              }}
            />
          </Form.Item>
          <Form.Item style={{margin: '5px'}}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={yearlyOrgLoading}
              loading={yearlyOrgLoading}
            >
              Get Report
            </Button>
          </Form.Item>
        </Form>
        <BarChart lineData={OrgWise} options={OrgWiseOptions} />
      </div>
    </div>
  );
};

export default LeaveReportPage;
