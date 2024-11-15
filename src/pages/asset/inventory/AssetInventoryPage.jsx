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
import axios from "axios";
import { BACKENDURL } from "../../../helper/Urls";
import { AlertContext } from "../../../context/AlertContext";

const AssetInventoryPage = () => {
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);
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
      title: "IDNO",
      dataIndex: "IDNO",
      ...getColumnSearchProps("IDNO"),
      width: "160px",
      fixed: "left",
      key: "IDNO",
    },
    {
      title: "Asset Info",
      children: [
        {
          title: "Name",
          width: "100px",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Category",
          dataIndex: "category",
          width: "100px",
          // render: (r) => <Tooltip title={r.IDNO}>{r.name}</Tooltip>,
          key: "category",
        },
        {
          title: "Type",
          dataIndex: "type",
          width: "100px",
          key: "type",
          // render: (r) => <Tag color="success">{r.name}</Tag>,
        },
        {
          title: "Unit",
          dataIndex: "unit",
          // render: (r) => <Tag color="success">{r.name}</Tag>,
          width: "100px",
          key: "unit",
        },
        {
          title: "Min Level",
          dataIndex: "minLevel",
          width: "100px",
          key: "minLevel",
        },
        {
          title: "Max Level",
          dataIndex: "maxLevel",
          width: "100px",
          render: (r) => (r ? r : "--"),
          key: "maxLevel",
        },
        {
          title: "Reorder Quantity",
          dataIndex: "reorderQuantity",
          width: "100px",
          key: "reorderQuantity",
        },
        {
          title: "Description",
          dataIndex: "description",
          width: "100px",
          key: "description",
        },
        {
          title: "Batch Count",
          dataIndex: "itemsBatch",
          // render: (r) => r.length,
          width: "100px",
          key: "batchCount",
        },
        {
          title: "Registed",
          dataIndex: "createdAt",
          width: "100px",
          key: "createdAt",
          // render: (r) => FormatDay(r),
        },
        {
          title: "Updated At",
          dataIndex: "updatedAt",
          width: "100px",
          // render: (r) => FormatDay(r),
          key: "updatedAt",
        },
      ],
    },
    {
      title: "Total Quantity",
      dataIndex: "totalQuantity",
      width: "100px",
    },
    {
      title: "Average Cost Per Unit",
      dataIndex: "averageCostPerUnit",
      width: "100px",
      render:r=>r.toFixed(2)
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      width: "100px",
    },
  ];

  const [inventoryData, setinventoryData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const ReloadInventoryData = async () => {
    setLoadingData(true);
    try {
      const res = await axios.get(`${BACKENDURL}/inventory/detail/generate`);
      setLoadingData(false);
      setinventoryData(res.data.inventoryData);
    } catch (error) {
      openNotification("error", error.response.data.message, 3, "red");
      setLoadingData(false);
    }
  };

  useEffect(() => {
    ReloadInventoryData();
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
        <Button onClick={() => ReloadInventoryData()} loading={loadingData}>Reload</Button>
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
        dataSource={inventoryData}
        onChange={() => {}}
        loading={loadingData}
      />
    </div>
  );
};
export default AssetInventoryPage;
