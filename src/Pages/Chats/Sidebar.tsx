import React from "react";
import { Search } from "react-feather";
import { Card, Col, Input, InputGroup, InputGroupText } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { setSelectUser } from "../../ReduxToolkit/Slice/ChatSlice";
import { Image } from "../../CoreComponents/Image";
import { dynamicImage } from "../../Utils";

const Sidebar = () => {
  const { allStudents } = useAppSelector((state) => state.students);
  const { user } = useAppSelector((state) => state.auth);
  const { selectedUser } = useAppSelector((state) => state.chat);

  const dispatch = useAppDispatch();
  const changeUserClick = (selectUser: any) => {
    dispatch(setSelectUser(selectUser));
  };
  return (
    <Col xxl="3" xl="4" md="5" className="box-col-5">
      <Card className="left-sidebar-wrapper">
        <div className="left-sidebar-chat">
          <InputGroup>
            <InputGroupText>
              <Search className="search-icon text-gray" />
            </InputGroupText>
            <Input type="text" placeholder="Search here.." />
          </InputGroup>
        </div>
        <div className="advance-options">
          <div className="common-space">
            <p>RecentChats</p>
            {/* <div className="header-top">
                    <Link className="badge-light-primary f-w-500 btn" to={Href}>
                      <i className="fa fa-plus" />
                    </Link>
                  </div> */}
          </div>
          {allStudents && allStudents.totalData > 0 ? (
            <ul className="chats-user custom-scrollbar">
              {allStudents?.user_data
                .filter((x: any) => x._id !== user?.user?._id)
                .map((item: any, id: number) => (
                  <li className={`common-space ${selectedUser?._id === item.id ? "active" : ""}`} key={id} onClick={() => changeUserClick(item)}>
                    <div className="chat-time">
                      <div className="active-profile">
                        <Image className="img-fluid rounded-circle" src={item?.image ? item?.image : dynamicImage(`user/user.png`)} alt="user" />
                        {/* <div className={`status bg-${item.online}`} /> */}
                      </div>
                      <div>
                        <span>{item.firstName} {item.lastName}</span>
                        {/* <p>{item.status}</p> */}
                      </div>
                    </div>
                    <div>
                      {/* <p>{item.time} </p> */}
                      {/* {item.badge && <Badge color="success">{item.badge}</Badge>} */}
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <>{/* <SearchNotFoundClass word="Contact" /> */}</>
          )}
        </div>
      </Card>
    </Col>
  );
};

export default Sidebar;
