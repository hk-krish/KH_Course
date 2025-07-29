import "@ant-design/v5-patch-for-react-19";
import { Button, Flex, Image, Modal, Spin, Switch, Table } from "antd";
import { Edit, Trash } from "iconsax-react";
import { useCallback, useEffect, useState } from "react";
import { Card, CardBody, Col, Container } from "reactstrap";
import Delete from "../../Api/Delete";
import { Url_Keys } from "../../Constant";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import CommonCardHeader from "../../CoreComponents/CommonCardHeader";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchCourseApiData, setCourseModal, setSingleEditingIdCourse } from "../../ReduxToolkit/Slice/CourseSlice";
import CourseModel from "./CourseModel";
import { Post } from "../../Api";

const Course = () => {
  const [isEdit, setEdit] = useState(false);
  const [isSearch, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const dispatch = useAppDispatch();
  const { allCourse, isLoadingCourse } = useAppSelector((state) => state.course);

  const getAllCourse = useCallback(async () => {
    try {
      await dispatch(fetchCourseApiData({ page, limit: pageLimit, search: isSearch }));
    } catch (error) {}
  }, [dispatch, isSearch, page, pageLimit]);

  useEffect(() => {
    getAllCourse();
  }, [getAllCourse]);

  const handleDelete = async (record: any) => {
    try {
      await Delete(`${Url_Keys.Course.Delete}/${record?._id}`);
      getAllCourse();
    } catch (error) {}
  };

  const AddCourseModalClick = () => dispatch(setCourseModal());

  const handleEdit = (item: any) => {
    dispatch(setSingleEditingIdCourse(item?._id));
    AddCourseModalClick();
    setEdit(true);
  };

  const handleActive = async (checked: boolean, record: any, type: string) => {
    let payload: any = { id: record?._id };
    if (type === "feature") payload.feature = checked;
    if (type === "active") payload.action = checked;
    try {
      const response = await Post(Url_Keys.Course.Edit, payload);
      if (response?.status === 200) getAllCourse();
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
      render: (url: string) => (url ? <Image src={url} width={60} height={60} alt="Course" fallback="/placeholder.png" /> : <span className="text-muted">No Image</span>),
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => text || "-",
      width: 150,
    },
    // {
    //   title: "Category",
    //   dataIndex: "categoryIds",
    //   key: "categoryIds",
    //   render: (text: string) => text || "-",
    //   width: 150,
    // },
    //  {
    //   title: "user",
    //   dataIndex: "userIds",
    //   key: "userIds",
    //   render: (text: string) => text || "-",
    //   width: 150,
    // },
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
      <Breadcrumbs mainTitle="Course" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CommonCardHeader Search={(e) => setSearch(e)} searchClass="col-md-10 col-sm-7" btnTitle="Add Course" btnClick={AddCourseModalClick} />
            <CardBody>
              {isLoadingCourse ? (
                <div className="text-center py-5">
                  <Spin size="large" />
                </div>
              ) : (
                <Table
                  className="custom-table"
                  dataSource={Array.isArray(allCourse?.course_data) ? allCourse.course_data : []}
                  columns={columns}
                  rowKey="_id"
                  scroll={{ x: "max-content" }}
                  pagination={{
                    current: page,
                    pageSize: pageLimit,
                    total: allCourse?.totalData || 0,
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
      <CourseModel getApi={getAllCourse} isEdit={isEdit} setEdit={setEdit} />
    </>
  );
};

export default Course;
