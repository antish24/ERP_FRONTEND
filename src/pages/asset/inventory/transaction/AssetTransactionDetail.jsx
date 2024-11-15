import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Input, Space, Table, Tag, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MdCancel, MdCheck } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import ModalForm from "../../../../modal/Modal";
import { FormatDay } from "../../../../helper/FormateDay";
import axios from "axios";
import { BACKENDURL } from "../../../../helper/Urls";
import { AlertContext } from "../../../../context/AlertContext";

const AssetTransactionDetail = () => {
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
      title: '#NO',
      key: 'NO',
      fixed: 'left',
      render:(_,__,index)=>index+1,
      width: '50px',
    },
    {
      title: "IDNO",
      dataIndex: "IDNO",
      ...getColumnSearchProps("IDNO"),
      fixed: "left",
      width: "140px",
      render: (value, row) => ({
        children: <Link to={`/employee/detail/${value}`}>{value}</Link>,
        props: {
          rowSpan: row.rowSpan || 0, // Set rowSpan based on processed data
        },
      }),
    },
    {
      title: "Employee Info",
      children: [
        {
          title: "Employee",
          ...getColumnSearchProps("fullName"),
          width: "200px",
          dataIndex: "fullName",
          render: (value, row) => ({
            children: value,
            props: {
              rowSpan: row.rowSpan || 0, // Set rowSpan based on processed data
            },
          }),
        },
      ],
    },
    {
      title: "Asset Info",
      children: [
        {
          title: "Name",
          width: "120px",
          key: "assetName",
          render: (r) => (
            <Tooltip title={() => r.assetIDNO}>{r.assetName}</Tooltip>
          ),
        },
        {
          title: "Category",
          width: "120px",
          render: (r) => (
            <Tooltip title={() => r.assetCategoryIDNO}>
              {r.assetCategory}
            </Tooltip>
          ),
        },
        {
          title: "Type",
          width: "200px",
          key: "assetName",
          render: (r) => (
            <Tooltip title={() => r.assetType}>{r.assetType}</Tooltip>
          ),
        },
        {
          title: "Unit",
          width: "120px",
          render: (r) => (
            <Tooltip title={() => r.assetUnit}>{r.assetUnit}</Tooltip>
          ),
        },
        {
          title: "Batch",
          width: "120px",
          key: "batchId",
          render: (r) => (
            <Tooltip title={() => r.batchIDNO}>{r.batchIDNO}</Tooltip>
          ),
        },
      ],
    },
    {
      title: "Transaction Info",
      children: [
        {
          title: "Quantity",
          dataIndex: "quantity",
          width: "100px",
          key: "quantity",
        },
        {
          title: "Type",
          dataIndex: "type",
          width: "200px",
          key: "type",
        },
        {
          title: "Created At",
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
      title: "Status",
      dataIndex: "status",
      width: "100px",
      render: (r) => <Tag color="success">{r}</Tag>,
      fixed: "right",
      key: "status",
    },
    {
      title: "Action",
      width: "200px",
      fixed: "right",
      key: "operation",
      render: (r) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Tooltip title="Approve Payroll">
            <MdCheck color="green" cursor="pointer" />
          </Tooltip>
          <Tooltip title="Cancel Payroll">
            <MdCancel color="red" cursor="pointer" />
          </Tooltip>
        </div>
      ),
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const params = useParams();

  const [TransactionData, setTransactionData] = useState([]);
  const [loadingTransactionData, setLoadingTransactionData] = useState(false);

  const getTransactionData = async () => {
    setLoadingTransactionData(true);
    try {
      const res = await axios.get(
        `${BACKENDURL}/inventory/tx/detail?id=${params.id}`
      );
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
export default AssetTransactionDetail;
