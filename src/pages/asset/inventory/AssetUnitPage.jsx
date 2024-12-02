import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  DatePicker,
  Input,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MdFilterAltOff } from "react-icons/md";
import { FormatDay } from "../../../helper/FormateDay";
import { Link } from "react-router-dom";
import ModalForm from "../../../modal/Modal";
import NewAssetUnit from "../../../components/forms/asset/Inventory/NewAssetUnit";
import { AlertContext } from "../../../context/AlertContext";
import axios from "axios";
import { BACKENDURL } from "../../../helper/Urls";

const AssetUnitPage = ({}) => {
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const {openNotification} = useContext(AlertContext);
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
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
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
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
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => (searchedColumn === dataIndex ? text : text),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      width: "160px",
      fixed: "left",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "100px",
      key: "description",
    },
    {
      title: "Registed",
      dataIndex: "createdAt",
      width: "100px",
      key: "createdAt",
      render: (r) => FormatDay(r),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      width: "100px",
      render: (r) => FormatDay(r),
      key: "updatedAt",
    },
    {
      title: "Action",
      width: "70px",
      fixed: "right",
      key: "operation",
      render: (r) => (
        <Tooltip title="View Detail">
          <Link to={`/employee/detail/${r.IDNO}`}>Detail</Link>
        </Tooltip>
      ),
    },
  ];

  const [unitData,setUnitData]=useState([])
  const [loadingUnit,setLoadingUnit]=useState(false)

  const [typeData,setTypeData]=useState([])
  const [loadingType,setLoadingType]=useState(false)

  const getUnitData=async()=>{
    setLoadingUnit(true)
    try {
      const res = await axios.get(`${BACKENDURL}/inventory/unit/all`);
      setLoadingUnit (false);
      setUnitData(res.data.units)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoadingUnit (false);
    }
  }

  const getTypeData=async()=>{
    setLoadingType(true)
    try {
      const res = await axios.get(`${BACKENDURL}/inventory/type/all`);
      setLoadingType (false);
      setTypeData(res.data.types)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoadingType (false);
    }
  }

  useEffect(()=>{
    getUnitData()
    getTypeData()
  },[])

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  return (
    <div>
      <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "5px",
          marginBottom: "5px",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ height: "50px", display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            onClick={() => {
              setModalOpen(true);
              setModalContent(
                <NewAssetUnit
                  reload={() =>getUnitData()}
                  routeLink={'unit'}
                  openModalFun={(e) => setModalOpen(e)}
                />
              );
              setModalTitle("New Asset Unit Form");
            }}
          >
            Add Asset Measurment Unit
          </Button>
          <Button type="default" onClick={() =>getUnitData()} loading={loadingUnit}>
            Reload
          </Button>
          <ModalForm
            open={modalOpen}
            close={() => setModalOpen(false)}
            title={modalTitle}
            content={modalContent}
          />
        </div>

        <Button onClick={() => {}}>
          <MdFilterAltOff /> Clear filters
        </Button>
      </div>
      <Table
        size="small"
        columns={columns}
        bordered
        scroll={{
          x: 500,
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
        dataSource={unitData}
        onChange={() => {}}
        loading={loadingUnit}
      />
    </div>

    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "5px",
          marginBottom: "5px",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ height: "50px", display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            onClick={() => {
              setModalOpen(true);
              setModalContent(
                <NewAssetUnit
                routeLink={'type'}
                  reload={() =>getTypeData()}
                  openModalFun={(e) => setModalOpen(e)}
                />
              );
              setModalTitle("New Asset Type Form");
            }}
          >
            Add Asset Type
          </Button>
          <Button type="default" onClick={() =>getTypeData()} loading={loadingType}>
            Reload
          </Button>
          <ModalForm
            open={modalOpen}
            close={() => setModalOpen(false)}
            title={modalTitle}
            content={modalContent}
          />
        </div>

        <Button onClick={() => {}}>
          <MdFilterAltOff /> Clear filters
        </Button>
      </div>
      <Table
        size="small"
        columns={columns}
        bordered
        scroll={{
          x: 500,
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
        dataSource={typeData}
        onChange={() => {}}
        loading={loadingType}
      />
    </div>
    </div>
  );
};
export default AssetUnitPage;
