import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Button, Row, Col, Radio, Space } from "antd";

import { orderCartAction } from "../../../../redux/actions";

const Payment = ({ setCheckoutStep }) => {
  const [paymentForm] = Form.useForm();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.authReducer);
  const { orderInfo } = useSelector((state) => state.orderReducer);
  const { selectedCarts } = useSelector((state) => state.cartReducer);
  console.log(
    "🚀 ~ file: Payment.jsx ~ line 15 ~ Payment ~ selectedCarts",
    selectedCarts
  );

  const totalPrice = selectedCarts.reduce((total, item) => {
    return total + item.product?.price * item.quantity;
  }, 0);

  const handleConfirmPayment = (values) => {
    const newValues = {
      ...orderInfo,
      ...values,
      userId: userInfo.data.id,
      products: selectedCarts.map((cartItem) => {
        return {
          id: cartItem.product?.id,
          cartId: cartItem.id,
          name: cartItem.product?.name,
          price:
            cartItem.product?.price +
            (cartItem.productOption ? cartItem.productOption.price : 0),
          quantity: cartItem.quantity,
          productOption: cartItem.productOption,
        };
      }),
      totalPrice,
    };
    dispatch(
      orderCartAction({
        data: newValues,
        callback: {
          success: () => setCheckoutStep(3),
        },
      })
    );
  };

  const renderSelectedCarts = () => {
    return selectedCarts.map((cartItem) => {
      return (
        <Row key={cartItem.id} justify="space-between">
          <p key={cartItem.id}>
            {cartItem.product?.name} x{cartItem.quantity}
          </p>
          <p>
            {(cartItem.product?.price * cartItem.quantity).toLocaleString()}₫
          </p>
        </Row>
      );
    });
  };

  return (
    <Row gutter={16}>
      <Col span={16}>
        <Card size="small">
          <Form
            form={paymentForm}
            name="paymentForm"
            layout="vertical"
            initialValues={{ shipper: "giaohangnhanh", paymentType: "cod" }}
            onFinish={(values) => handleConfirmPayment(values)}
          >
            <Form.Item label="Đơn vị giao hàng" name="shipper">
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="giaohangnhanh">Giao hàng nhanh</Radio>
                  <Radio value="giaohangtietkiem">Giao hàng tiết kiệm</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Phương thức thanh toán" name="paymentType">
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="cod">Thanh toán tiền mặt khi nhận hàng</Radio>
                  <Radio value="momo">Thanh toán bằng ví MoMo</Radio>
                  <Radio value="atm">
                    Thẻ ATM nội địa/Internet Banking (Hỗ trợ Internet Banking)
                  </Radio>
                  <Radio value="visa">
                    Thanh toán bằng thẻ quốc tế Visa, Master, JCB
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={8}>
        <Card size="small" style={{ marginBottom: 16 }}>
          <h3>Thông tin giao hàng</h3>
          <Row justify="space-between">
            <p>Họ và tên</p>
            <p>{orderInfo.fullName}</p>
          </Row>
          <Row justify="space-between">
            <p>Điện thoại</p>
            <p>{orderInfo.phoneNumber}</p>
          </Row>
          <Row justify="space-between">
            <p>Địa chỉ</p>
            <p>
              {`${orderInfo.address}, ${orderInfo.ward}, ${orderInfo.district}, ${orderInfo.city}`}
            </p>
          </Row>
        </Card>
        <Card size="small" style={{ marginBottom: 16 }}>
          <h3>Thông tin đơn hàng</h3>
          {renderSelectedCarts()}
          <hr />
          <Row justify="space-between">
            <p>Tạm tính</p>
            <p>
              {selectedCarts
                .reduce((total, item) => {
                  return total + item.product?.price * item.quantity;
                }, 0)
                .toLocaleString()}
              ₫
            </p>
          </Row>
          <Row justify="space-between">
            <p>Giảm giá</p>
            <p>0₫</p>
          </Row>
          <Row justify="space-between">
            <p>Tổng tiền</p>
            <p>{totalPrice.toLocaleString()}₫</p>
          </Row>
        </Card>
        <Button
          onClick={() => setCheckoutStep(0)}
          style={{ width: "100%", marginBottom: 8 }}
        >
          Trở lại
        </Button>
        <Button
          type="primary"
          style={{ width: "100%" }}
          onClick={() => paymentForm.submit()}
        >
          Thanh toán
        </Button>
      </Col>
    </Row>
  );
};

export default Payment;
