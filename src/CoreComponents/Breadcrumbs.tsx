import { Home3 } from "iconsax-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from "reactstrap";
import { RouteList } from "../Constant";
import { BreadcrumbsProps } from "../Types/CoreComponents";

const Breadcrumbs: FC<BreadcrumbsProps> = ({ mainTitle, parent }) => {
  return (
    <Container fluid>
      <div className="page-title">
        <Row>
          <Col xl="7" sm="7" className="box-col-3">
            <h3>{mainTitle}</h3>
          </Col>
          <Col xl="5" sm="5" className="box-col-4">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to={RouteList.Dashboard}>
                  <Home3 />
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>{parent}</BreadcrumbItem>
              <BreadcrumbItem active>{mainTitle}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Breadcrumbs;
