import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Card,
  Row,
  Col,
  Rate,
  Radio,
  Button,
  Space,
  Descriptions,
  Form,
  Input,
  List,
  Comment,
  Skeleton,
  InputNumber,
  notification,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

import TopWrapper from "../../../components/TopWrapper";
import { BREADCRUMB } from "./constants";

import {
  getProductDetailAction,
  getCommentListAction,
  postCommentAction,
  addToCartAction,
  updateCartProductAction,
} from "../../../redux/actions";

import * as S from "./styles";

const ProductDetailPage = ({ match, ...props }) => {
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(
    "🚀 ~ file: index.jsx ~ line 43 ~ ProductDetailPage ~ selectedOption",
    selectedOption
  );
  const id = match.params?.id;

  const [commentForm] = Form.useForm();

  const { userInfo } = useSelector((state) => state.authReducer);
  const { productDetail } = useSelector((state) => state.productReducer);
  const { commentList } = useSelector((state) => state.commentReducer);
  const { cartList } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const isFavorite =
    productDetail.data.favorites?.findIndex(
      (item) => item.userId === userInfo.data.id
    ) !== -1;

  useEffect(() => {
    if (id) {
      dispatch(getProductDetailAction({ id }));
      dispatch(getCommentListAction({ productId: id }));
    }
  }, [id]);

  const handleFavoriteProduct = () => {
    if (isFavorite) {
      // Call API DELETE Favorite
    } else {
      // Call API POST Favorite
    }
  };

  const handleAddToCart = () => {
    if (userInfo.data.id) {
      if (productDetail.data.productOptions?.length) {
        if (!selectedOption) {
          notification.error({
            message: "Vui lòng chọn một tùy chọn",
          });
        } else {
          const existCartProduct = cartList.data.find(
            (item) => item.productOption?.id === selectedOption.id
          );
          if (existCartProduct) {
            dispatch(
              updateCartProductAction({
                data: {
                  id: existCartProduct.id,
                  quantity: existCartProduct.quantity + productQuantity,
                },
                callback: {
                  showSuccess: () =>
                    notification.success({
                      message: "Thêm vào giỏ hàng thành công",
                    }),
                },
              })
            );
          } else {
            dispatch(
              addToCartAction({
                quantity: productQuantity,
                productId: parseInt(id),
                productOption: {
                  id: selectedOption.id,
                  name: selectedOption.name,
                  price: selectedOption.price,
                },
              })
            );
          }
        }
      } else {
        const existCartProduct = cartList.data.find(
          (item) => item.productId === parseInt(id)
        );
        if (existCartProduct) {
          dispatch(
            updateCartProductAction({
              data: {
                id: existCartProduct.id,
                quantity: existCartProduct.quantity + productQuantity,
              },
              callback: {
                showSuccess: () =>
                  notification.success({
                    message: "Thêm vào giỏ hàng thành công",
                  }),
              },
            })
          );
        } else {
          dispatch(
            addToCartAction({
              quantity: productQuantity,
              productId: parseInt(id),
              productOption: null,
            })
          );
        }
      }
    } else {
      notification.error({
        message: "Thông báo",
        description: "Bạn cần đăng nhập để thực hiện chức năng này",
      });
    }
  };

  const handleSubmitComment = (values) => {
    const isExist =
      commentList.data.findIndex((item) => item.userId === userInfo.data.id) !==
      -1;
    if (isExist) {
      notification.warning({
        message: "Bạn đã bình luận",
      });
    } else {
      dispatch(
        postCommentAction({
          ...values,
          productId: parseInt(id),
          userId: userInfo.data.id,
        })
      );
      commentForm.resetFields();
    }
  };

  const productRate = useMemo(() => {
    let total = 0;
    if (!commentList.data.length) return 0;
    commentList.data.forEach((item) => {
      total = total + item.rate;
    });
    return (total / commentList.data.length).toFixed(1);
  }, [commentList.data]);

  const getProductOptions = useMemo(() => {
    if (productDetail.data.productOptions?.length) {
      return productDetail.data.productOptions.map((option) => {
        return (
          <Radio.Button key={option.id} value={option}>
            {option.name}
          </Radio.Button>
        );
      });
    }
  }, [productDetail.data]);

  return (
    <div>
      <TopWrapper
        breadcrumb={[
          ...BREADCRUMB,
          {
            title: productDetail.data.name,
          },
        ]}
        height={80}
      />
      <S.ProductDetailContainer>
        <Card size="small">
          <Row gutter={[16, 16]}>
            <Col md={10} xs={24}>
              {productDetail.loading ? (
                <S.SkeletonImage>
                  <Skeleton.Image />
                </S.SkeletonImage>
              ) : (
                <img
                  src={productDetail.data.image}
                  alt=""
                  width="100%"
                  height="auto"
                />
              )}
            </Col>
            <Col md={14} xs={24}>
              {productDetail.loading ? (
                <Skeleton active />
              ) : (
                <>
                  <h2 style={{ marginBottom: 0 }}>{productDetail.data.name}</h2>
                  <Space align="baseline">
                    <Rate allowHalf disabled value={productRate} style={{}} />
                    {!!productRate && <h3>{productRate}</h3>}
                  </Space>

                  {productDetail.data.productOptions?.length > 0 && (
                    <div style={{ margin: "16px 0" }}>
                      Loại sản phẩm:
                      <div>
                        <Radio.Group
                          onChange={(e) => setSelectedOption(e.target.value)}
                          optionType="button"
                        >
                          {getProductOptions}
                        </Radio.Group>
                      </div>
                    </div>
                  )}

                  <div>
                    <InputNumber
                      min={1}
                      max={10}
                      value={productQuantity}
                      onChange={(value) => setProductQuantity(value)}
                    />
                  </div>

                  <h3>
                    {selectedOption
                      ? (
                          selectedOption.price + (productDetail.data.price || 0)
                        ).toLocaleString()
                      : productDetail.data.price?.toLocaleString()}
                  </h3>
                </>
              )}

              {productDetail.loading ? (
                <Space>
                  <Skeleton.Button size="large" />
                  <Skeleton.Button size="large" />
                </Space>
              ) : (
                <Space>
                  <Button
                    size="large"
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleAddToCart()}
                  >
                    Thêm vào giỏ
                  </Button>
                  <Button
                    size="large"
                    danger={isFavorite}
                    icon={
                      isFavorite ? (
                        <HeartFilled style={{ color: "red" }} />
                      ) : (
                        <HeartOutlined />
                      )
                    }
                    onClick={() => handleFavoriteProduct()}
                  >
                    Yêu thích
                  </Button>
                  <div>{`(${productDetail.data.favorites?.length} đã thích)`}</div>
                </Space>
              )}
            </Col>
          </Row>
        </Card>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col md={{ span: 16, order: 1 }} xs={{ span: 24, order: 2 }}>
            <Card size="small">
              <h3>Thông tin chi tiết</h3>
              <S.ProductDetailContent
                dangerouslySetInnerHTML={{ __html: productDetail.data.content }}
              />
            </Card>
            <Card size="small" style={{ marginTop: 16 }}>
              <h3>Đánh giá & Bình luận</h3>
              {userInfo.data.id && (
                <Form
                  form={commentForm}
                  layout="vertical"
                  initialValues={{ rate: 0, content: "" }}
                  onFinish={(values) => handleSubmitComment(values)}
                >
                  <Form.Item
                    label="Đánh giá"
                    name="rate"
                    rules={[{ required: true, message: "Required !" }]}
                  >
                    <Rate allowHalf />
                  </Form.Item>
                  <Form.Item
                    label="Bình luận"
                    name="content"
                    rules={[{ required: true, message: "Required !" }]}
                  >
                    <Input.TextArea
                      placeholder="Bình luận"
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  </Form.Item>
                  <Button htmlType="submit" type="primary">
                    Gửi
                  </Button>
                </Form>
              )}
              <List
                className="comment-list"
                header={`${commentList.data.length} Bình luận`}
                itemLayout="horizontal"
                dataSource={commentList.data}
                renderItem={(item) => (
                  <li>
                    <Comment
                      author={item.user?.name}
                      content={
                        <div>
                          <Rate
                            disabled
                            value={item.rate}
                            allowHalf
                            style={{ fontSize: 14 }}
                          />
                          <p>{item.content}</p>
                        </div>
                      }
                      datetime={moment(item.createdAt).fromNow()}
                    />
                  </li>
                )}
              />
            </Card>
          </Col>
          <Col md={{ span: 8, order: 2 }} xs={{ span: 24, order: 1 }}>
            <Card size="small">
              <h3>Thông số kĩ thuật</h3>
              <Descriptions bordered size="small">
                <Descriptions.Item label="Product" span={3}>
                  Cloud Database
                </Descriptions.Item>
                <Descriptions.Item label="Billing" span={3}>
                  Prepaid
                </Descriptions.Item>
                <Descriptions.Item label="time" span={3}>
                  18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="Amount" span={3}>
                  $80.00
                </Descriptions.Item>
                <Descriptions.Item label="Disquantity" span={3}>
                  $20.00
                </Descriptions.Item>
                <Descriptions.Item label="Official" span={3}>
                  $60.00
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </S.ProductDetailContainer>
    </div>
  );
};

export default ProductDetailPage;
