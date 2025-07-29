import { Fragment, useCallback, useEffect } from "react";
import { Container, Row } from "reactstrap";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import { useAppDispatch } from "../../ReduxToolkit/Hooks";
import { fetchStudentsApiData } from "../../ReduxToolkit/Slice/StudentsSlice";
import ChatWindow from "./ChatWindow";
import Sidebar from "./Sidebar";

const Chats = () => {
  // const dispatch = useAppDispatch();

  // const getAllStudents = useCallback(async () => {
  //   try {
  //     await dispatch(fetchStudentsApiData({ blockFilter: "unblock" ,role:"user"}));
  //   } catch (error) {}
  // }, [dispatch]);

  // useEffect(() => {
  //   getAllStudents();
  // }, [getAllStudents]);

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Chats" parent="Pages" />
      <Container fluid>
        <Row className="g-0">
          <Sidebar />
          <ChatWindow />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Chats;
