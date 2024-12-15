import React from "react";
import { Form, Input, DatePicker, Button } from "antd";

function CreateAssignmentForm({ onSuccess }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    onSuccess();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="title"
        label="Assignment Title"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Assignment
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateAssignmentForm;
