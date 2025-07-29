// ChatWindow.tsx
import { Dropdown, Empty, Typography } from "antd";
import { ArrowDown2 } from "iconsax-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import { Button, Card, Col, Form } from "reactstrap";
import { Post } from "../../Api";
import { Href, Url_Keys } from "../../Constant";
import { Image } from "../../CoreComponents/Image";
import SvgIcon from "../../CoreComponents/SvgIcon";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { fetchChatApiData, setSelectUser } from "../../ReduxToolkit/Slice/ChatSlice";
import { Chat } from "../../Types/Chat";
import { dynamicImage } from "../../Utils";
import { FormatTime } from "../../Utils/DateFormatted";
import { fetchStudentsApiData } from "../../ReduxToolkit/Slice/StudentsSlice";
import socket from "../../socket";

const ChatWindow = () => {
  const [messageInput, setMessageInput] = useState("");
  const [editChatId, setEditChatId] = useState<string | null>(null);
  const [chatList, setChatList] = useState<Chat[]>([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { allChat, selectedUser } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.user?._id;

  // Join socket room & handle events
  useEffect(() => {
    if (!userId) return;

    if (!socket.connected) socket.connect();
    socket.emit("join", userId);

    socket.on("receive_message", (msg: Chat) => {
      setChatList((prev) => [...prev, msg]);
    });

    socket.on("message_updated", (updated: Chat) => {
      setChatList((prev) => prev.map((msg) => (msg._id === updated._id ? updated : msg)));
    });

    socket.on("message_deleted", ({ messageId }) => {
      setChatList((prev) => prev.filter((msg) => msg._id !== messageId));
    });

    socket.on("conversation_deleted", ({ receiverId }) => {
      if (receiverId === selectedUser?._id) setChatList([]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("message_updated");
      socket.off("message_deleted");
      socket.off("conversation_deleted");
    };
  }, [userId, selectedUser?._id]);

  useEffect(() => {
    if (allChat?.allChats) setChatList(allChat.allChats);
  }, [allChat]);

  const getAllStudents = useCallback(() => {
    dispatch(fetchStudentsApiData({ blockFilter: "unblock" }));
  }, [dispatch]);

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  const getAllChat = useCallback(() => {
    if (userId && selectedUser?._id) {
      dispatch(fetchChatApiData({ senderId: userId, receiverId: selectedUser._id }));
    }
  }, [dispatch, userId, selectedUser?._id]);

  useEffect(() => {
    getAllChat();
  }, [getAllChat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatList]);

  const handleMessagePress = (e: FormEvent) => {
    e.preventDefault();
    const msg = messageInput.trim();
    if (!msg || !userId || !selectedUser?._id) return;

    if (editChatId) {
      socket.emit("edit_message", { messageId: editChatId, newMessage: msg });
      setEditChatId(null);
    } else {
      socket.emit("send_message", {
        senderId: userId,
        receiverId: selectedUser._id,
        message: msg,
      });
    }
    getAllChat();
    setMessageInput("");
  };

  const handleChatEdit = (msg: Chat) => {
    setMessageInput(msg.message);
    setEditChatId(msg._id);
  };

  const handleChatDelete = (id: string) => {
    socket.emit("delete_message", { messageId: id });
    getAllChat();
  };

  const handleAllChatDelete = () => {
    socket.emit("delete_conversation", {
      senderId: userId,
      receiverId: selectedUser?._id,
    });
    getAllChat();
  };

  const handleBlockStudent = async () => {
    const res = await Post(Url_Keys.Students.Edit, {
      id: selectedUser?._id,
      isBlocked: true,
    });
    if (res?.status === 200) {
      getAllStudents();
      dispatch(setSelectUser(null));
    }
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
                    <Image className="img-fluid rounded-circle" src={selectedUser.image || dynamicImage("user/user.png")} alt="user" />
                  </div>
                  <div>
                    <span>
                      {selectedUser.firstName} {selectedUser.lastName}
                    </span>
                    <p>{selectedUser.phoneNumber}</p>
                  </div>
                </div>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: (
                          <a href={Href} onClick={handleBlockStudent}>
                            Block Student
                          </a>
                        ),
                      },
                      {
                        key: "2",
                        label: (
                          <a href={Href} onClick={handleAllChatDelete}>
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

            <div className="right-sidebar-Chats">
              <div className="msger px-2 pb-2">
                <div className="msger-chat" ref={chatContainerRef}>
                  {chatList.length > 0 ? (
                    chatList.map((item) => {
                      const isCurrentUser = selectedUser?._id === item?.senderId?._id;
                      return (
                        <div key={item._id} className={`msg ${isCurrentUser ? "right" : "pull-right left"}-msg`}>
                          <div className="msg-bubble mx-2">
                            <div className="msg-info d-flex justify-content-between align-items-center">
                              <div className="msg-info-name">{item.message}</div>
                              {!isCurrentUser && (
                                <Dropdown
                                  menu={{
                                    items: [
                                      {
                                        key: "1",
                                        label: (
                                          <a href={Href} onClick={() => handleChatEdit(item)}>
                                            Edit
                                          </a>
                                        ),
                                      },
                                      {
                                        key: "2",
                                        label: (
                                          <a href={Href} onClick={() => handleChatDelete(item._id)}>
                                            Delete
                                          </a>
                                        ),
                                      },
                                    ],
                                  }}
                                  trigger={["click"]}
                                >
                                  <div className="msg-hover">
                                    <ArrowDown2 size="20" />
                                  </div>
                                </Dropdown>
                              )}
                            </div>
                            <div className="msg-info-time text-end">
                              {FormatTime(item.createdAt)}
                              <IoCheckmarkDone size={18} color={item.seen ? "#cca270" : "#000"} className="ms-2" />
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
                  <input className="msger-input" type="text" placeholder="Type Message..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                  <Button color="primary" className="msger-send-btn" type="submit">
                    <i className="fa fa-location-arrow" />
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
