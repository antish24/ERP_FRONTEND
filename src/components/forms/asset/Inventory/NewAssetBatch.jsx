import { Button, DatePicker, Form, Input, Select } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKENDURL } from "../../../../helper/Urls";
import { AlertContext } from "../../../../context/AlertContext";

const NewAssetBatch = ({ openModalFun, reload }) => {
  const { openNotification } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

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
    getAssetData();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKENDURL}/inventory/batch/new`, {
        assetId: values.assetId,
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
          style={{ margin: "0", width: "100%" }}
          label="Asset"
          rules={[
            {
              required: true,
              message: "Please input Asset",
            },
          ]}
          name="assetId"
        >
          <Select
            placeholder="Search to Select"
            onChange={(e) => setAssetId(e)}
            options={AssetOptions}
            loading={loadingAsset}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            disabled={loadingAsset}
          />
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
          style={{ margin: "0", width: "50%" }}
          label="Items Type"
          rules={[
            {
              required: true,
              message: "Please input Type",
            },
          ]}
          name="itemType"
        >
          <Select
            placeholder="Search to Select"
            options={[
              {
                value: "New",
                label: "New",
              },
              {
                value: "Used",
                label: "Used",
              },
            ]}
          />
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
          style={{ margin: "0", width: "49%" }}
          label="Storage Location"
          name="storageLocation"
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ margin: "0", width: "100%" }}
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
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewAssetBatch;
