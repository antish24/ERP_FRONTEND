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
import { Link } from "react-router-dom";
import ModalForm from "../../../modal/Modal";
import NewAsset from "../../../components/forms/asset/Inventory/NewAsset";
import axios from "axios";
import { BACKENDURL } from "../../../helper/Urls";
import { AlertContext } from "../../../context/AlertContext";
import { FormatDay } from "../../../helper/FormateDay";

const AssetStorePage = () => {
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
          render: (r) =><Tooltip title={r.IDNO}>{r.name}</Tooltip>,
          key: "category",
        },
        {
          title: "Type",
          dataIndex: "type",
          width: "100px",
          key: "type",
          render: (r) => <Tag color="success">{r.name}</Tag>,
        },
        {
          title: "Unit",
          dataIndex: "unit",
          render: (r) => <Tag color="success">{r.name}</Tag>,
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
          render: (r) => r?r:'--',
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
          render: (r) => r.length,
          width: "100px",
          key: "batchCount",
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
      ],
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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  const [assetData, setassetData] = useState([]);
  const [loadingAsset, setLoadingAsset] = useState(false);

  const getAssetData = async () => {
    setLoadingAsset(true);
    try {
      const res = await axios.get(`${BACKENDURL}/inventory/asset/all`);
      setLoadingAsset(false);
      setassetData(res.data.assets);
    } catch (error) {
      openNotification("error", error.response.data.message, 3, "red");
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
                <NewAsset
                  reload={() =>getAssetData()}
                  openModalFun={(e) => setModalOpen(e)}
                />
              );
              setModalTitle("Buy Asset Form");
            }}
          >
            Buy New Asset
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
export default AssetStorePage;
