import { Button, DatePicker, Form, Input, Select } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKENDURL } from "../../../../helper/Urls";
import { AlertContext } from "../../../../context/AlertContext";

const NewAsset = ({ openModalFun, reload }) => {
  const { openNotification } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [categoryData, setcategoryData] = useState([]);
  const [categoryId, setcategoryId] = useState("");
  const [loadingCategory, setLoadingCategory] = useState(false);

  const getcategoryData = async () => {
    setLoadingCategory(true);
    try {
      const res = await axios.get(`${BACKENDURL}/inventory/category/all`);
      setLoadingCategory(false);
      setcategoryData(res.data.categorys);
    } catch (error) {
      openNotification("error", error.response.data.message, 3, "red");
      setLoadingCategory(false);
    }
  };

  const CategoryOptions = categoryData.length
    ? categoryData.map((Asset) => ({
        value: Asset.id,
        label: Asset.name,
      }))
    : [];

  useEffect(() => {
    getcategoryData();
  }, []);


  const [typeData, settypeData] = useState([]);
  const [typeId, settypeId] = useState("");
  const [loadingType, setLoadingType] = useState(false);

  const gettypeyData = async () => {
    setLoadingType(true);
    try {
      const res = await axios.get(`${BACKENDURL}/inventory/type/all`);
      setLoadingType(false);
      settypeData(res.data.types);
    } catch (error) {
      openNotification("error", error.response.data.message, 3, "red");
      setsetLoadingTypeLoadingCategory(false);
    }
  };

  const TypeOptions = typeData.length
    ? typeData.map((Asset) => ({
        value: Asset.id,
        label: Asset.name,
      }))
    : [];

  useEffect(() => {
    gettypeyData();
  }, []);

  const [unitData, setunitData] = useState([]);
  const [unitId, setunitId] = useState("");
  const [loadingUnit, setLoadingUnit] = useState(false);

  const getUnitData = async () => {
    setLoadingUnit(true);
    try {
      const res = await axios.get(`${BACKENDURL}/inventory/unit/all`);
      setLoadingUnit(false);
      setunitData(res.data.units);
    } catch (error) {
      openNotification("error", error.response.data.message, 3, "red");
      setLoadingUnit(false);
    }
  };

  const UnitOptions = unitData.length
    ? unitData.map((l) => ({
        value: l.id,
        label: l.name,
      }))
    : [];

  useEffect(() => {
    getUnitData();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKENDURL}/inventory/asset/new`, {
        name: values.name,
        typeId: values.typeId,
        unitId: values.unitId,
        catId: values.catId,
        reorderQuantity: values.reorderQuantity,
        maxLevel: values.maxLevel,
        minLevel: values.minLevel,
        description: values.description,
        quantity: values.quantity,
        itemsType: values.itemType,
        costPerUnit: values.costPerUnit,
        storageLocation: values.storageLocation,
        expirationDate: values.expirationDate,
        supplier: values.supplier,
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
          style={{ margin: "0", width: "49%" }}
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input Name",
            },
          ]}
          name="name"
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: "0", width: "49%" }}
          label="Unit"
          rules={[
            {
              required: true,
              message: "Please input Unit",
            },
          ]}
          name="unitId"
        >
          <Select
            placeholder="Search to Select"
            onChange={(e) => setunitId(e)}
            options={UnitOptions}
            loading={loadingUnit}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            disabled={loadingUnit}
          />
        </Form.Item>
        <Form.Item
          style={{ margin: "0", width: "100%" }}
          label="Type"
          rules={[
            {
              required: true,
              message: "Please input Type",
            },
          ]}
          name="typeId"
        >
          <Select
            placeholder="Search to Select"
            onChange={(e) => settypeId(e)}
            options={TypeOptions}
            loading={loadingType}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            disabled={loadingType}
          />
        </Form.Item>
        <Form.Item
          style={{ margin: "0", width: "70%" }}
          label="Catgeory"
          rules={[
            {
              required: true,
              message: "Please input Category",
            },
          ]}
          name="catId"
        >
          <Select
            placeholder="Search to Select"
            onChange={(e) => setcategoryId(e)}
            options={CategoryOptions}
            loading={loadingCategory}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            disabled={loadingCategory}
          />
        </Form.Item>

        <Form.Item
          style={{ margin: "0", width: "29%" }}
          label="Reorder Quantity"
          name="reorderQuantity"
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: "0", width: "49%" }}
          label="Min Level"
          rules={[
            {
              required: true,
              message: "Please input Min",
            },
          ]}
          name="minLevel"
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: "0", width: "49%" }}
          label="Max Level"
          name="maxLevel"
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          style={{ margin: "0", width: "100%" }}
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input Description",
            },
          ]}
          name="description"
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: "0", width: "20%" }}
          label="Quantity"
          rules={[
            {
              required: true,
              message: "Please input Quantity",
            },
          ]}
          name="quantity"
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ margin: "0", width: "29%" }}
          label="Cost Per Unit"
          rules={[
            {
              required: true,
              message: "Please input Cost Per Unit",
            },
          ]}
          name="costPerUnit"
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: "0", width: "49%" }}
          label="Expiration Date"
          rules={[
            {
              required: true,
              message: "Please input Expiration Date",
            },
          ]}
          name="expirationDate"
        >
          <DatePicker style={{width:'100%'}}/>
        </Form.Item>
        <Form.Item
          style={{ margin: "0", width: "45%" }}
          label="Storage Location"
          name="storageLocation"
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: "0", width: "54%" }}
          label="Supplier"
          name="supplier"
        >
          <Input />
        </Form.Item>
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
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewAsset;
