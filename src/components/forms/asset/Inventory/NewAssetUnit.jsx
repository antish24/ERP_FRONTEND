import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKENDURL } from "../../../../helper/Urls";
import { AlertContext } from "../../../../context/AlertContext";

const NewAssetUnit = ({ openModalFun, reload,routeLink }) => {
  const { openNotification } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKENDURL}/inventory/${routeLink}/new`, {
        name: values.name,
        description: values.description,
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

export default NewAssetUnit;
