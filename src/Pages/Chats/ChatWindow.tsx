import { Dropdown, Empty, Typography } from "antd";
import { ArrowDown2 } from "iconsax-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import { Button, Card, Col, Form } from "reactstrap";
import { Post } from "../../Api";
import Delete from "../../Api/Delete";
import { Href, Url_Keys } from "../../Constant";
import { Image } from "../../CoreComponents/Image";
import SvgIcon from "../../CoreComponents/SvgIcon";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchChatApiData, setSelectUser } from "../../ReduxToolkit/Slice/ChatSlice";
import { Chat } from "../../Types/Chat";
import { dynamicImage } from "../../Utils";
import { FormatTime } from "../../Utils/DateFormatted";
import { fetchStudentsApiData } from "../../ReduxToolkit/Slice/StudentsSlice";

const ChatWindow = () => {
  const [messageInput, setMessageInput] = useState("");
  const [editChatId, setEditChatId] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { allChat, selectedUser } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.auth);

  const getAllStudents = useCallback(async () => {
    try {
      await dispatch(fetchStudentsApiData({ blockFilter: "unblock"}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  const getAllChat = useCallback(async () => {
    try {
      await dispatch(fetchChatApiData({ senderId: user?.user?._id, receiverId: selectedUser?._id }));
    } catch (error) {}
  }, [dispatch, selectedUser?._id, user?.user?._id]);

  useEffect(() => {
    if (user?.user?._id && selectedUser?._id) getAllChat();
  }, [getAllChat, selectedUser?._id, user?.user?._id]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [allChat]);

  const handleMessagePress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = messageInput.trim();
    if (trimmedMessage.length === 0) return;

    try {
      if (editChatId) {
        const payload = { id: editChatId, message: trimmedMessage };
        const response = await Post(Url_Keys.Chat.Edit, payload);
        if (response?.status === 200) {
          setEditChatId(null);
          setMessageInput("");
          getAllChat();
        }
      } else {
        const addMessage = {
          senderId: user?.user?._id,
          receiverId: selectedUser?._id,
          message: trimmedMessage,
        };
        const response = await Post(Url_Keys.Chat.Send, addMessage);
        if (response?.status === 200) {
          setMessageInput("");
          getAllChat();
        }
      }
    } catch (error) {}
  };

  const handleChatDelete = async (id: string) => {
    try {
      await Delete(`${Url_Keys.Chat.Delete}/${id}`);
      getAllChat();
    } catch (error) {}
  };

  const handleChatEdit = async (item: Chat) => {
    try {
      setMessageInput(item?.message);
      setEditChatId(item._id);
    } catch (error) {}
  };

  const handleAllChatDelete = async () => {
    await Delete(Url_Keys.Chat.Delete, { senderId: user?.user?._id, receiverId: selectedUser?._id });
    getAllChat();
  };

  const handleBlockStudent = async () => {
    try {
      const response = await Post(Url_Keys.Students.Edit, { id: selectedUser?._id, isBlocked: true });
      if (response?.status === 200) {
        getAllStudents();
        dispatch(setSelectUser(null));
      }
    } catch (error) {}
  };

  return (
    <Col xxl="9" xl="8" md="7" className="box-col-7">
      <Card className="right-sidebar-chat">
        {selectedUser ? (
          <>
            <div className="right-sidebar-title">
              <div className="common-space">
                <div className="chat-time">
                  <div className="active-profile">
                    <Image className="img-fluid rounded-circle" src={`${selectedUser?.image ? `${selectedUser?.image}` : dynamicImage(`user/user.png`)}`} alt="user" />
                  </div>
                  <div>
                    <span>{selectedUser?.firstName ? `${selectedUser?.firstName} ${selectedUser?.lastName}` : "Students"}</span>
                    <p>{selectedUser?.phoneNumber}</p>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "1",
                          label: (
                            <a href={Href} onClick={() => handleBlockStudent()}>
                              Block Student
                            </a>
                          ),
                        },
                        {
                          key: "2",
                          label: (
                            <a href={Href} onClick={() => handleAllChatDelete()}>
                              Delete All Chat
                            </a>
                          ),
                        },
                      ],
                    }}
                    trigger={["click"]}
                  >
                    <div className="contact-edit chat-alert bg-light-primary">
                      <SvgIcon iconId="menubar" />
                    </div>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="right-sidebar-Chats">
              <div className="msger px-2 pb-2">
                <div className="msger-chat" ref={chatContainerRef}>
                  {allChat && allChat.allChats.length > 0 ? (
                    allChat.allChats.map((item, id) => {
                      const isCurrentUser = selectedUser?._id === item?.senderId?._id;
                      return (
                        <div className={`msg ${isCurrentUser ? "right" : "pull-right left"}-msg`} key={item._id}>
                          <div className="msg-bubble mx-2">
                            <div className="msg-info mb-0 d-flex justify-content-between align-items-center">
                              <div className="msg-info-name">{item.message}</div>
                              {!isCurrentUser && (
                                <Dropdown
                                  menu={{
                                    items: [
                                      {
                                        key: "1",
                                        label: (
                                          <a href={Href} onClick={() => handleChatEdit(item)}>
                                            Edit Message
                                          </a>
                                        ),
                                      },
                                      {
                                        key: "2",
                                        label: (
                                          <a href={Href} onClick={() => handleChatDelete(item?._id)}>
                                            Delete Chat
                                          </a>
                                        ),
                                      },
                                    ],
                                  }}
                                  trigger={["click"]}
                                >
                                  <div className="msg-hover">
                                    <ArrowDown2 size="20" color="#000000ff" />
                                  </div>
                                </Dropdown>
                              )}
                            </div>
                            <div className="msg-info-time text-end">
                              {FormatTime(item.createdAt)}
                              <IoCheckmarkDone size={18} color={item.seen ? "#cca270" : "#000000ff"} className="ms-2" />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="d-flex justify-content-center align-items-center py-5">
                      <Empty description={<Typography.Text type="secondary">Start a conversation</Typography.Text>} />
                    </div>
                  )}
                </div>

                <Form className="msger-inputarea" onSubmit={handleMessagePress}>
                  <input className="msger-input" type="text" placeholder="Type Message here.." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                  <Button color="primary" className="msger-send-btn" type="submit" aria-label="Send message">
                    <i className="fa fa-location-arrow" aria-hidden="true" />
                  </Button>
                </Form>
              </div>
            </div>
          </>
        ) : (
          <div className="no-user-selected d-flex justify-content-center align-items-center py-5">
            <Empty description={<Typography.Text type="secondary">No user selected</Typography.Text>} />
          </div>
        )}
      </Card>
    </Col>
  );
};

export default ChatWindow;
