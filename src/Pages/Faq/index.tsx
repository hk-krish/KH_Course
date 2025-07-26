import { Add, Edit, Minus, Trash } from "iconsax-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Collapse, Container, Row } from "reactstrap";
import AddSalesmanModal from "./AddFaqModal";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchFaqApiData, setAddFaqModal, setFaqSearchData, setSingleEditingFaq } from "../../ReduxToolkit/Slice/FaqSlice";
import Delete from "../../Api/Delete";
import { Url_Keys } from "../../Constant";
import { FaqType } from "../../Types/Faq";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import CommonCardHeader from "../../CoreComponents/CommonCardHeader";
import { Empty, Skeleton } from "antd";
import { dynamicNumber } from "../../Utils";

const Faq = () => {
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [isEdit, setEdit] = useState(false);

  const dispatch = useAppDispatch();
  const { allFaq, isFaqSearchData, isLoadingFaq } = useAppSelector((state) => state.faq);

  const handleChange = (id: string) => setActiveFaqId((prev) => (prev === id ? null : id));
  const AddFaqModalClick = () => dispatch(setAddFaqModal());
  const setSearchData = (e: string) => dispatch(setFaqSearchData(e));

  const DeleteFaq = async (id: string) => {
    try {
      await Delete(`${Url_Keys.Faq.Delete}/${id}`);
      getAllFaq();
    } catch (error) {}
  };
  const EditFaq = (item: FaqType) => {
    dispatch(setSingleEditingFaq(item));
    setEdit(true);
    AddFaqModalClick();
  };

  const getAllFaq = useCallback(async () => {
    try {
      await dispatch(fetchFaqApiData({ search: isFaqSearchData }));
    } catch (error) {}
  }, [dispatch, isFaqSearchData]);

  useEffect(() => {
    getAllFaq();
  }, [getAllFaq]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="FAQ" parent="Pages" />
      <Container fluid>
        <Col md="12">
          <Card>
            <CommonCardHeader searchClass="col-md-10 col-sm-7" Search={setSearchData} btnTitle="Add Faq" btnClick={AddFaqModalClick} />
            <CardBody>
              <div className="default-according style-1">
                <Col xl="12" className="input-items">
                  {isLoadingFaq ? (
                    <Row>
                      {dynamicNumber(5).map((_, index) => (
                        <Card key={index}>
                          <CardHeader className="py-2">
                            <Skeleton.Input active={true} size="small" block={true} key={index} />
                          </CardHeader>
                        </Card>
                      ))}
                    </Row>
                  ) : allFaq?.totalData !== 0 ? (
                    <Fragment>
                      {allFaq?.faq_data?.map((item, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <h2 className="mb-0">
                              <Button color="transparent" className="btn-link collapsed justify-content-between" onClick={() => handleChange(item._id)}>
                                <span className="d-flex align-items-center justify-content-between gap-2">
                                  {item.question}
                                  <div className="d-flex align-items-center">
                                    <div className="faq-hover">
                                      <Trash size="22" onClick={() => DeleteFaq(item?._id)} />
                                      <Edit size="22" onClick={() => EditFaq(item)} />
                                    </div>
                                    {activeFaqId === item._id ? <Minus size="20" /> : <Add size="20" />}
                                  </div>
                                </span>
                              </Button>
                            </h2>
                          </CardHeader>
                          <Collapse isOpen={activeFaqId === item._id}>
                            <CardBody>{item.answer}</CardBody>
                          </Collapse>
                        </Card>
                      ))}
                    </Fragment>
                  ) : (
                    <div className="text-center py-5">
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                  )}
                  <AddSalesmanModal isEdit={isEdit} setEdit={setEdit} getAllFaq={getAllFaq} />
                </Col>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </Fragment>
  );
};

export default Faq;
