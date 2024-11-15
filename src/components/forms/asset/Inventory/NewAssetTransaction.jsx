import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKENDURL } from "../../../../helper/Urls";
import { AlertContext } from "../../../../context/AlertContext";
import { FormatDateTime } from "../../../../helper/FormatDate";

const NewAssetTransaction = ({ openModalFun, reload }) => {
  const { openNotification } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [branchData, setBranchData] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [loadingBranch, setLoadingBranch] = useState(false);

  const [departmentData, setDepartmentData] = useState([]);
  const [departmentId, setDepartmentId] = useState();
  const [loadingDepartment, setLoadingDepartment] = useState(false);

  const [positionData, setPositionData] = useState([]);
  const [positionId, setPositionId] = useState();
  const [loadingPosition, setLoadingPosition] = useState(false);

  const [employeeData, setEmployeeData] = useState([]);
  const [loadingEmployee, setLoadingEmployee] = useState(false);

  const [BatchData, setBatchData] = useState([]);
  const [loadingBatch, setLoadingBatch] = useState(false);

  const getBranchData = async () => {
    setLoadingBranch(true);
    try {
      const res = await axios.get(`${BACKENDURL}/organzation/branch/all`);
      setLoadingBranch(false);
      setBranchData(res.data.branchs);
    } catch (error) {
      openNotification("error", error.response.data.message, 3, "red");
      setLoadingBranch(false);
    }
  };

  const branchOptions = branchData
    ? branchData.map((branch) => ({
        value: branch.id,
        label: branch.name,
      }))
    : [];

  const [AssetData, setAssetData] = useState([]);
  const [AssetId, setAssetId] = useState("");
  const [loadingAsset, setLoadingAsset] = useState(false);

  const getAssetData = async () => {
    setLoadingAsset(true);
    try {
      const res = await axios.get(`${BACKENDURL}/inventory/asset/all`);
      setLoadingAsset(false);
      setAssetData(res.data.assets);
    } catch (error) {
      openNotification("error", error.response.data.message, 3, "red");
      setLoadingAsset(false);
    }
  };

  const AssetOptions = AssetData.length
    ? AssetData.map((Asset) => ({
        value: Asset.id,
        label: Asset.name,
      }))
    : [];

  useEffect(() => {
    getBranchData();
    getAssetData();
  }, []);

  const getBatchData = async () => {
    setLoadingBatch(true);
    try {
      const res = await axios.get(
        `${BACKENDURL}/inventory/batch/list?id=${AssetId}`
      );
      setLoadingBatch(false);
      setBatchData(res.data.batchs);
    } catch (error) {
      openNotification("error", error.response.data.message, 3, "red");
      setLoadingBatch(false);
    }
  };

  useEffect(() => {
    getBatchData();
  }, [AssetId]);

  const BatchOptions = BatchData
    ? BatchData.map((branch) => ({
        value: branch.id,
        label: branch.IDNO +" , L:"+ branch.stockLevel + " , Br:"+branch.costPerUnit +" , E:"+ FormatDateTime(branch.expirationDate),
      }))
    : [];

  const getEmployeeData = async (id) => {
    setLoadingEmployee(true);
    try {
      const res = await axios.get(`${BACKENDURL}/employee/find?position=${id}`);
      setLoadingEmployee(false);
      setEmployeeData(res.data.employees);
    } catch (error) {
      openNotification("error", error.response.data.message, 3, "red");
      setLoadingEmployee(false);
    }
  };

  const EmployeeOptions = employeeData
    ? employeeData.map((branch) => ({
        value: branch.id,
        label: branch.IDNO + " " + branch.fName + " " + branch.mName,
      }))
    : [];

  useEffect(() => {
    getEmployeeData(positionId);
  }, [positionId]);

  const getDepartmentData = async (id) => {
    setLoadingDepartment(true);
    form.resetFields(["department", "employee"]);
    try {
      const res = await axios.get(
        `${BACKENDURL}/organzation/department/find?branchId=${id}`
      );
      setLoadingDepartment(false);
      setDepartmentData(res.data.departments);
    } catch (error) {
      openNotification("error", error.response.data.message, 3, "red");
      setLoadingDepartment(false);
    }
  };

  const departmentOptions = departmentData
    ? departmentData.map((department) => ({
        value: department.id,
        label: department.name,
      }))
    : [];

  useEffect(() => {
    getDepartmentData(branchId);
  }, [branchId]);

  const getPositionData = async (id) => {
    setLoadingPosition(true);
    form.resetFields(["position", "employee"]);
    try {
      const res = await axios.get(
        `${BACKENDURL}/organzation/position/find?departmentId=${id}`
      );
      setLoadingPosition(false);
      setPositionData(res.data.positions);
    } catch (error) {
      openNotification("error", error.response.data.message, 3, "red");
      setLoadingPosition(false);
    }
  };

  const positionOptions = positionData
    ? positionData.map((department) => ({
        value: department.id,
        label: department.name,
      }))
    : [];

  useEffect(() => {
    getPositionData(departmentId);
  }, [departmentId]);


  const [items, setitems] = useState([
    {
      item: "",
      quantity: "",
      type: "",
    },
  ]);

  const handleAdd = () => {
    setitems([
      ...items,
      {
        item: "",
        quantity: "",
        type: "",
      },
    ]);
  };

  const handleRemove = (index) => {
    setitems(items.filter((_, i) => i !== index));
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKENDURL}/inventory/tx/new`, {
        employees: values.employees,
        items: items,
      });
      reload();
      setLoading(false);
      openModalFun(false);
      openNotification("success", res.data.message, 3, "green");
      form.resetFields();
    } catch (error) {
      setLoading(false);
      openNotification("error", error.response.data.message, 3, "red");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };



  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      onFinishFailed={onFinishFailed}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Form.Item
          style={{ margin: "0", width: "30%" }}
          label="Branch"
          name="branch"
          rules={[
            {
              required: true,
              message: "Please input Branch",
            },
          ]}
        >
          <Select
            placeholder="Search to Select"
            onChange={(e) => setBranchId(e)}
            options={branchOptions}
            loading={loadingBranch}
            disabled={loadingBranch}
          />
        </Form.Item>
        <Form.Item
          style={{ margin: "0", width: "30%" }}
          label="Department"
          name="department"
          rules={[
            {
              required: true,
              message: "Please input Department",
            },
          ]}
        >
          <Select
            placeholder="Search to Select"
            onChange={(e) => setDepartmentId(e)}
            options={departmentOptions}
            loading={loadingDepartment}
            disabled={loadingDepartment}
          />
        </Form.Item>

        <Form.Item
          style={{ margin: "0", width: "39%" }}
          label="Position"
          name="position"
          rules={[
            {
              required: true,
              message: "Please input Department",
            },
          ]}
        >
          <Select
            placeholder="Search to Select"
            onChange={(e) => setPositionId(e)}
            options={positionOptions}
            loading={loadingPosition}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            disabled={loadingPosition}
          />
        </Form.Item>

        <Form.Item
          style={{ margin: "5px", width: "100%" }}
          label="Employee"
          name="employees"
          rules={[
            {
              required: true,
              message: "Please input Department",
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Search to Select"
            maxTagCount="responsive"
            options={EmployeeOptions}
            loading={loadingEmployee}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            disabled={loadingEmployee}
          />
        </Form.Item>

        {items.map((itemss, index) => (

          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              width: "100%",
              borderBottom: "1px solid gray",
              padding: "5px 0",
            }}
          >
            <Form.Item
          style={{ margin: "0", width: "55%" }}
          label="Asset"
          name={`asset ${index+1}`}
          rules={[
            {
              required: true,
              message: "Please input Asset",
            },
          ]}
        >
          <Select
            placeholder="Search to Select"
            options={AssetOptions}
            onChange={(e) => setAssetId(e)}
            loading={loadingAsset}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            disabled={loadingAsset}
          />
        </Form.Item>
           

            <Form.Item style={{ margin: "0", width: "12%" }} label="Quantity">
              <Input
                placeholder="1"
                type="number"
                min={1}
                value={itemss.quantity}
                onChange={(e) => {
                  const value = e.target.value;
                  setitems((prev) => {
                    const updateditems = [...prev];
                    updateditems[index].quantity = value;
                    return updateditems;
                  });
                }}
              />
            </Form.Item>

            <Form.Item
              style={{ margin: "0", width: "30%" }}
              label="Type"
              name={`type${index + 1} `}
            >
              <Select
                placeholder="Search to Select"
                options={[
                  {
                    value: "UsedInPreparation",
                    label: "UsedInPreparation",
                  },
                  {
                    value: "Return",
                    label: "Return",
                  },
                  {
                    value: "ReservedForEvent",
                    label: "ReservedForEvent",
                  },
                ]}
                onChange={(e) => {
                  const value = e;
                  setitems((prev) => {
                    const updateditems = [...prev];
                    updateditems[index].type = value;
                    return updateditems;
                  });
                }}
                showSearch
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
                disabled={loadingBatch}
              />
            </Form.Item>

            <Form.Item
              style={{ margin: "0", width: "100%" }}
              label={`Items ${index + 1} `}
              name={`Item${index + 1} `}
              rules={[
                {
                  required: true,
                  message: "Please input Items",
                },
              ]}
            >
              <Select
                placeholder="Search to Select"
                options={BatchOptions}
                loading={loadingBatch}
                onChange={(e) => {
                  const value = e;
                  setitems((prev) => {
                    const updateditems = [...prev];
                    updateditems[index].item = value;
                    return updateditems;
                  });
                }}
                showSearch
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
                disabled={loadingBatch}
              />
            </Form.Item>

            {index > 0 && (
              <Button
                style={{ marginTop: "5px" }}
                onClick={() => handleRemove(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button style={{ margin: "10px 0" }} type="primary" onClick={handleAdd}>
          Add items
        </Button>
      </div>
      <Form.Item
        style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewAssetTransaction;
