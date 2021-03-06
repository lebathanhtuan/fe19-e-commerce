import React, { useEffect, useMemo } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Card, Input, Button, InputNumber, Checkbox, Select } from "antd";

import { ROUTER } from "../../../constants/router";

import {
  getProductDetailAction,
  createProductAction,
  updateProductAction,
  getCategoryListAction,
} from "../../../redux/actions";

const ModifyProductPage = () => {
  const history = useHistory();
  const { params } = useRouteMatch();
  const id = params?.id;

  const [modifyProductForm] = Form.useForm();

  const { productDetail, actionLoading } = useSelector(
    (state) => state.productReducer
  );
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();

  const initialValues = id
    ? {
        name: productDetail.data?.name,
        price: productDetail.data?.price,
        isNew: productDetail.data?.isNew,
      }
    : {
        name: "",
        price: 0,
        isNew: false,
      };

  useEffect(() => {
    if (id) dispatch(getProductDetailAction({ id }));
    dispatch(getCategoryListAction());
  }, [id]);

  useEffect(() => {
    modifyProductForm.resetFields();
  }, [productDetail.data]);

  const renderCategoryOptions = useMemo(() => {
    return categoryList.data?.map((category) => {
      return (
        <Select.Option key={category.id} value={category.id}>
          {category.name}
        </Select.Option>
      );
    });
  }, [categoryList.data]);

  const handleSubmitForm = (values) => {
    if (id) {
      dispatch(
        updateProductAction({
          id,
          data: {
            ...values,
            image: "https://via.placeholder.com/800x600",
          },
          callback: {
            goBackList: () => history.push(ROUTER.ADMIN.PRODUCT_LIST),
          },
        })
      );
    } else {
      dispatch(
        createProductAction({
          data: {
            ...values,
            image: "https://via.placeholder.com/800x600",
          },
          callback: {
            goBackList: () => history.push(ROUTER.ADMIN.PRODUCT_LIST),
          },
        })
      );
    }
  };

  return (
    <div>
      <h3>{id ? "C???p nh???t s???n ph???m" : "Th??m s???n ph???m"}</h3>
      <Card style={{ maxWidth: 700, width: "100%" }}>
        <Form
          form={modifyProductForm}
          name={id ? "update-product-form" : "create-product-form"}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={initialValues}
          onFinish={(values) => handleSubmitForm(values)}
        >
          <Form.Item
            label="T??n s???n ph???m"
            name="name"
            rules={[{ required: true, message: "B???n ch??a nh???p t??n" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Nh?? s???n xu???t"
            rules={[{ required: true, message: "B???n ch??a ch???n nh?? s???n xu???t" }]}
          >
            <Select placeholder="Nh?? s???n xu???t">
              {renderCategoryOptions}
            </Select>
          </Form.Item>

          <Form.Item
            label="Gi?? s???n ph???m"
            name="price"
            rules={[{ required: true, message: "B???n ch??a nh???p gi??" }]}
          >
            <InputNumber
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="isNew"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 18 }}
          >
            <Checkbox>S???n ph???m m???i</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 6, span: 18 }}
            style={{ marginBottom: 0 }}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={
                actionLoading.createProduct || actionLoading.updateProduct
              }
            >
              {id ? "S???a" : "Th??m"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ModifyProductPage;
