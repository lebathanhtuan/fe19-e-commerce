import React, { useState, useMemo } from "react";
import { Form, Button, Input, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

import TaskItem from "./TaskItem";

import {
  addTaskAction,
  editTaskAction,
  deleteTaskAction,
} from "../../../redux/actions";

const ToDoListPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const dispatch = useDispatch();
  const { taskList } = useSelector((state) => state.taskReducer);

  const filterTaskList = taskList.filter((task) => {
    return task.title.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  const handleAddTask = (values) => {
    dispatch(addTaskAction({
      data: {
        id: uuidv4(),
        ...values,
      }
    }));
  };

  const handleEditTask = (id, values) => {
    dispatch(editTaskAction({ id, data: values }));
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTaskAction({ id }));
  };

  const renderTaskItem = useMemo(() => {
    return filterTaskList.map((taskItem, taskIndex) => {
      return (
        <TaskItem
          key={taskIndex}
          data={taskItem}
          id={taskItem.id}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />
      );
    });
  }, [filterTaskList]);

  return (
    <div>
      <Card title="To Do List">
        <Form
          name="addTask"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ username: "Tuấn" }}
          onFinish={(values) => handleAddTask(values)}
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

          <Button type="primary" htmlType="submit" block>
            Thêm Task
          </Button>
        </Form>
      </Card>
      <Input
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="Tìm kiếm"
        suffix={<SearchOutlined />}
        style={{ marginTop: 16 }}
      />
      {renderTaskItem}
    </div>
  );
};

export default ToDoListPage;
