import React, { useState, useMemo } from "react";
import PropTypes from 'prop-types';
import { Card, Button, Row, Form, Input } from "antd";

const TaskItem = ({
  data,
  id,
  handleEditTask,
  handleDeleteTask,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editForm] = Form.useForm();

  const renderItemView = useMemo(() => {
    return (
      <>
        <div>Tiêu đề: {data.title}</div>
        <div>Nội dung: {data.description}</div>
      </>
    );
  }, [data]);

  const renderItemEdit = useMemo(() => {
    return (
      <Form
        form={editForm}
        name={`editTask-${id}`}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          title: data.title,
          description: data.description,
        }}
        onFinish={(values) => {
          handleEditTask(id, values)
          setIsEdit(false)
        }}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          validateFirst
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Bạn chưa nhập tiêu đề!",
            },
            {
              min: 6,
              max: 32,
              message: "Tiêu đề phải nằm trong khoảng 6-32 kí tự",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="description"
          rules={[{ required: true, message: "Bạn chưa nhập nội dung" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    );
  }, [data]);

  return (
    <Card
      title={
        <Row justify="end">
          {isEdit
            ? (
              <>
                <Button
                  type="primary"
                  style={{ marginRight: 8 }}
                  onClick={() => {
                    editForm.submit()
                  }}
                >
                  Xác nhận
                </Button>
                <Button
                  type="primary"
                  ghost
                  style={{ marginRight: 8 }}
                  onClick={() => setIsEdit(false)}
                >
                  Hủy
                </Button>
              </>
            )
            : (
              <Button
                type="primary"
                ghost
                style={{ marginRight: 8 }}
                onClick={() => setIsEdit(true)}
              >
                Sửa
              </Button>
            )
          }
          <Button danger onClick={() => handleDeleteTask(id)}>
            Xóa
          </Button>
        </Row>
      }
      style={{ marginTop: 16 }}
    >
      {isEdit ? renderItemEdit : renderItemView}
    </Card>
  );
};

TaskItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  id: PropTypes.number,
  handleEditTask: PropTypes.func,
  handleDeleteTask: PropTypes.func,
};

TaskItem.defaultProps = {
  data: {},
  handleEditTask: () => { },
  handleDeleteTask: () => { },
};

export default TaskItem;
