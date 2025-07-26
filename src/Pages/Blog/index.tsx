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
import { fetchBlogApiData, setBlogModal, setSingleEditingIdBlog } from "../../ReduxToolkit/Slice/BlogSlice";
import { dynamicImage } from "../../Utils";
import BlogModel from "./BlogModel";

const Blog = () => {
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [isSearch, setSearch] = useState("");
  const [isEdit, setEdit] = useState(false);

  const { allBlog, isLoadingBlog } = useAppSelector((state) => state.blog);

  const dispatch = useAppDispatch();

  const getAllBlog = useCallback(async () => {
    try {
      await dispatch(fetchBlogApiData({ page: page, limit: pageLimit, search: isSearch }));
    } catch (error) {}
  }, [dispatch, page, pageLimit, isSearch]);

  useEffect(() => {
    getAllBlog();
  }, [getAllBlog]);

  const AddBlogModalClick = () => dispatch(setBlogModal());

  const DeleteBlog = async (id: string) => {
    try {
      await Delete(`${Url_Keys.Blog.Delete}/${id}`);
      getAllBlog();
    } catch (error) {}
  };

  const EditItem = (id: string) => {
    dispatch(setSingleEditingIdBlog(id));
    setEdit(true);
    AddBlogModalClick();
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Blog" parent="Pages" />
      <Container fluid>
        <Col sx="12">
          <Card>
            <CommonCardHeader searchClass="col-md-10 col-sm-7" Search={(e) => setSearch(e)} btnTitle="Add Blog" btnClick={AddBlogModalClick} />
            <CardBody>
              <div className="blog-boxes">
                {isLoadingBlog ? (
                  <div className="text-center py-5">
                    <Spin size="large" />
                  </div>
                ) : allBlog?.totalData !== 0 ? (
                  <Fragment>
                    <Row className="g-4 mb-4">
                      {allBlog?.blog_data?.map((item, index) => (
                        <Col xs="12" sm="6" lg="4" xl="3" key={index}>
                          <div className="blog-box list-box">
                            <div className="blog-image">
                              <Image src={item?.image ? item?.image : dynamicImage(`product/compare-1.jpg`)} alt={`product-${index}`} className="img-fluid w-100" />
                              <div className="product-hover">
                                <ul>
                                  <li onClick={() => DeleteBlog(item?._id)}>
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
                      total={allBlog?.totalData || 0}
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
      <BlogModel getApi={getAllBlog} isEdit={isEdit} setEdit={setEdit} />
    </Fragment>
  );
};

export default Blog;
