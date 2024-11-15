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
import { Link } from "react-router-dom";
import NewAssetBatch from "../../../components/forms/asset/Inventory/NewAssetBatch";
import ModalForm from "../../../modal/Modal";
import { AlertContext } from "../../../context/AlertContext";
import axios from "axios";
import { BACKENDURL } from "../../../helper/Urls";

const AssetBatchPage = () => {
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
      title: "BatchIDNO",
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
          dataIndex: "assetItem",
          width: "120px",
          render: (r) => <Tooltip title={() => r.name}>{r.IDNO}</Tooltip>,
        },
        {
          title: "Category",
          dataIndex: "assetItem",
          width: "100px",
          key: "category",
          render: (r) => <Tooltip title={() => r.category.name}>{r.category.IDNO}</Tooltip>,
        },
        {
          title: "Type",
          dataIndex: "assetItem",
          width: "100px",
          key: "type",
          render: (r) => <Tooltip title={() => r.type.description}>{r.type.name}</Tooltip>,
        },
        {
          title: "Unit",
          dataIndex: "assetItem",
          width: "100px",
          key: "unit",
          render: (r) => <Tooltip title={() => r.unit.description}>{r.unit.name}</Tooltip>,
        },
      ],
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "100px",
      key: "quantity",
    },
    {
      title: "Stock Level",
      dataIndex: "stockLevel",
      width: "100px",
      key: "stockLevel",
    },
    {
      title: "Cost Per Unit",
      dataIndex: "costPerUnit",
      width: "100px",
      key: "costPerUnit",
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      width: "100px",
      key: "totalCost",
    },
    {
      title: "Expiration Date",
      dataIndex: "expirationDate",
      width: "200px",
      render: (r) => FormatDay(r),
      key: "expirationDate",
    },
    {
      title: "Storage Location",
      dataIndex: "storageLocation",
      width: "200px",
      key: "storageLocation",
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      width: "100px",
      key: "supplier",
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
      fixed: "right",
      title: "Status",
      width: "80px",
      key: "status",
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "InActive",
          value: "InActive",
        },
      ],
      render: (r) => (
        <Badge
          status={r.status === "InStock" ? "success" : "warning"}
          text={r.status}
        />
      ),
    },
    {
      title: "Action",
      width: "70px",
      fixed: "right",
      key: "operation",
      render: (r) => (
        <Tooltip title="View Detail">
          <Link to={`/asset/store/batch/${r.IDNO}`}>Detail</Link>
        </Tooltip>
      ),
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
      const res = await axios.get(`${BACKENDURL}/inventory/batch/all`);
      setLoadingAsset(false);
      setassetData(res.data.batchs);
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
        <div style={{ height: "50px", display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            onClick={() => {
              setModalOpen(true);
              setModalContent(
                <NewAssetBatch
                  reload={() => getAssetData()}
                  openModalFun={(e) => setModalOpen(e)}
                />
              );
              setModalTitle("New Asset Category Form");
            }}
          >
            Add New Batch
          </Button>
          <Button type="default" onClick={() => getAssetData()} loading={loadingAsset}>
            Reload
          </Button>
          <ModalForm
            open={modalOpen}
            close={() => setModalOpen(false)}
            title={modalTitle}
            content={modalContent}
          />
        </div>
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
export default AssetBatchPage;
