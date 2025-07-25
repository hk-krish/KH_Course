import "@ant-design/v5-patch-for-react-19";
import { useCallback, useEffect } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import CommonCardHeader from "../../CoreComponents/CommonCardHeader";
import { Image } from "../../CoreComponents/Image";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchCourseApiData } from "../../ReduxToolkit/Slice/CourseSlice";
import { dynamicImage } from "../../Utils";
import { Empty, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { RouteList } from "../../Constant";
import { setSingleCourseId } from "../../ReduxToolkit/Slice/LectureSlice";

const Lecture = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { allCourse, isLoadingCourse } = useAppSelector((state) => state.course);

  const getAllCourse = useCallback(async () => {
    try {
      await dispatch(fetchCourseApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllCourse();
  }, [getAllCourse]);

  const handleAddLecture = (id:string) => {
    navigate(RouteList.Lecture.CourseLecture);
    dispatch(setSingleCourseId(id))
  };

  return (
    <>
      <Breadcrumbs mainTitle="Lecture" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CommonCardHeader title="All Course" />
            <CardBody>
              {isLoadingCourse ? (
                <div className="text-center py-5">
                  <Spin size="large" />
                </div>
              ) : (
                <Row className="gridRow lecture-box">
                  {allCourse?.totalData !== 0 ? (
                    allCourse?.course_data?.map((item, index) => (
                      <Col xl="3" md="4" sm="6" id="gridId" key={index} onClick={() => handleAddLecture(item?._id)}>
                        <Card>
                          <CardBody>
                            <div className="d-flex align-items-center flex-wrap">
                              <div className="media-size-email">
                                <Image className="me-3  b-r-6 img-60 media" src={item?.image ? item?.image : dynamicImage(`user/user.png`)} alt="avatar" />
                              </div>
                              <div className="flex-grow-1">
                                <h3>{item.name}</h3>
                                <p>{"Markjecno@gmail.com"}</p>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <div className="text-center py-5">
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                  )}
                </Row>
              )}
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Lecture;
