import {Button, Image, Tabs, Tag, Tooltip} from 'antd';
import React, {useState, useContext, useEffect} from 'react';
import EmployeeInfoTab from '../../../components/tabs/employee/EmployeeInfoTab';
import {FaBuilding, FaSchool, FaUserAlt, FaUserShield} from 'react-icons/fa';
import {FaHeartPulse, FaUserGear, FaUserLock} from 'react-icons/fa6';
import {MdDatasetLinked, MdList, MdPrint, MdReport, MdWorkHistory} from 'react-icons/md';
import {GiExitDoor} from 'react-icons/gi';
import ModalForm from '../../../modal/Modal';
import ReportEmployee from '../../../components/forms/employee/ReportEmployee';
import TextArea from 'antd/es/input/TextArea';
import {BACKENDURL} from '../../../helper/Urls';
import {AlertContext} from '../../../context/AlertContext';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { FormatDay } from '../../../helper/FormateDay';

const EmployeeDetail = () => {
  const {openNotification} = useContext (AlertContext);
  const params = useParams ();
  const [personalInfo, setPersonalInfo] = useState ([]);
  const [loadingPersonalInfo, setLoadingPersonalInfo] = useState (false);

  const getPersonalInfo = async () => {
    setLoadingPersonalInfo (true);
    try {
      const res = await axios.get (
        `${BACKENDURL}/employee/detail/personalinfo?id=${params.id}`
      );
      setLoadingPersonalInfo (false);
      console.log (res.data.employee);
      setPersonalInfo (res.data.employee);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoadingPersonalInfo (false);
    }
  };

  useEffect (() => {
    getPersonalInfo ();
  }, []);

  const EmployeeInfoData = [
    {
      key: '100',
      label: 'ID No',
      children:personalInfo.IDNO,
      name: 'IDNO',
      type: 'Input',
      width: '32%',
    },
    {
      key: '200',
      label: 'DOC No',
      children:personalInfo.docNo,
      name: 'docNo',
      type: 'Input',
      width: '32%',
    },
    {
      key: '300',
      label: 'ID or Passport No',
      name: 'IDNumber',
      children:personalInfo.IDNumber,
      type: 'Input',
      width: '32%',
    },
    {
      key: '1',
      label: 'Profile',
      children: (
        <Image
          src={`${BACKENDURL}/uploads/new/${personalInfo.profile}`}
          alt="profile"
          width={100}
          height={30}
        />
      ),
      name: 'profile',
      type: 'File',
      width: '32%',
      req: 'image/*',
    },
    {
      key: '2',
      label: 'ID Front',
      children: (
        <Image
          src={`${BACKENDURL}/uploads/new/${personalInfo.IDF}`}
          alt="ID Front"
          width={100}
          height={30}
        />
      ),
      name: 'IDF',
      type: 'File',
      width: '32%',
      req: 'image/*',
    },
    {
      key: '3',
      label: 'ID Back',
      children: (
        <Image
          src={`${BACKENDURL}/uploads/new/${personalInfo.IDB}`}
          alt="ID Back"
          width={100}
          height={30}
        />
      ),
      name: 'IDB',
      type: 'File',
      width: '32%',
      req: 'image/*',
    },
    {
      key: '4',
      label: 'Full Name',
      children: <div>{personalInfo.rank} {personalInfo.fullName} <br></br>{personalInfo.fullNameEnglish}</div>,
      name: 'fullName',
      type: 'Input',
      width: '69%',
    },
    {
      key: '5',
      label: 'Date of Birth',
      children: FormatDay(personalInfo.dateOfBirth),
      name: 'dateOfBirth',
      type: 'Date',
      width: '30%',
    },
    {
      key: '6',
      label: 'Gender',
      children: personalInfo.sex,
      name: 'sex',
      type: 'Select',
      options: [
        {value: 'Male', lable: 'Male'},
        {value: 'Female', lable: 'Female'},
      ],
      width: '25%',
    },
    {
      key: '7',
      label: 'Nationality',
      children: personalInfo.nationality,
      name: 'nationality',
      type: 'Input',
      width: '40%',
    },
    {
      key: '8',
      label: 'City / Regional',
      children: personalInfo.city,
      name: 'city',
      type: 'Input',
      width: '33%',
    },
    {
      key: '9',
      label: 'Sub City / Zone',
      children: personalInfo.subCity,
      name: 'subCity',
      type: 'Input',
      width: '35%',
    },
    {
      key: '10',
      label: 'Wereda',
      children: personalInfo.wereda,
      name: 'wereda',
      type: 'Input',
      width: '25%',
    },
    {
      key: '11',
      children: personalInfo.kebele,
      label: 'Kebele',
      name: 'kebele',
      type: 'Input',
      width: '17%',
    },
    {
      key: '11',
      label: 'House No',
      children: personalInfo.houseNo,
      name: 'houseNo',
      type: 'Input',
      width: '20%',
    },
    {
      key: '12',
      label: 'Email',
      children: personalInfo.email,
      name: 'email',
      type: 'Input',
      width: '50%',
      notRequired: true,
    },
    {
      key: '13',
      label: 'Phone',
      children: personalInfo.phone,
      name: 'phone',
      type: 'Input',
      width: '25%',
    },
    {
      key: '14',
      children: personalInfo.otherPhone,
      label: 'Optional Phone',
      name: 'otherPhone',
      type: 'Input',
      notRequired: true,
      width: '24%',
    },
  ];

  const WorkInfoData = [
    {key: '1', label: 'Branch',name:'branch',type:'Input',width:"24%" ,children:personalInfo.branch},
    {key: '2', label: 'Department', name: 'department',type:'Input',width:"24%" ,children:personalInfo.department},
    {key: '3', label: 'Postion',name:'position',type:'Input',width:"24%" ,children:personalInfo.position},
    {key: '4', label: 'Employee Type', name: 'employementType',type:'Input',width:"24%" ,children:personalInfo.employementType},
    {key: '7', label: 'Shift',  name: 'shift',type:'Input',width:"24%" ,children:personalInfo.shift},
    {key: '5', label: 'Start Date', name: 'startDate',type:'Input',width:"24%" ,children:FormatDay(personalInfo.startDate)},
    {key: '6', label: 'Salary', name: 'salary',type:'Input',width:"24%" ,children:personalInfo.salary},
    {
      key: '8',
      label: 'Agreement',
      name: 'agreement',type:'Input',width:"24%" ,
      children: (
        <a
          target="_blank"
          href={`${BACKENDURL}/uploads/new/${personalInfo.agreement}`}
          alt="profile"
        >
          View
        </a>
      ),
      span: 2,
    },
    {
      key: '13',
      label: 'Other Agreement',
      name: 'otherAgreement',type:'Input',width:"24%" ,
      children: 
        personalInfo.otherAgreement?<a
          target="_blank"
          href={`${BACKENDURL}/uploads/new/${personalInfo.otherAgreement}`}
          alt="profile"
        >
          View
        </a>
          :
         "None" 
        },
    {key: '12', label: 'Other Agreement Reason',name: 'bank',type:'Input',width:"24%" , children: personalInfo.reasonForOtherAgreement,span:2},
    {key: '9', label: 'Bank Name',name: 'bank',type:'Input',width:"24%" , children: personalInfo.bankName},
    {key: '11', label: 'Account Number',name: 'account',type:'Input',width:"24%" , children:personalInfo.bankAccount},
    {key: '10', label: 'Tin',name: 'TIN',type:'Input',width:"24%" , children:personalInfo.TIN},
  ];

  const PersonalInfoData = [
    {key: '1', label: 'Marital status', children: personalInfo.maritalStatus},
    {key: '2', label: 'Religion', children:  personalInfo.religion},
    {key: '3', label: 'Ethnic Group', children: personalInfo.ethnicGroup},
    {key: '6', label: 'Emergency Contact Name', children:  personalInfo.emergencyContactName},
    {key: '7', label: 'Emergency Contact Phone', children:  personalInfo.emergencyContactPhone},
    {key: '8', label: 'EmergencyContact Relation', children: personalInfo.emergencyContactRelation},
    {key: '12', label: 'Mother FullName', children:  personalInfo.motherFullName},
    {key: '5', label: 'Family', children:  personalInfo.familyBg},
    {key: '4', label: 'Blood Type', children: personalInfo.bloodGroup},
    {
      key: '9',
      label: 'Medical Report',
      children: (
        <a
          target="_blank"
          href={`${BACKENDURL}/uploads/new/${ personalInfo.medicalReport}`}
          alt="profile"
        >
          View
        </a>
      ),
    },
    {
      key: '10',
      label: 'FingerPrint Report',
      children: (
        <a
          target="_blank"
          href={`${BACKENDURL}/uploads/fingerprint/${personalInfo.fingerPrintReport}`}
          alt="finger report"
        >
          View
        </a>
      ),
    },
  ];

  const SuretyInfoData = [
    {key: '1', label: 'Type', children:personalInfo.suretyType},
    {
      key: '2',
      label: 'Attachment',
      span: 2,
      children: (
        <a
          target="_blank"
          href={`${BACKENDURL}/uploads/new/${ personalInfo.suretyAttachment}`}
          alt="profile"
        >
          View
        </a>
      ),
    },
    {key: '3', label: 'Full Name', children:personalInfo.suretyFullName},
    {key: '4', label: 'Phone',children:personalInfo.suretyPhone},
    {key: '5', label: 'City', children:personalInfo.suretyCity},
    {key: '6', label: 'Sub City',children:personalInfo.suretySubCity},
    {key: '7', label: 'Wereda',children:personalInfo.suretyWereda},
    {key: '8', label: 'Kebele',children:personalInfo.suretyKebele},
    {key: '9', label: 'House No',children:personalInfo.suretyHouseNo},
  ];

  const TerminationData = [
    {key: '1', label: 'Termination Date', children: '05 oct 2025'},
    {key: '9', label: 'Start Date', children: '01 oct 2025'},
    {
      key: '7',
      label: 'Clearance ',
      children: <Tag color="warning">Pending</Tag>,
    },
    {
      key: '2',
      label: 'Reason for Termination',
      children: <TextArea />,
      span: 3,
    },
    {key: '3', label: 'Exit Interview', children: <TextArea />, span: 3},
    {
      key: '4',
      label: 'Employee Acknowledgment',
      children: <TextArea />,
      span: 3,
    },
    {key: '8', label: 'Employee Letter', children: <TextArea />, span: 3},
    {
      key: '5',
      label: 'Confidentiality and Non-Disclosure Agreements',
      children: (
        <a
          target="_blank"
          href={`${BACKENDURL}/uploads/bulletproof flyer.pdf`}
          alt="profile"
        >
          View
        </a>
      ),
      span: 3,
    },
  ];

  const tabs = [
    {
      key: '1',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <FaUserAlt size={20} />Personal Info
        </div>
      ),
      children: <EmployeeInfoTab id={params.id} data={EmployeeInfoData} />,
    },
    {
      key: '2',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <FaBuilding size={20} />Work Detail
        </div>
      ),
      children: <EmployeeInfoTab data={WorkInfoData} />,
    },
    {
      key: '3',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <FaHeartPulse size={20} />Personal Info
        </div>
      ),
      children: <EmployeeInfoTab data={PersonalInfoData} />,
    },
    {
      key: '4',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <MdWorkHistory size={20} />Work History
        </div>
      ),
      children: <EmployeeInfoTab />,
    },
    {
      key: '5',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <FaSchool size={20} />Education
        </div>
      ),
      children: <EmployeeInfoTab />,
    },
    {
      key: '6',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <FaUserShield size={20} />Surety Info
        </div>
      ),
      children: <EmployeeInfoTab data={SuretyInfoData} />,
    },
    {
      key: '9',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <MdDatasetLinked size={20} />Salary Info
        </div>
      ),
      children: <EmployeeInfoTab data={SuretyInfoData} />,
    },
    {
      key: '7',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <GiExitDoor size={20} />Termination{' '}
        </div>
      ),
      children: <EmployeeInfoTab data={TerminationData} />,
    },
    {
      key: '8',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <MdList size={20} />Log
        </div>
      ),
      children: <EmployeeInfoTab />,
    },
  ];

  const [modalOpen, setModalOpen] = useState (false);

  return (
    <div>
      <ModalForm
        open={modalOpen}
        close={() => setModalOpen (false)}
        title={'Report Employee Form'}
        content={
          <ReportEmployee
            reload={() => console.log ('fun')}
            openModalFun={e => setModalOpen (e)}
          />
        }
      />
      <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
        <Tooltip title="Print"><Button><MdPrint />Print</Button></Tooltip>
        <Tooltip title="Status">
          <Button type="primary"><FaUserLock />Status</Button>
        </Tooltip>
        <Tooltip title="Report">
          <Button onClick={() => setModalOpen (true)} danger>
            <MdReport color="red" />Report
          </Button>
        </Tooltip>
      </div>
      <Tabs defaultActiveKey="1" items={tabs} style={{width: '100%'}} />
    </div>
  );
};

export default EmployeeDetail;
