import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKENDURL } from "../../../../helper/Urls";
import { AlertContext } from "../../../../context/AlertContext";
import { FormatDateTime } from "../../../../helper/FormatDate";

const SellAsset = ({ openModalFun, reload }) => {
  const { openNotification } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [BuyerData, setBuyerData] = useState([]);
  const [BuyerId, setBuyerId] = useState("");
  const [loadingBuyer, setLoadingBuyer] = useState(false);

  const [BatchData, setBatchData] = useState([]);
  const [loadingBatch, setLoadingBatch] = useState(false);

  const getBuyerData = async () => {
    setLoadingBuyer(true);
    try {
      const res = await axios.get(`${BACKENDURL}/organzation/branch/all`);
      setLoadingBuyer(false);
      setBuyerData(res.data.branchs);
    } catch (error) {
      openNotification("error", error.response.data.message, 3, "red");
      setLoadingBuyer(false);
    }
  };

  const BuyerOptions = BuyerData
    ? BuyerData.map((Buyer) => ({
        value: Buyer.id,
        label: Buyer.name,
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
    getBuyerData();
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
    ? BatchData.map((Buyer) => ({
        value: Buyer.id,
        label: Buyer.IDNO +" , L:"+ Buyer.stockLevel + " , Br:"+Buyer.costPerUnit +" , E:"+ FormatDateTime(Buyer.expirationDate),
      }))
    : [];

  const [items, setitems] = useState([
    {
      item: "",
      quantity: "",
      price: "",
    },
  ]);

  const handleAdd = () => {
    setitems([
      ...items,
      {
        item: "",
        quantity: "",
        price: "",
      },
    ]);
  };

  const handleRemove = (index) => {
    setitems(items.filter((_, i) => i !== index));
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKENDURL}/inventory/manage/sell`, {
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
          style={{ margin: "0", width: "100%" }}
          label="Buyer"
          name="buyer"
          rules={[
            {
              required: true,
              message: "Please input Buyer",
            },
          ]}
        >
          <Select
            placeholder="Search to Select"
            onChange={(e) => setBuyerId(e)}
            options={BuyerOptions}
            loading={loadingBuyer}
            disabled={loadingBuyer}
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
              label="Selling Price"
              name={`sellingPrice${index + 1} `}
            >
              <Input
                placeholder="1"
                type="number"
                min={1}
                value={itemss.price}
                onChange={(e) => {
                  const value = e.target.value;
                  setitems((prev) => {
                    const updateditems = [...prev];
                    updateditems[index].price = value;
                    return updateditems;
                  });
                }}
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

export default SellAsset;
