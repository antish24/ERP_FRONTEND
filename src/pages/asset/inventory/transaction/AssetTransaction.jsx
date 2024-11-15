import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  DatePicker,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FaCircleCheck, FaFileCsv } from "react-icons/fa6";
import { MdFilterAltOff } from "react-icons/md";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import ModalForm from "../../../../modal/Modal";
import NewAssetTransaction from "../../../../components/forms/asset/Inventory/NewAssetTransaction";
import axios from "axios";
import { BACKENDURL } from "../../../../helper/Urls";
import { AlertContext } from "../../../../context/AlertContext";
import { FormatDateTime } from "../../../../helper/FormatDate";

const AssetTransaction = () => {
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
      title: "RefNo",
      dataIndex: "RefNo",
      ...getColumnSearchProps("RefNo"),
      width: "160px",
      fixed: "left",
      key: "RefNo",
    },
    {
      title: "Transaction Info",
      children: [
        {
          title: "Count",
          dataIndex: "items",
          width: "100px",
          key: "items",
          render:r=>r.length
        },
        {
          title: "Status",
          dataIndex: "status",
          width: "100px",
          render: (r) => <Tag color="success">{r}</Tag>,
          key: "status",
        },

        {
          title: "Created At",
          dataIndex: "createdAt",
          width: "100px",
          key: "createdAt",
          render: (r) => FormatDateTime(r),
        },
        {
          title: "Updated At",
          dataIndex: "updatedAt",
          width: "100px",
          render: (r) => FormatDateTime(r),
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
        <>
          <Tooltip title="View Detail">
            <Link to={`/asset/transaction/detail/${r.RefNo}`}>Detail</Link>
          </Tooltip>
          <Popconfirm
            title="Are you sure to approve Transaction"
            onConfirm={() => alert("done")}
          >
            <Tooltip title="Approve Payroll">
              <FaCircleCheck color="green" cursor="pointer" />
            </Tooltip>
          </Popconfirm>
        </>
      ),
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  const [TransactionData, setTransactionData] = useState([]);
  const [loadingTransactionData, setLoadingTransactionData] = useState(false);

  const getTransactionData = async () => {
    setLoadingTransactionData(true);
    try {
      const res = await axios.get(`${BACKENDURL}/inventory/tx/all`);
      setLoadingTransactionData(false);
      setTransactionData(res.data.tx);
    } catch (error) {
      openNotification("error", error.response.data, 3, "red");
      setLoadingTransactionData(false);
    }
  };

  useEffect(() => {
    getTransactionData();
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
                <NewAssetTransaction
                  reload={() =>getTransactionData()}
                  openModalFun={(e) => setModalOpen(e)}
                />
              );
              setModalTitle("New Transaction Form");
            }}
          >
            New Transaction
          </Button>
          <Button type="default" onClick={() => getTransactionData()} loading={loadingTransactionData}>
            Reload
          </Button>
          <ModalForm
            open={modalOpen}
            close={() => setModalOpen(false)}
            title={modalTitle}
            content={modalContent}
          />
        </div>

        <CSVLink data={[]} filename={"transaction-detail-csv"}>
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
        dataSource={TransactionData}
        onChange={() => {}}
        loading={loadingTransactionData}
      />
    </div>
  );
};
export default AssetTransaction;
