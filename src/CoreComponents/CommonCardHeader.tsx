import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, CardHeader, Col, Form, Input, Row } from "reactstrap";
import { Href } from "../Constant";
import { CardHeaderProp } from "../Types/CoreComponents";

const CommonCardHeader: FC<CardHeaderProp> = ({ title, headClass,rowClass, tagClass, setIsEditing, isEditing, Search, searchClass, btnTitle, btnClick, btnLink, typeFilter, typeFilterData }) => {
  return (
    <CardHeader className={`card-header-box ${headClass ? headClass : "pb-0"}`}>
      <Form>
        <Row className={rowClass}>
          {title && (
            <Col md="10" sm="7" xs="12" className="d-flex align-items-center">
              <h4 className={tagClass ? tagClass : ""}>{title}</h4>
            </Col>
          )}
          {Search && (
            <Col xs="12" className={searchClass}>
              <div className="form-group">
                <Input type="text" placeholder="Search" onChange={(e) => Search?.(e.target.value)} />
                <i className="fa fa-search"></i>
              </div>
            </Col>
          )}
          {typeFilter && (
            <Col md="2" sm="7" xs="12">
              <div className="form-group m-0">
                <select className="form-select" onChange={(e) => typeFilter(e.target.value)}>
                  <option value="">-- Select Type --</option>
                  {typeFilterData?.map((link, index) => (
                    <option value={link?.value} key={index}>
                      {link?.label}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
          )}
          {setIsEditing && (
            <Col md="2" sm="5" xs="12">
              <div className="form-group m-0">
                <Button color="primary" className="w-100 mt-2 mt-sm-0" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
            </Col>
          )}
          {btnClick && (
            <Col md="2" sm="5" xs="12">
              <div className="form-group">
                <Button color="primary" className="w-100" onClick={() => btnClick()}>
                  {btnTitle}
                </Button>
              </div>
            </Col>
          )}
          {btnLink && (
            <Col md="2" sm="5" xs="12">
              <div className="form-group">
                <Link to={btnLink || Href}>
                  <Button color="primary" className="w-100">
                    {btnTitle}
                  </Button>
                </Link>
              </div>
            </Col>
          )}
        </Row>
      </Form>
    </CardHeader>
  );
};

export default CommonCardHeader;
