import React, {useContext, useRef, useState} from 'react';
import {
  Badge,
  Button,
  DatePicker,
  Divider,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import {CheckCircleFilled, SearchOutlined} from '@ant-design/icons';
import {MdDelete, MdEdit, MdFilterAltOff} from 'react-icons/md';
import {AlertContext} from '../../../context/AlertContext';
import {BACKENDURL} from '../../../helper/Urls';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import {FaCircleCheck, FaFileCsv, FaFileExcel} from 'react-icons/fa6';
import {TbReload} from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { FormatDay } from '../../../helper/FormateDay';
import { FormatDateTime } from '../../../helper/FormatDate';

const GeneratePayrollTable = ({payrollData, loading, reload}) => {
  const {openNotification} = useContext (AlertContext);
  const [searchedColumn, setSearchedColumn] = useState ('');
  const [searchText, setSearchText] = useState ('');
  const searchInput = useRef (null);
  const [modalOpen, setModalOpen] = useState (false);
  const [modalContent, setModalContent] = useState ([]);
  const [deleteLoading, setDeleteLoading] = useState (false);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm ();
    setSearchText (selectedKeys[0]);
    setSearchedColumn (dataIndex);
  };
  const handleReset = clearFilters => {
    clearFilters ();
    setSearchText ('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={e => e.stopPropagation ()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys (e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch (selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch (selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset (clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString ()
        .toLowerCase ()
        .includes (value.toLowerCase ()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        searchText
      ) : (
        text
      ),
  });

  const [filteredInfo, setFilteredInfo] = useState ({});
  const [sortedInfo, setSortedInfo] = useState ({});

  const handleChange = (pagination, filters, sorter) => {
    console.log ('Various parameters', pagination, filters, sorter);
    setFilteredInfo (filters);
    setSortedInfo (sorter);
  };

  const clearAll = () => {
    setFilteredInfo ({});
    setSortedInfo ({});
  };

  const cities = [
    {
      name: 'Addis Ababa',
      subCities: [
        {
          name: 'Kirkos',
          weredas: ['Wereda 1', 'Wereda 2'],
        },
        {
          name: 'Lideta',
          weredas: ['Wereda 3', 'Wereda 4'],
        },
        {
          name: 'Bole',
          weredas: ['Wereda 5', 'Wereda 6'],
        },
      ],
    },
    {
      name: 'Gonder',
      subCities: [
        {
          name: 'Aynalem',
          weredas: ['Wereda 7', 'Wereda 8'],
        },
        {
          name: 'Agena',
          weredas: ['Wereda 9', 'Wereda 10'],
        },
        {
          name: 'Gore',
          weredas: ['Wereda 11', 'Wereda 12'],
        },
      ],
    },
    {
      name: 'Sidama',
      subCities: [
        {
          name: 'Hawassa',
          weredas: ['Wereda 13', 'Wereda 14'],
        },
        {
          name: 'Bensa',
          weredas: ['Wereda 15', 'Wereda 16'],
        },
      ],
    },
  ];

  const columns = [
    {
      title: 'Based On',
      dataIndex: 'basedOn',
      key: 'basedOn',
      width: '200px',
    },
    {
      title: 'Project',
      dataIndex: 'project',
      ...getColumnSearchProps ('project'),
      key: 'project',
      render:r=>r?r.site:'null',
      width: '200px',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render:r=><span>{FormatDay(r)}</span>
    },
    {
      title: 'to',
      dataIndex: 'to',
      key: 'to',
      render:r=><span>{FormatDay(r)}</span>
    },
    {
      title: 'Generated By',
      dataIndex: 'generatedBy',
      key: 'generatedBy',
    },
    {
      title: 'Generated Date',
      dataIndex: 'createdAt',
      width:'180px',
      render:r=><span>{FormatDateTime(r)}</span>,
      key: 'createdAt',
    },
    {
      title: 'Approved By',
      dataIndex: 'approvedBy',
      key: 'approvedBy',
    },
    {
      fixed: 'right',
      title: 'Status',
      width: '80px',
      key: 'status',
      render: r => (
        <Tag color={r.status === 'Pending' ? 'orange' : 'Green'}>
          {r.status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      width: '165px',
      fixed: 'right',
      key: 'operation',
      render: r =><Space style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'20px'}}>
        <Link to={`/payroll/generate/${r.id}`}>Detail</Link>
        <Popconfirm
            title="Are you sure to approve generated payroll"
            onConfirm={()=>alert('done')}
          >
            <Tooltip title='Approve Payroll'><FaCircleCheck color='green' cursor='pointer'/></Tooltip>
          </Popconfirm>
          <Popconfirm
            title="Are you sure to generate payroll again"
            onConfirm={()=>alert('done')}
          >
            <Tooltip title='Generate Payroll Again'><TbReload cursor='pointer'/></Tooltip>
          </Popconfirm>
          <Popconfirm
            title="Are you sure to delete"
            onConfirm={()=>alert('done')}
          >
            <Tooltip title='Delete Payroll'><MdDelete color='red' cursor='pointer' /></Tooltip>
          </Popconfirm>
      </Space>,
    },
  ];

  return (
      <Table
        size="small"
        columns={columns}
        bordered
        scroll={{
          x: 500,
        }}
        pagination={{
          defaultPageSize: 10,
          position: 'topRight',
          showSizeChanger: false,
        }}
        dataSource={payrollData}
        loading={loading}
        onChange={handleChange}
      />
  );
};
export default GeneratePayrollTable;
