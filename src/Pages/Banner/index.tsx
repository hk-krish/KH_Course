import { Flex, Image, Popconfirm, Spin, Switch, Table } from "antd";
import { useCallback, useEffect } from "react";
import Delete from "../../Api/Delete";
import { Url_Keys } from "../../Constant";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchBannerApiData, setBannerModal, setSingleEditingIdBanner } from "../../ReduxToolkit/Slice/BannerSlice";
import BannerModel from "./BannerModel";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import { Card, CardBody, Col, Container } from "reactstrap";
import CommonCardHeader from "../../CoreComponents/CommonCardHeader";

const Banner = () => {
  const dispatch = useAppDispatch();
  const { allBanner, isLoadingBanner } = useAppSelector((state) => state.banner);

  const getAllBanner = useCallback(async () => {
    try {
      await dispatch(fetchBannerApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllBanner();
  }, [getAllBanner]);

  const handleDelete = async (record: any) => {
    try {
      await Delete(`${Url_Keys.Banner.Delete}/${record?._id}`);
      getAllBanner();
    } catch (error) {}
  };

  const setSearchData = (e: string) => {};
  const AddBannerModalClick = () => dispatch(setBannerModal());


  const handleEdit = (item: any) => {
    dispatch(setSingleEditingIdBanner(item?._id));
    // setEdit(true.);
    dispatch(setBannerModal());
  };

  const columns = [
    {
      title: "ID",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
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
      title: "Active",
      dataIndex: "action",
      key: "action",
      render: (active: boolean) => <Switch checked={active} disabled className="switch-xsm" />,
      width: 100,
    },
    {
      title: "Option",
      key: "actionIcons",
      width: 120,
      render: (_: any, record: any) => (
        <Flex gap="middle" justify="center">
          <i className="ri-pencil-line edit-icon" onClick={() => handleEdit(record)} />
          <Popconfirm title="Are you sure to delete this banner?" onConfirm={() => handleDelete(record)} okText="Yes" cancelText="No">
            <i className="ri-delete-bin-line remove-icon" />
          </Popconfirm>
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
            <CommonCardHeader Search={setSearchData} searchClass="col-md-10 col-sm-7" btnTitle="Add Banners" btnClick={AddBannerModalClick} />
            <CardBody>
               {isLoadingBanner ? (
                  <div className="text-center py-5">
                    <Spin size="large" />
                  </div>
                ) : (
                  <Table className="custom-banner-table" dataSource={Array.isArray(allBanner?.banner_data) ? allBanner.banner_data : []} columns={columns} rowKey="_id" pagination={{ pageSize: 10 }} scroll={{ x: "max-content" }} />
                )}
            </CardBody>
          </Card>
        </Col>
      </Container>
      <BannerModel />
    </>
  );
};

export default Banner;
