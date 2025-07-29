import "@ant-design/v5-patch-for-react-19";
import { Button, Flex, Image, Modal, Spin, Switch, Table } from "antd";
import { Edit, Trash } from "iconsax-react";
import { useCallback, useEffect, useState } from "react";
import { Card, CardBody, Col, Container } from "reactstrap";
import { Post } from "../../Api";
import Delete from "../../Api/Delete";
import { Url_Keys } from "../../Constant";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import CommonCardHeader from "../../CoreComponents/CommonCardHeader";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchCategoryApiData, setCategoryModal, setSingleEditingIdCategory } from "../../ReduxToolkit/Slice/CategorySlice";
import CategoryModel from "./CategoryModel";

const Category = () => {
  const [isEdit, setEdit] = useState(false);
  const [isSearch, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const dispatch = useAppDispatch();
  const { allCategory, isLoadingCategory } = useAppSelector((state) => state.category);

  const getAllCategory = useCallback(async () => {
    try {
      await dispatch(fetchCategoryApiData({ page, limit: pageLimit, search: isSearch }));
    } catch (error) {}
  }, [dispatch, isSearch, page, pageLimit]);

  useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);

  const handleDelete = async (record: any) => {
    try {
      await Delete(`${Url_Keys.Category.Delete}/${record?._id}`);
      getAllCategory();
    } catch (error) {}
  };

  const AddCategoryModalClick = () => dispatch(setCategoryModal());

  const handleEdit = (item: any) => {
    dispatch(setSingleEditingIdCategory(item?._id));
    AddCategoryModalClick();
    setEdit(true);
  };

  const handleActive = async (checked: boolean, record: any, type: string) => {
    let payload: any = { id: record?._id };
    if (type === "feature") payload.feature = checked;
    if (type === "active") payload.action = checked;
    try {
      const response = await Post(Url_Keys.Category.Edit, payload);
      if (response?.status === 200) getAllCategory();
    } catch (error) {}
  };

  const columns = [
    {
      title: "ID",
      key: "index",
      render: (_: any, __: any, index: number) => (page - 1) * pageLimit + index + 1,
      width: 50,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url: string) => (url ? <Image src={url} width={60} height={60} alt="Category" fallback="/placeholder.png" /> : <span className="text-muted">No Image</span>),
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => text || "-",
      width: 150,
    },
    {
      title: "Feature",
      dataIndex: "feature",
      key: "feature",
      render: (feature: boolean, record: any) => <Switch checked={feature} className="switch-xsm" onChange={(checked) => handleActive(checked, record, "feature")} />,
      width: 50,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (active: boolean, record: any) => <Switch checked={active} className="switch-xsm" onChange={(checked) => handleActive(checked, record, "active")} />,
      width: 50,
    },
    {
      title: "Option",
      key: "actionIcons",
      width: 120,
      render: (_: any, record: any) => (
        <Flex gap="middle" justify="center">
          <Button className="m-1 p-1 btn btn-primary" onClick={() => handleEdit(record)}>
            <Edit className="action" />
          </Button>
          <Button
            className="m-1 p-1 btn btn-danger"
            onClick={() => {
              Modal.confirm({
                title: "Are you sure?",
                content: `Do you really want to delete "${record.name}"?`,
                okText: "Yes, Delete",
                cancelText: "Cancel",
                onOk: async () => {
                  await handleDelete(record);
                },
              });
            }}
          >
            <Trash className="action" />
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Breadcrumbs mainTitle="Category" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CommonCardHeader Search={(e) => setSearch(e)} searchClass="col-md-10 col-sm-7" btnTitle="Add Category" btnClick={AddCategoryModalClick} />
            <CardBody>
              {isLoadingCategory ? (
                <div className="text-center py-5">
                  <Spin size="large" />
                </div>
              ) : (
                <Table
                  className="custom-table"
                  dataSource={Array.isArray(allCategory?.category_data) ? allCategory.category_data : []}
                  columns={columns}
                  rowKey="_id"
                  scroll={{ x: "max-content" }}
                  pagination={{
                    current: page,
                    pageSize: pageLimit,
                    total: allCategory?.totalData || 0,
                    showSizeChanger: true,
                    onChange: (newPage, newPageSize) => {
                      setPage(newPage);
                      setPageLimit(newPageSize);
                    },
                  }}
                />
              )}
            </CardBody>
          </Card>
        </Col>
      </Container>
      <CategoryModel getApi={getAllCategory} isEdit={isEdit} setEdit={setEdit} />
    </>
  );
};

export default Category;
