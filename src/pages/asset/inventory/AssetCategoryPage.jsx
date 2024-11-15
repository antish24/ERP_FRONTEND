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
import ModalForm from "../../../modal/Modal";
import NewAssetCategory from "../../../components/forms/asset/Inventory/NewAssetCategory";
import axios from "axios";
import { BACKENDURL } from "../../../helper/Urls";
import { AlertContext } from "../../../context/AlertContext";
import { FaEdit } from "react-icons/fa";

const AssetCategoryPage = () => {
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);
  const {openNotification} = useContext(AlertContext);

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
      title: "Category ID",
      dataIndex: "IDNO",
      ...getColumnSearchProps("IDNO"),
      width: "100px",
      fixed: "left",
      key: "IDNO",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "100px",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "100px",
      key: "description",
    },
    {
      title: "Items Count",
      dataIndex: "items",
      width: "100px",
      render: (r) =>r.length,
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
        <Tooltip title="Edit Detail">
          <FaEdit/>
        </Tooltip>
      ),
    },
  ];


  const [categoryData,setCategoryData]=useState([])
  const [loadingCat,setLoadingCat]=useState(false)

  const getCategoryData=async()=>{
    setLoadingCat(true)
    try {
      const res = await axios.get(`${BACKENDURL}/inventory/category/all`);
      setLoadingCat (false);
      setCategoryData(res.data.categorys)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoadingCat (false);
    }
  }

  useEffect(()=>{
    getCategoryData()
  },[])

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

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
                <NewAssetCategory
                  reload={() =>getCategoryData()}
                  openModalFun={(e) => setModalOpen(e)}
                />
              );
              setModalTitle("New Asset Category Form");
            }}
          >
            Add Category
          </Button>
          <Button type="default" onClick={() => getCategoryData()} loading={loadingCat}>
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
        dataSource={categoryData}
        onChange={() => {}}
        loading={loadingCat}
      />
    </div>
  );
};
export default AssetCategoryPage;
