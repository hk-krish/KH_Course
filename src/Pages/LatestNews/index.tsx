import { Empty, Pagination, Spin } from "antd";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Delete from "../../Api/Delete";
import { Href, Url_Keys } from "../../Constant";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import CommonCardHeader from "../../CoreComponents/CommonCardHeader";
import { Image } from "../../CoreComponents/Image";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchLatestNewsApiData, setLatestNewsModal, setSingleEditingIdLatestNews } from "../../ReduxToolkit/Slice/LatestNewsSlice";
import { dynamicImage } from "../../Utils";
import LatestNewsModel from "./LatestNewsModel";

const LatestNews = () => {
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [isSearch, setSearch] = useState("");
  const [isEdit, setEdit] = useState(false);

  const { allLatestNews, isLoadingLatestNews } = useAppSelector((state) => state.latestNews);

  const dispatch = useAppDispatch();

  const getAllLatestNews = useCallback(async () => {
    try {
      await dispatch(fetchLatestNewsApiData({ page: page, limit: pageLimit, search: isSearch }));
    } catch (error) {}
  }, [dispatch, page, pageLimit, isSearch]);

  useEffect(() => {
    getAllLatestNews();
  }, [getAllLatestNews]);

  const AddLatestNewsModalClick = () => dispatch(setLatestNewsModal());

  const DeleteLatestNews = async (id: string) => {
    try {
      await Delete(`${Url_Keys.LatestNews.Delete}/${id}`);
      getAllLatestNews();
    } catch (error) {}
  };

  const EditItem = (id: string) => {
    dispatch(setSingleEditingIdLatestNews(id));
    setEdit(true);
    AddLatestNewsModalClick();
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle="LatestNews" parent="Pages" />
      <Container fluid>
        <Col sx="12">
          <Card>
            <CommonCardHeader searchClass="col-md-10 col-sm-7" Search={(e) => setSearch(e)} btnTitle="Add LatestNews" btnClick={AddLatestNewsModalClick} />
            <CardBody>
              <div className="blog-boxes">
                {isLoadingLatestNews ? (
                  <div className="text-center py-5">
                    <Spin size="large" />
                  </div>
                ) : allLatestNews?.totalData !== 0 ? (
                  <Fragment>
                    <Row className="g-4 mb-4">
                      {allLatestNews?.latestNews_data?.map((item, index) => (
                        <Col xs="12" sm="6" lg="4" xl="3" key={index}>
                          <div className="blog-box list-box">
                            <div className="blog-image">
                              <Image src={item?.image ? item?.image : dynamicImage(`product/compare-1.jpg`)} alt={`product-${index}`} className="img-fluid w-100" />
                              <div className="product-hover">
                                <ul>
                                  <li onClick={() => DeleteLatestNews(item?._id)}>
                                    <Link to={Href} color="transparent">
                                      <i className="icon icon-trash" />
                                    </Link>
                                  </li>
                                  <li onClick={() => EditItem(item?._id)}>
                                    <Link to={Href} color="transparent">
                                      <i className="icon icon-pen" />
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="blog-details border-0">
                              <h6 className="mt-0">{item?.subtitle}</h6>
                              <Link to={Href}>
                                <h5>{item?.title}</h5>
                              </Link>
                              {/* <p>{item?.description}</p> */}
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                    <Pagination
                      align="end"
                      current={page}
                      pageSize={pageLimit}
                      total={allLatestNews?.totalData || 0}
                      showSizeChanger={true}
                      onChange={(newPage, newPageSize) => {
                        setPage(newPage);
                        setPageLimit(newPageSize);
                      }}
                    />
                  </Fragment>
                ) : (
                  <div className="text-center py-5">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Container>
      <LatestNewsModel getApi={getAllLatestNews} isEdit={isEdit} setEdit={setEdit} />
    </Fragment>
  );
};

export default LatestNews;
