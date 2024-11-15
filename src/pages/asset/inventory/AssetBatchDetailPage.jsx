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
import { FaFileCsv } from "react-icons/fa6";
import { MdFilterAltOff } from "react-icons/md";
import { CSVLink } from "react-csv";
import { FormatDay } from "../../../helper/FormateDay";
import { Link, useParams } from "react-router-dom";
import NewAssetBatch from "../../../components/forms/asset/Inventory/NewAssetBatch";
import ModalForm from "../../../modal/Modal";
import { AlertContext } from "../../../context/AlertContext";
import axios from "axios";
import { BACKENDURL } from "../../../helper/Urls";

const AssetBatchDetailPage = () => {
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);
  const params = useParams();
  const { openNotification } = useContext(AlertContext);

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
      title: 'NO',
      key: 'NO',
      fixed: 'left',
      render:(_,__,index)=>index+1,
      width: '40px',
    },
    {
      title: "IDNO",
      dataIndex: "IDNO",
      ...getColumnSearchProps("IDNO"),
      width: "160px",
      fixed: "left",
      key: "IDNO",
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "50px",
      key: "type",
      render:r=><Tag color={r==='New'?'success':'warning'}>{r}</Tag>
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
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  const [assetData, setassetData] = useState([]);
  const [loadingAsset, setLoadingAsset] = useState(false);

  const getAssetData = async () => {
    setLoadingAsset(true);
    try {
      const res = await axios.get(`${BACKENDURL}/inventory/batch/items/list?IDNO=${params.id}`);
      setLoadingAsset(false);
      setassetData(res.data.batchItems);
    } catch (error) {
      openNotification("error", error.response.data, 3, "red");
      setLoadingAsset(false);
    }
  };

  useEffect(() => {
    getAssetData();
  }, []);

  return (
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
        <CSVLink data={[]} filename={"employee-detail-csv"}>
          <Button>
            <FaFileCsv />
            CSV
          </Button>
        </CSVLink>
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
        dataSource={assetData}
        onChange={() => {}}
        loading={loadingAsset}
      />
    </div>
  );
};
export default AssetBatchDetailPage;
