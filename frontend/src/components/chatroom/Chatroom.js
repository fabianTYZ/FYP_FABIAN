import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import apiCall from "../../utils/ApiCall";
import "./index.css";
import { HiOutlineUserCircle } from "react-icons/hi";

function Chatroom(props) {
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    if (props?.currentUser?.id) {
      getUsers();
    }
  }, [props?.currentUser?.id]);

  function getUsers() {
    apiCall("/api/user", "GET", null, { myId: props?.currentUser?.id }).then(
      ({ data }) => {
        setUsers(data);
      }
    );
  }

  function showMessage(id) {
    apiCall(
      `/api/message?senderId=${props?.currentUser?.id}&receiverId=${id}`,
      "GET"
    ).then((res) => {
      console.log(res.data);
      setMessages(res.data);
      setReceiverId(id);
    });
  }

  function sendMessage() {
    if (messageInput !== "") {
      let obj = {
        message: messageInput,
        senderId: props.currentUser?.id,
        receiverId,
      };
      apiCall("/api/message", "POST", obj).then((res) => {
        showMessage(receiverId);
        setMessageInput("");
      });
    }
  }

  return (
    <div>
      <Header currentUser={props?.currentUser} />
      <div className={"border h-100"}>
        <div className="containera">
          <div className="menu">
            <div className="total-users">
              {users?.map((item) => (
                <div
                  onClick={() => showMessage(item.id)}
                  className={
                    `user-info ` + `${receiverId === item.id ? "selected" : ""}`
                  }
                  key={item.id}
                >
                  <div>
                    <HiOutlineUserCircle size={25} />
                  </div>
                  <div className={"p-2"}>
                    <h6>
                      {item.name} <br />
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="chatdiv">
            {!messages.length && receiverId === "" ? (
              <p className=" mx-auto my-5">Select a user to chat with!</p>
            ) : (
              <div className="ota-chat pb-5 position-relative">
                <div className="chat pb-5">
                  {messages.length === 0 ? (
                    <div>
                      <h5 className={"text-dark d-flex justify-content-center"}>
                        No Chats
                      </h5>
                    </div>
                  ) : (
                    messages?.map((item) => (
                      <div
                        key={item?.id}
                        className={`message ${
                          item.sender.id === props.currentUser?.id
                            ? " right"
                            : " left"
                        }`}
                      >
                        <p className="text-message">{item.message}</p>
                        <small
                          className={`message ${
                            item.sender.id === props.currentUser?.id
                              ? " rightTime"
                              : " leftTime"
                          }`}
                        >
                          {new Date(item.time).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </small>
                      </div>
                    ))
                  )}
                </div>
                <div className="inputSenderdiv" >
                  <input
                    placeholder="Type Your Message Here..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    type="text"
                    className="bg-light w-75 form-control"
                  />
                  <button onClick={sendMessage} className="btn btn-info">
                    send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Chatroom;
