import { Button, Flex, Image, Modal, Popconfirm, Spin, Switch, Table } from "antd";
import { Edit, Trash } from "iconsax-react";
import { useCallback, useEffect, useState } from "react";
import { Card, CardBody, Col, Container } from "reactstrap";
import Delete from "../../Api/Delete";
import { Url_Keys } from "../../Constant";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import CommonCardHeader from "../../CoreComponents/CommonCardHeader";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchLectureApiData, setLectureModal, setSingleEditingIdLecture } from "../../ReduxToolkit/Slice/LectureSlice";
import LectureModel from "./LectureModel";
import "@ant-design/v5-patch-for-react-19";

const Lecture = () => {
  const [isSearch, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const dispatch = useAppDispatch();
  const { allLecture, isLoadingLecture } = useAppSelector((state) => state.lecture);

  const getAllLecture = useCallback(async () => {
    try {
      await dispatch(fetchLectureApiData({ page, limit: pageLimit, search: isSearch }));
    } catch (error) {}
  }, [dispatch, isSearch, page, pageLimit]);

  useEffect(() => {
    getAllLecture();
  }, [getAllLecture]);

  const handleDelete = async (record: any) => {
    try {
      await Delete(`${Url_Keys.Lecture.Delete}/${record?._id}`);
      getAllLecture();
    } catch (error) {}
  };

  const AddLectureModalClick = () => dispatch(setLectureModal());

  const handleEdit = (item: any) => {
    dispatch(setSingleEditingIdLecture(item?._id));
    AddLectureModalClick();
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
      render: (url: string) => (url ? <Image src={url} width={60} height={60} alt="Lecture" fallback="/placeholder.png" /> : <span className="text-muted">No Image</span>),
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
      title: "Category",
      dataIndex: "categoryType",
      key: "categoryType",
      render: (text: string) => text || "-",
      width: 150,
    },
    {
      title: "Feature",
      dataIndex: "feature",
      key: "feature",
      render: (feature: boolean) => <Switch checked={feature} disabled className="switch-xsm" />,
      width: 50,
    },
    {
      title: "Active",
      dataIndex: "action",
      key: "action",
      render: (active: boolean) => <Switch checked={active} disabled className="switch-xsm" />,
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
      <Breadcrumbs mainTitle="Lecture" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CommonCardHeader Search={(e) => setSearch(e)} searchClass="col-md-10 col-sm-7" btnTitle="Add Lecture" btnClick={AddLectureModalClick} />
            <CardBody>
              {isLoadingLecture ? (
                <div className="text-center py-5">
                  <Spin size="large" />
                </div>
              ) : (
                <Table
                  className="custom-table"
                  dataSource={Array.isArray(allLecture?.lecture_data) ? allLecture.lecture_data : []}
                  columns={columns}
                  rowKey="_id"
                  scroll={{ x: "max-content" }}
                  pagination={{
                    current: page,
                    pageSize: pageLimit,
                    total: allLecture?.totalData || 0,
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
      <LectureModel getApi={getAllLecture} />
    </>
  );
};

export default Lecture;
