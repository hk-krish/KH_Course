import { Button, Flex, Image, Modal, Popconfirm, Spin, Switch, Table } from "antd";
import { Forbidden, Edit, Trash } from "iconsax-react";
import { useCallback, useEffect, useState } from "react";
import { Card, CardBody, Col, Container } from "reactstrap";
import Delete from "../../Api/Delete";
import { Url_Keys } from "../../Constant";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import CommonCardHeader from "../../CoreComponents/CommonCardHeader";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchStudentsApiData, setStudentsModal, setSingleEditingIdStudents } from "../../ReduxToolkit/Slice/StudentsSlice";
import StudentsModel from "./StudentsModel";
import { StudentsBlockTypeData } from "../../Data/CoreComponents";
import "@ant-design/v5-patch-for-react-19";
import { Post } from "../../Api";

const Students = () => {
  const [isEdit, setEdit] = useState(false);
  const [isSearch, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [isTypeFilter, setTypeFilter] = useState("");

  const dispatch = useAppDispatch();
  const { allStudents, isLoadingStudents } = useAppSelector((state) => state.students);

  const getAllStudents = useCallback(async () => {
    try {
      await dispatch(fetchStudentsApiData({ page, limit: pageLimit, search: isSearch ,blockFilter:isTypeFilter }));
    } catch (error) {}
  }, [dispatch, page, pageLimit, isSearch, isTypeFilter]);

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  const handleDelete = async (record: any) => {
    try {
      await Delete(`${Url_Keys.Students.Delete}/${record?._id}`);
      getAllStudents();
    } catch (error) {}
  };

  const AddStudentsModalClick = () => dispatch(setStudentsModal());

  const handleEdit = (item: any) => {
    dispatch(setSingleEditingIdStudents(item?._id));
    AddStudentsModalClick();
    setEdit(true);
  };

  const handleActive = async (active: boolean, record: any) => {
    try {
      const response = await Post(Url_Keys.Students.Edit, { id: record?._id, isBlocked: active });
      if (response?.status === 200) getAllStudents();
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
      render: (url: string) => (url ? <Image src={url} width={60} height={60} alt="Category" fallback="/placeholder.png" /> : <span className="text-muted">-</span>),
      width: 100,
    },
    {
      title: "firstName",
      dataIndex: "firstName",
      key: "firstName",
      render: (text: string) => text || "-",
      width: 150,
    },
    {
      title: "lastName",
      dataIndex: "lastName",
      key: "lastName",
      render: (text: string) => text || "-",
      width: 150,
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => text || "-",
      width: 150,
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text: string) => text || "-",
      width: 150,
    },
    {
      title: "Option",
      key: "actionIcons",
      width: 120,
      render: (_: any, record: any) => (
        <Flex gap="middle" justify="center">
          <Button
            className={`m-1 p-1 btn ${record?.isBlocked ? "btn-danger" : "btn-success"}`}
            onClick={() => {
              Modal.confirm({
                title: "Are you sure?",
                content: `Do you really want to ${record?.isBlocked ? "Unblock" : "Block"} "${record.firstName}"?`,
                okText: "ok",
                cancelText: "Cancel",
                onOk: async () => {
                  await handleActive(!record?.isBlocked, record);
                },
              });
            }}
          >
            <Forbidden className="action" />
          </Button>
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
      <Breadcrumbs mainTitle="Students" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CommonCardHeader Search={(e) => setSearch(e)} searchClass="col-md-8" typeFilter={setTypeFilter} typeFilterData={StudentsBlockTypeData} btnTitle="Add Banners" btnClick={AddStudentsModalClick} />
            <CardBody>
              {isLoadingStudents ? (
                <div className="text-center py-5">
                  <Spin size="large" />
                </div>
              ) : (
                <Table
                  className="custom-table"
                  dataSource={Array.isArray(allStudents?.user_data) ? allStudents.user_data : []}
                  columns={columns}
                  rowKey="_id"
                  scroll={{ x: "max-content" }}
                  pagination={{
                    current: page,
                    pageSize: pageLimit,
                    total: allStudents?.totalData || 0,
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
      <StudentsModel getApi={getAllStudents} isEdit={isEdit} setEdit={setEdit} />
    </>
  );
};

export default Students;
