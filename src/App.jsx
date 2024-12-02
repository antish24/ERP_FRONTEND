import React, {useEffect, useState} from 'react';
import { Link, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {Layout,theme,Breadcrumb,Button, Menu, Tooltip, Dropdown, Badge, Tabs,} from 'antd';

import {FaAngleRight,FaBuildingUser,FaClipboardList,FaCoins,FaDiagramProject,FaFileInvoice,FaFileSignature, FaUser, FaUserCheck, FaUserMinus, FaUsers, FaUserShield, FaWpforms} from 'react-icons/fa6';
import { MdAccountBalance, MdTimer,MdAirlines, MdAnalytics,  MdDashboard, MdLocationCity, MdOutlineDateRange, MdOutlineSupportAgent, MdOutlineWork, MdOutlineWorkHistory, MdWork, MdReport,  MdDocumentScanner, MdMessage, MdNextPlan, MdAddShoppingCart,  MdRemoveShoppingCart, MdManageHistory, MdStore } from 'react-icons/md';
import { PiOfficeChair } from 'react-icons/pi';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Users from './pages/users/Users';
import SupportPage from './pages/SupportPage';
import PageNotFound from './pages/PageNotFound';
import logo from './assets/imgs/image.png'

import { SiAwsorganizations, SiOnlyoffice, SiQuantconnect } from 'react-icons/si';
import { BsCalendarDate } from 'react-icons/bs';
import { IoNotificationsCircle, IoSettingsOutline, IoTimeOutline } from 'react-icons/io5';
import { HiOutlineDocumentReport} from 'react-icons/hi';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import VacancyPage from './pages/vacancy/VacancyPage';
import BranchPage from './pages/organzation/branch/BranchPage';
import DepartmentPage from './pages/organzation/department/DepartmentPage';
import PostionPage from './pages/organzation/postion/PostionPage';
import EmployeePage from './pages/employee/employee/EmployeePage';
import EmployeeDetail from './pages/employee/employee/EmployeeDetail';
import TimeSheet from './pages/attendance/timesheet/TimeSheet';
import PayrollReportPage from './pages/payroll/payroll/PayrollReportPage';
import TimeSheetForm from './pages/attendance/timesheet/TimeSheetForm';
import ApplicantList from './pages/vacancy/Applicant/ApplicantList';
import ApplicantDetail from './pages/vacancy/Applicant/ApplicantDetail';
import InterviewPage from './pages/vacancy/interview/InterviewPage';
import InterviewVacancyPage from './pages/vacancy/interview/InterviewVacancyPage';
import ManageLeavePage from './pages/leave/ManageLeavePage';
import LeaveBalancePage from './pages/leave/balance/LeaveBalancePage';
import LeaveApplicationPage from './pages/leave/application/LeaveApplicationPage';
import StructureAssignmentPage from './pages/payroll/salary/assigment/StructureAssignmentPage';
import SalaryStructurePage from './pages/payroll/salary/structure/SalaryStructurePage';
import SalaryComponentsPage from './pages/payroll/salary/components/SalaryComponentsPage';
import GeneratePayroll from './pages/payroll/payroll/GeneratePayroll';
import GeneratePayrollDetail from './pages/payroll/payroll/GeneratePayrollDetail';
import CompanyPage from './pages/project/company/CompanyPage';
import PlanPage from './pages/project/plan/PlanPage';
import ProjectsPage from './pages/project/projects/ProjectsPage';
import TenderPage from './pages/project/TenderPage';
import ReportPage from './pages/report/ReportPage';
import ProjectDetail from './pages/project/projects/ProjectDetail';
import ReportAnalyticsPage from './pages/report/ReportAnalyticsPage';
import DisciplinePage from './pages/employee/discipline/DisciplinePage';
import DisciplineDetail from './pages/employee/discipline/DisciplineDetail';
import BlacklistDetail from './pages/employee/discipline/BlacklistDetail';
import BlacklistPage from './pages/employee/discipline/BlacklistPage';
import VacancyReport from './pages/vacancy/report/VacancyReport';
import NewUserForm from './components/forms/users/NewUserForm';
import ModalForm from './modal/Modal';
import NewMessageForm from './components/forms/users/NewMessageForm';
import ChangePasswordForm from './components/forms/users/ChangePasswordForm';
import DocPage from './pages/doc/DocPage';
import DocReportPage from './pages/doc/DocReportPage';
import OrganzationInfo from './pages/organzation/OrganzationInfo';
import PromotionPage from './pages/PromotionPage';
import LeaveReportPage from './pages/leave/LeaveReportPage';
import EmployeeReportPage from './pages/employee/report/EmployeeReportPage';
import { BACKENDURL } from './helper/Urls';
import axios from 'axios';
import { GiAutoRepair, GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import { LuPanelLeftClose, LuPanelRightClose } from 'react-icons/lu';
import { IoMdArrowBack } from 'react-icons/io';
import Search from 'antd/es/input/Search';
import LayoutSearchForm from './helper/LayoutSearchForm';
import AssetAnalytics from './pages/asset/AssetAnalytics';
import AssetStore from './pages/asset/inventory/AssetStore';
import AssetTransaction from './pages/asset/inventory/transaction/AssetTransaction';
import AssetTransactionDetail from './pages/asset/inventory/transaction/AssetTransactionDetail';
import AssetBatchDetailPage from './pages/asset/inventory/AssetBatchDetailPage';
import SellingAssetPage from './pages/asset/manage/selling/SellingAssetPage';

const {Header, Content, Footer, Sider} = Layout;

const App = () => {
  
  const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken ();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: '1',
      label: <Link to={'/dashboard'}>Dashboard</Link>,
      icon: <MdDashboard size={20} />,
    },
    {
      key: '2',
      label: 'Manage Vacancy',
      icon: <MdOutlineWork size={20} />,
      children: [
        {
          key: '22',
          label: <Link to={'/vacancy/interview'}><FaUserCheck/> Interview</Link>,
        },
        {
          key: '21',
          label: <Link to={'/vacancy/list'}><MdOutlineWorkHistory /> Vacancy</Link>,
        },
        {
          key: '23',
          label: <Link to={'/vacancy/reports'}><MdAnalytics/> Reports</Link>,
        },
      ],
    },
    {
      key: '3',
      label: 'Organzation',
      icon: <SiAwsorganizations size={20} />,
      children: [
        {
          key: '34',
          label: <Link to={'/organzation/info'}><HiBuildingOffice2/> Info</Link>,
        },
        {
          key: '31',
          label: <Link to={'/organzation/branch'}><MdLocationCity/> Branch</Link>,
        },
        {
          key: '32',
          label: <Link to={'/organzation/department'}><SiOnlyoffice/> Department</Link>,
        },
        {
          key: '33',
          label: <Link to={'/organzation/postion'}><PiOfficeChair/> Postion</Link>,
        },
      ],
    },
    {
      key: '4',
      label: 'Employee',
      icon: <FaBuildingUser size={20} />,
      children: [
        {
          key: '41',
          label: <Link to={'/employee/list'}><FaUsers/> Employees</Link>,
        },
        // {
        //   key: '42',
        //   label:<Link to={'/employee/agreement'}><GoLaw/> Agreement</Link>,
        // },
        // {
        //   key: '43',
        //   label: <><FaUsersGear/> Performace</>,
        //   children: [
        //     {
        //       key: '431',
        //       label: <Link to={'/employee/performace/setting'}><MdSettings/> Setting</Link>,
        //     },
        //     {
        //       key: '432',
        //       label: <Link to={'/employee/performace/list'}><FaWpforms/> Performace</Link>,
        //     },
        //   ],
        // },
        {
          key: '44',
          label:<Link to={'/discipline/list'}><FaFileSignature/> Discipline</Link>,
        },
        {
          key: '46',
          label:<Link to={'/blacklist/list'}><FaWpforms/> Blacklist</Link>,
        },
        {
          key: '45',
          label: <Link to={'/employee/report'}><HiOutlineDocumentReport/> Reports</Link>,
        },
      ],
    },
    {
      key: '5',
      label: 'Manage Project',
      icon: <FaDiagramProject size={20} />,
      children: [
        {
          key: '51',
          label: <Link to={'/project/company'}><MdWork/> Companies</Link>,
        },
        {
          key: '53',
          label: <Link to={'/project/plan'}><FaUserCheck/> Plan</Link>,
        },
        {
          key: '52',
          label: <Link to={'/project/list'}><MdWork/> Projects</Link>,
        },
        {
          key: '54',
          label: <Link to={'/project/tender'}><FaUserCheck/> Tender</Link>,
        },
      ],
    },
    {
      key: '15',
      label: 'Manage Doc',
      icon: <MdDocumentScanner size={20} />,
      children: [
        {
          key: '152',
          label: <Link to={'/doc/list'}><FaClipboardList/> List</Link>,
        },
        {
          key: '153',
          label: <Link to={'/doc/report'}><HiOutlineDocumentReport/> Report</Link>,
        },
      ],
    },
    {
      key: '6',
      label: 'Manage Leave',
      icon: <MdOutlineDateRange size={20} />,
      children: [
        {
          key: '61',
          label: <Link to={'/leave/leaves'}><MdAirlines/> Leaves</Link>,
        },
        {
          key: '62',
          label: <Link to={'/leave/application'}><FaWpforms/> Application</Link>,
        },
        {
          key: '63',
          label: <Link to={'/leave/balance'}><BsCalendarDate/> Balance</Link>,
        },
        {
          key: '64',
          label: <Link to={'/leave/report'}><HiOutlineDocumentReport/> Report</Link>,
        },
      ],
    },
    {
      key: '7',
      label: 'Manage Asset',
      icon: <MdAccountBalance size={20} />,
      children: [
        {
          key: '71',
          label: <span to={'/asset/store'}><MdAccountBalance/> Assets</span>,
          children: [
            {
              key: '711',
              label: <Link to={'/asset/store'}><MdStore/> Store</Link>,
            },
            {
              key: '712',
              label: <Link to={'/asset/transaction'}><FaClipboardList/> Transaction</Link>,
            },
          ]
        },
        {
          key: '72',
          label: <span><MdManageHistory/> Manage</span>,
          children: [
            {
              key: '722',
              label: <Link to={'/asset/selling'}><MdRemoveShoppingCart/> Selling</Link>,
            },
            {
              key: '723',
              label: <Link to={'/asset/maintenance'}><GiAutoRepair/> Maintenance</Link>,
            },
          ]
        },
        {
          key: '73',
          label: <Link to={'/asset/analytics'}><MdAnalytics/> Analytics</Link>,
        },
      ],
    },

    {
      key: '8',
      label: 'Attendance',
      icon: <MdTimer size={20} />,
      children: [
        {
          key: '81',
          label:<><IoTimeOutline/> TimeSheet</>,
          children: [
            {
              key: '811',
              label: <Link to={'/timesheet/form'}><FaClipboardList/> Form</Link>,
            },
            {
              key: '812',
              label: <Link to={'/timesheet/list'}><MdAccountBalance/> List</Link>,
            },
          ],
        },
        {
          key: '82',
          label: <><FaUserMinus/> Attendance</>,
          // children: [
          //   {
          //     key: '821',
          //     label: <Link to={'/timesheet/form'}><FaClipboardList/> Components</Link>,
          //   },
          //   {
          //     key: '822',
          //     label: <Link to={'/timesheet/list'}><MdAccountBalance/> Structure</Link>,
          //   },
          //   {
          //     key: '823',
          //     label: <Link to={'/timesheet/list'}><MdAccountBalance/> Assignment</Link>,
          //   },
          // ],
        },
      ],
    },
    {
      key: '9',
      label: 'Manage Payroll',
      icon: <GiMoneyStack size={20} />,
      children: [
        {
          key: '91',
          label: <><FaCoins/> Salary</>,
          children: [
            {
              key: '911',
              label: <Link to={'/payroll/salary/components'}><FaClipboardList/> Components</Link>,
            },
            {
              key: '912',
              label: <Link to={'/payroll/salary/structure'}><MdAccountBalance/> Structure</Link>,
            },
            {
              key: '913',
              label: <Link to={'/payroll/salary/assignment'}><GiTakeMyMoney/> Assignment</Link>,
            },
          ],
        },
        {
          key: '92',
          label: <><FaFileInvoice/> Payroll</>,
          children: [
            {
              key: '921',
              label: <Link to={'/payroll/advance'}><FaUser/> Advance</Link>,
            },
            {
              key: '922',
              label: <Link to={'/payroll/generate'}><FaUsers/> Generate</Link>,
            },
            {
              key: '923',
              label: <Link to={'/payroll/list/report'}><HiOutlineDocumentReport/> Report</Link>,
            },
          ],
        },
      ],
    },
    {
      key: '10',
      label: 'Daily Report',
      icon: <MdReport size={20} />,
      children: [
        {
          key: '101',
          label: <Link to={'/dailyreport/list'}><FaClipboardList/> List</Link>,
        },
        {
          key: '102',
          label: <Link to={'/dailyreport/analytics'}><MdAnalytics/> Analytics</Link>,
        },
      ],
    },
    {
      key: 'System',
      label: <div style={{width:'100%',background:'rgba(255,255,255,.3)',height:'3px'}}></div>,
      type: 'group',
    },
    {
      key: '/users',
      label:<Link to={'/users/list'}>Users</Link>,
      icon: <FaUserShield size={20} />,
    },
    {
      key: '17',
      label: <Link to={'/promotion'}>Promotion</Link>,
      icon: <SiQuantconnect size={20} />,
    },
    {
      key: '14',
      label: <Link to={'/support'}>Help & Support</Link>,
      icon: <MdOutlineSupportAgent size={20} />,
    },
    {
      key: '15',
      label: 'Version 0.3',
      icon: <MdNextPlan size={20} />,
    },
  ];

  
  const getLevelKeys = items1 => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach (item => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func (item.children, level + 1);
        }
      });
    };
    func (items1);
    return key;
  };
  const levelKeys = getLevelKeys (items);

  const [stateOpenKeys, setStateOpenKeys] = useState ([]);
  const onOpenChange = openKeys => {
    const currentOpenKey = openKeys.find (
      key => stateOpenKeys.indexOf (key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter (key => key !== currentOpenKey)
        .findIndex (key => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys (
        openKeys
          // remove repeat key
          .filter ((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter (key => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys (openKeys);
    }
  };

  const pathName=useLocation().pathname
  const paths =pathName.split ('/').filter (path => path);

  const [openValue, setOpenValue] = useState (false);
  const [openTitle, setTitle] = useState (false);
  const [openContent, setOpenContent] = useState ();

  const tabs = [
    {
      key: '1',
      label: 'Alert',
      children: <span>Alert</span>,
    },
    {
      key: '2',
      label: 'Inbox',
      children: <span>Inbox</span>,
    },
    {
      key: '3',
      label: 'Sent',
      children: <span>Sent</span>,
    },
    {
      key: '4',
      label: 'Draft',
      children: <span>Draft</span>,
    },
  ]

  const items1 = [
    {
      key: '1',
      label: (
        <span style={{width:'100%',display:'flex',alignItems:'center'}}
          onClick={() => {
            setOpenValue (true);
            setOpenContent (<NewUserForm />);
            setTitle ('Profile');
          }}
        >
          Profile
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span
          onClick={() => {
            setOpenValue (true);
            setOpenContent (<ChangePasswordForm />);
            setTitle ('Change Password');
          }}
        >
          Change Password
        </span>
      ),
    },
    {
      key: '3',
      label: (
        <span style={{width:'100%',display:'flex',alignItems:'center'}}
          onClick={()=>{localStorage.setItem('ERPUSER_Token','');navigate('/')}}
        >
          Logout
        </span>
      ),
    },
  ];

  const items2 = [
    {
      key: '4',
      label: (
        <Tabs defaultActiveKey="1" items={paths.includes('administrators')?tabs:tabs} style={{width: '350px',height:'450px'}} onChange={()=>(c=>!c)}/>
        // <Tabs defaultActiveKey="1" items={paths.includes('administrators')?tabs:tabs.slice(0,3)} style={{width: '350px',height:'450px'}} onChange={()=>(c=>!c)}/>
      ),
    },
  ];
  const [visible, setVisible] = useState(false);


  const navigate = useNavigate ();
  const [authLoading, setAuthLoading] = useState (true);

  const IsUserAuth =async()=>{
    setAuthLoading(true)
    const headers = {
      "Authorization": `Bearer ${localStorage.getItem('ERPUSER_Token')}`,
    };
  try {
    const res=await axios.get(`${BACKENDURL}/auth/user`,{headers})
    setAuthLoading(false)
  } catch (error) {
    setAuthLoading(false)
    navigate('/')
  }
  }

  useEffect(() => {
    IsUserAuth()
  }, [pathName])
  
  return (
  <div>
    {/* {authLoading?<Spin style={{display:'flex',alignItems:'center',justifyContent:'center',width:"100vw",height:'100vh'}}></Spin>: */}
    <Layout style={{height: '100vh'}} >
      <ModalForm
        open={openValue}
        close={() => setOpenValue (false)}
        content={openContent}
        title={openTitle}
      />
      <Sider
      trigger={null} collapsible collapsed={collapsed}
      theme='dark'
      style={{overflow:'scroll'}}
      >
        <div
          style={{
            width: '100%',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position:'relative',
            flexDirection: 'column',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <LuPanelRightClose color='white' size={collapsed?30:20}/> : <LuPanelLeftClose color='white' size={20} />}
            onClick={() =>{setCollapsed(!collapsed);}}
            style={{
              fontSize: '16px',
              position:'absolute',
              right:!collapsed&&'0',
              top:!collapsed&&'0'
            }}
          />
          <img src={logo} alt='logo' style={{width:"auto",height:collapsed?'0%':'100%',objectFit:'contain'}}/>
        </div>
        <Menu
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            theme='dark'
            style={{overflow: 'hidden', width: '100%'}}
            mode="inline"
            items={items}
          />
          <div style={{height:'40px'}}></div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 16px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          
          <IoMdArrowBack style={{fontSize:'25px'}} cursor='pointer' onClick={()=>navigate(-1)}/>
          </div>
            <Breadcrumb separator={<FaAngleRight />}>
              {paths.map ((path, index) => {
                const url = '/' + paths.slice (0, index + 1).join ('/');
                return (
                  <Breadcrumb.Item key={path}>
                    {path.toLocaleUpperCase()}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          </div>
         
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
          <Search
          placeholder="Search"
          allowClear
          size='middle'
          style={{width:'300px',marginRight:'20px'}}
          onSearch={(v) => {
            setOpenValue (true);
            setOpenContent (<LayoutSearchForm value={v} openModalFun={(e)=>setOpenValue(e)}/>);
            setTitle (`Search Results for ${v}`);
          }}
          />
          <Tooltip title='Write Message'>
          <MdMessage onClick={() => {
            setOpenValue (true);
            setOpenContent (<NewMessageForm openModalFun={(e)=>setOpenValue(e)}/>);
            setTitle ('Message');
          }} size={25} cursor={'pointer'} />
          </Tooltip>
          <Dropdown
          visible={visible}
          onVisibleChange={v=>setVisible(v)}
              menu={{
                items: items2,onClick:()=>setVisible(true)
              }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Badge size="small" count={0}>
                <IoNotificationsCircle size={26} cursor={'pointer'} />
                {/* <IoNotificationsCircle size={26} onClick={()=>play()} cursor={'pointer'} /> */}
              </Badge>
            </Dropdown>
            <Dropdown
              menu={{
                items: items1,
              }}
              placement="bottomRight"
              trigger={['click']}
            >
              <IoSettingsOutline size={22} cursor={'pointer'} />
            </Dropdown>
          </div>

        </Header>
        <Content
          style={{
            overflow: 'scroll',
            margin: '16px 8px 0',
          }}
        >
          <div
            style={{
              padding: 8,
              minHeight: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
            <Route element={<Auth />} path="/" />
            <Route element={<Dashboard />} path="/dashboard" />

            <Route element={<VacancyPage />} path="/vacancy/list" />
            <Route element={<VacancyReport />} path="/vacancy/reports" />
            <Route element={<ApplicantList />} path="/vacancy/applicants/:id" />
            <Route element={<ApplicantDetail />} path="/vacancy/applicant/detail/:id" />

            <Route element={<InterviewPage />} path="/vacancy/interview" />
            <Route element={<InterviewVacancyPage />} path="/vacancy/interview/usedby" />

            <Route element={<OrganzationInfo />} path="/organzation/info" />
            <Route element={<BranchPage />} path="/organzation/branch" />
            <Route element={<DepartmentPage />} path="/organzation/department" />
            <Route element={<PostionPage />} path="/organzation/postion" />

            <Route element={<DocPage />} path="/doc/list" />
            <Route element={<DocReportPage />} path="/doc/report" />

            <Route element={<EmployeePage />} path="/employee/list" />
            <Route element={<EmployeeDetail />} path="/employee/detail/:id" />
            <Route element={<EmployeeReportPage />} path="/employee/report" />
            {/* <Route element={<AgreementPage />} path="/employee/agreement" /> */}
            <Route element={<DisciplinePage />} path="/discipline/list" />
            <Route element={<DisciplineDetail />} path="/discipline/detail/:id" />
            <Route element={<BlacklistPage />} path="/blacklist/list" />
            <Route element={<BlacklistDetail />} path="/blacklist/detail/:id" />

            <Route element={<ManageLeavePage />} path="/leave/leaves" />
            <Route element={<LeaveApplicationPage />} path="/leave/application" />
            <Route element={<LeaveReportPage />} path="/leave/report" />
            <Route element={<LeaveBalancePage />} path="/leave/balance" />

            <Route element={<AssetStore/>} path="/asset/store" />
            <Route element={<AssetBatchDetailPage/>} path="/asset/store/batch/:id" />
            <Route element={<AssetTransaction />} path="/asset/transaction" />
            <Route element={<AssetTransactionDetail />} path="/asset/transaction/detail/:id" />
            <Route element={<LeaveBalancePage />} path="/asset/maintenance" />
            <Route element={<SellingAssetPage />} path="/asset/selling" />
            <Route element={<AssetAnalytics />} path="/asset/analytics" />

            <Route element={<Users />} path="/users/list" />
            
            <Route element={<ReportPage />} path="/dailyreport/list" />
            <Route element={<ReportAnalyticsPage />} path="/dailyreport/analytics" />

            <Route element={<CompanyPage />} path="/project/company" />
            <Route element={<PlanPage />} path="/project/plan" />
            <Route element={<ProjectDetail />} path="/project/list/:id" />
            <Route element={<ProjectsPage />} path="/project/list" />
            <Route element={<TenderPage />} path="/project/tender" />

            <Route element={<TimeSheet />} path="/timesheet/list" />
            <Route element={<TimeSheetForm />} path="/timesheet/form" />

            <Route element={<PayrollReportPage />} path="/payroll/list/report" />
            <Route element={<GeneratePayroll />} path="/payroll/advance" />
            <Route element={<GeneratePayroll />} path="/payroll/generate" />
            <Route element={<GeneratePayrollDetail />} path="/payroll/generate/:id" />

            <Route element={<SalaryComponentsPage />} path="/payroll/salary/components" />
            <Route element={<SalaryStructurePage />} path="/payroll/salary/structure" />
            <Route element={<StructureAssignmentPage />} path="/payroll/salary/assignment" />
            
            <Route element={<PromotionPage />} path="/promotion" />
            <Route element={<SupportPage />} path="/support" />
            <Route element={<PageNotFound />} path="*" />

          </Routes>
          </div>
        </Content>
        <Footer
          style={{
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          
          {'SECURE HR TECH ERP'}
          ©
          {new Date ().getFullYear ()}
        </Footer>
      </Layout>
    </Layout>
    {/* } */}
    </div>
  );
};
export default App;
