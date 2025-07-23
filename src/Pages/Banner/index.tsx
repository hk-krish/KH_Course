import { Flex, Image, Popconfirm, Spin, Switch, Table } from "antd";
import { useCallback, useEffect } from "react";
import Delete from "../../Api/Delete";
import { Url_Keys } from "../../Constant";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchBannerApiData, setBannerModal, setSingleEditingIdBanner } from "../../ReduxToolkit/Slice/BannerSlice";
import BannerModel from "./BannerModel";

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

    const handleEdit = (item: any) => {
    dispatch(setSingleEditingIdBanner(item?._id));
    // setEdit(true.);
    dispatch(setBannerModal())
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
      render: (active: boolean) => <Switch checked={active} disabled className="switch-xsm"/>,
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="title-header option-title d-sm-flex d-block justify-content-between align-items-center">
                  <h5>Banner</h5>
                  <div className="right-options">
                    <div className="d-flex gap-2">
                      <input type="search" placeholder="Search..." aria-controls="table_id" className="form-control" />
                      <button className="btn btn-dashed" onClick={() => dispatch(setBannerModal())}>
                        Add Product
                      </button>
                    </div>
                  </div>
                </div>

                {isLoadingBanner ? (
                  <div className="text-center py-5">
                    <Spin size="large" />
                  </div>
                ) : (
                  <Table className="custom-banner-table" dataSource={Array.isArray(allBanner?.banner_data) ? allBanner.banner_data : []} columns={columns} rowKey="_id" pagination={{ pageSize: 10 }} scroll={{ x: "max-content" }} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BannerModel />
    </>
  );
};

export default Banner;
