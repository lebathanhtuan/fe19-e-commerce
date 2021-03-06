import React, { useEffect, useState, useMemo } from "react";
import { useHistory, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Row,
  Col,
  Checkbox,
  Input,
  Space,
  Tag,
  Slider,
  Select,
} from "antd";

import TopWrapper from "../../../components/TopWrapper";

import { PAGE_SIZE } from "../../../constants/pagination";
import { ROUTER } from "../../../constants/router";
import { BREADCRUMB, DEFAULT_PRICE_FILTER } from "./constants";

import {
  getProductListAction,
  getCategoryListAction,
} from "../../../redux/actions";

import * as S from "./styles";

const ProductListPage = () => {
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState(DEFAULT_PRICE_FILTER);
  const [keywordFilter, setKeywordFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");

  const history = useHistory();

  const { productList } = useSelector((state) => state.productReducer);
  const { categoryList } = useSelector((state) => state.categoryReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductListAction({ limit: PAGE_SIZE.USER_PRODUCT, page: 1 }));
    dispatch(getCategoryListAction());
  }, []);

  const handleSelectCategoryFilter = (e) => {
    const { value, checked } = e.target;
    const newCategoryFilter = checked
      ? [...categoryFilter, value]
      : categoryFilter.filter((filterItem) => filterItem.id !== value.id);
    setCategoryFilter(newCategoryFilter);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        categoryFilter: newCategoryFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  const handleClearCategoryFilter = (categoryFilterItem) => {
    const newCategoryFilter = categoryFilter.filter(
      (filterItem) => filterItem.id !== categoryFilterItem.id
    );
    setCategoryFilter(newCategoryFilter);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        categoryFilter: newCategoryFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  const handleChangePriceFilter = (value) => {
    setPriceFilter(value);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        categoryFilter,
        priceFilter: value,
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  const handleClearPriceFilter = () => {
    setPriceFilter([0, 30000000]);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        categoryFilter,
        priceFilter: [0, 30000000],
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  const handleSearchKeyword = (e) => {
    setKeywordFilter(e.target.value);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        categoryFilter,
        priceFilter,
        keyword: e.target.value,
        sortFilter,
      })
    );
  };

  const handleClearKeyword = () => {
    setKeywordFilter("");
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        categoryFilter,
        priceFilter,
        keyword: "",
        sortFilter,
      })
    );
  };

  const handleChangeSort = (value) => {
    setSortFilter(value);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        categoryFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter: value,
      })
    );
  };

  const handleClearSort = () => {
    setSortFilter("");
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        categoryFilter,
        priceFilter,
        keyword: "",
        sortFilter: "",
      })
    );
  };

  const handleLoadMore = (e) => {
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: productList.meta.page + 1,
        categoryFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter,
        more: true,
      })
    );
  };

  const renderCategoryList = useMemo(() => {
    return categoryList.data.map((categoryItem, categoryIndex) => {
      const checked =
        categoryFilter.findIndex(
          (filterItem) => filterItem.id === categoryItem.id
        ) !== -1;
      return (
        <S.FilterItem key={categoryItem.id}>
          <Checkbox
            value={categoryItem}
            checked={checked}
            onChange={(e) => handleSelectCategoryFilter(e)}
          >
            {categoryItem.name}
          </Checkbox>
        </S.FilterItem>
      );
    });
  }, [categoryList.data, categoryFilter]);

  const renderCategoryFilterTags = useMemo(() => {
    return categoryFilter.map((categoryFilterItem, categoryFilterIndex) => (
      <Tag
        key={categoryFilterItem.id}
        closable
        onClose={() => handleClearCategoryFilter(categoryFilterItem)}
      >
        {categoryFilterItem.name}
      </Tag>
    ));
  }, [categoryFilter]);

  const renderProductList = useMemo(() => {
    return productList.data.map((item, index) => (
      <Col lg={6} md={8} sm={8} xs={12} key={item.id}>
        <S.ProductItem
          onClick={() =>
            history.push(
              generatePath(ROUTER.USER.PRODUCT_DETAIL, { id: item.id })
            )
          }
        >
          {item.isNew && <div className="new">NEW</div>}
          <S.ImageContainer>
            <S.ImageContent src={item.image} className="image" alt="" />
          </S.ImageContainer>
          <div className="card-content">
            <div>{item.name}</div>
            <div>{item.price.toLocaleString()}</div>
          </div>
        </S.ProductItem>
      </Col>
    ));
  }, [history, productList.data]);

  return (
    <>
      <TopWrapper titlePage="Danh s??ch s???n ph???m" breadcrumb={BREADCRUMB} />
      <S.ProductListContainer>
        <Row gutter={16}>
          <Col md={6} xs={24}>
            <S.FilterContainer>
              <S.FilterTitle>H??ng s???n xu???t</S.FilterTitle>
              {renderCategoryList}
            </S.FilterContainer>
            <S.FilterContainer>
              <S.FilterTitle>Gi??</S.FilterTitle>
              <div style={{ padding: "0 8px" }}>
                <Slider
                  range
                  min={DEFAULT_PRICE_FILTER[0]}
                  max={DEFAULT_PRICE_FILTER[1]}
                  step={1000000}
                  value={priceFilter}
                  tipFormatter={(value) => value.toLocaleString()}
                  onChange={(value) => handleChangePriceFilter(value)}
                />
              </div>
            </S.FilterContainer>
          </Col>
          <Col md={18} xs={24}>
            <Row gutter={16}>
              <Col span={18}>
                <Input
                  placeholder="T??m ki???m"
                  value={keywordFilter}
                  onChange={(e) => handleSearchKeyword(e)}
                />
              </Col>
              <Col span={6}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="S???p x???p theo"
                  allowClear
                  onChange={(value) => handleChangeSort(value)}
                >
                  <Select.Option value="asc">Gi?? th???p ?????n cao</Select.Option>
                  <Select.Option value="desc">Gi?? cao ?????n th???p</Select.Option>
                </Select>
              </Col>
            </Row>
            {(categoryFilter.length > 0 ||
              keywordFilter ||
              priceFilter[0] !== DEFAULT_PRICE_FILTER[0] ||
              priceFilter[1] !== DEFAULT_PRICE_FILTER[1] ||
              sortFilter) && (
              <Space style={{ marginTop: 16 }}>
                {categoryFilter.length > 0 && renderCategoryFilterTags}
                {keywordFilter && (
                  <Tag closable onClose={() => handleClearKeyword()}>
                    T??? kh??a: {keywordFilter}
                  </Tag>
                )}
                {(priceFilter[0] !== DEFAULT_PRICE_FILTER[0] ||
                  priceFilter[1] !== DEFAULT_PRICE_FILTER[1]) && (
                  <Tag closable onClose={() => handleClearPriceFilter()}>
                    {`Gi?? t???: ${priceFilter[0].toLocaleString()} - ${priceFilter[1].toLocaleString()}`}
                  </Tag>
                )}
                {sortFilter && (
                  <Tag closable onClose={() => handleClearSort()}>
                    {`S???p x???p theo ${
                      sortFilter === "asc" ? "t??ng d???n" : "gi???m d???n"
                    }`}
                  </Tag>
                )}
              </Space>
            )}
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              {renderProductList}
            </Row>
            {productList.meta.total !== productList.data.length && (
              <Row justify="center" style={{ marginTop: 16 }}>
                <Button onClick={() => handleLoadMore()}>Hi???n th??? th??m</Button>
              </Row>
            )}
          </Col>
        </Row>
      </S.ProductListContainer>
    </>
  );
};

export default ProductListPage;
