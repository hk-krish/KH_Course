import { Button, Flex, Image, Modal, Spin, Switch, Table } from "antd";
import { Edit, Trash } from "iconsax-react";
import { useCallback, useEffect, useState } from "react";
import { Card, CardBody, Col, Container } from "reactstrap";
import Delete from "../../Api/Delete";
import { Url_Keys } from "../../Constant";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import CommonCardHeader from "../../CoreComponents/CommonCardHeader";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchBannerApiData, setBannerModal, setSingleEditingIdBanner } from "../../ReduxToolkit/Slice/BannerSlice";
import BannerModel from "./BannerModel";
import { Post } from "../../Api";
import "@ant-design/v5-patch-for-react-19";

const Banner = () => {
  const [isEdit, setEdit] = useState(false);
  const [isSearch, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const dispatch = useAppDispatch();
  const { allBanner, isLoadingBanner } = useAppSelector((state) => state.banner);

  const getAllBanner = useCallback(() => {
    dispatch(fetchBannerApiData({ page, limit: pageLimit, search: isSearch }));
  }, [dispatch, isSearch, page, pageLimit]);

  useEffect(() => {
    getAllBanner();
  }, [getAllBanner]);

  const handleDelete = async (record: any) => {
    try {
      await Delete(`${Url_Keys.Banner.Delete}/${record?._id}`);
      getAllBanner();
    } catch (error) {}
  };

  const AddBannerModalClick = () => dispatch(setBannerModal());

  const handleEdit = (item: any) => {
    dispatch(setSingleEditingIdBanner(item?._id));
    dispatch(setBannerModal());
    setEdit(true);
  };

  const handleActive = async (active: boolean, record: any) => {
    try {
      const response = await Post(Url_Keys.Banner.Edit, { id: record?._id, action: active });
      if (response?.status === 200) getAllBanner();
    } catch (error) {}
  };

  const columns = [
    {
      title: "ID",
      key: "index",
      render: (_: any, __: any, index: number) => (page - 1) * pageLimit + index + 1,
      width: 80,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url: string) => (url ? <Image src={url} width={60} height={60} alt="banner" fallback="/placeholder.png" /> : <span className="text-muted">No Image</span>),
      width: 100,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => text || "-",
      width: 150,
    },
    {
      title: "YouTube",
      dataIndex: "youtubeLink",
      key: "youtubeLink",
      render: (link: string) =>
        link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        ) : (
          "-"
        ),
      width: 200,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.action === value,
      // sorter: (a: any, b: any) => Number(a.action) - Number(b.action),
      render: (active: boolean, record: any) => <Switch checked={active} className="switch-xsm" onChange={(checked) => handleActive(checked, record)} />,
      width: 100,
    },
    {
      title: "Option",
      key: "actionIcons",
      width: 120,
      render: (_: any, record: any) => (
        <Flex gap="middle" justify="center">
          <Button type="text" onClick={() => handleEdit(record)} title="Edit" className="m-1 p-1 btn btn-primary">
            <Edit className="action" />
          </Button>
          <Button
            type="text"
            danger
            className="m-1 p-1 btn btn-danger"
            onClick={() => {
              Modal.confirm({
                title: "Are you sure?",
                content: `Do you really want to delete "${record.title}"?`,
                okText: "Yes, Delete",
                cancelText: "Cancel",
                onOk: () => handleDelete(record),
              });
            }}
            title="Delete"
          >
            <Trash className="action" />
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Breadcrumbs mainTitle="Banners" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CommonCardHeader Search={(e) => setSearch(e)} searchClass="col-md-10 col-sm-7" btnTitle="Add Banners" btnClick={AddBannerModalClick} />
            <CardBody>
              {isLoadingBanner ? (
                <div className="text-center py-5">
                  <Spin size="large" />
                </div>
              ) : (
                <Table
                  className="custom-table"
                  dataSource={Array.isArray(allBanner?.banner_data) ? allBanner.banner_data : []}
                  columns={columns}
                  rowKey={(record) => record._id || record.id || record.title}
                  scroll={{ x: "max-content" }}
                  pagination={{
                    current: page,
                    pageSize: pageLimit,
                    total: allBanner?.totalData || 0,
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
      <BannerModel getApi={getAllBanner} isEdit={isEdit} setEdit={setEdit}/>
    </>
  );
};

export default Banner;
