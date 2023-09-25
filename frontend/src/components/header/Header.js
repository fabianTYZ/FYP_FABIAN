import React from "react";
import { FiUserPlus } from "react-icons/fi";
import { BiBookAdd } from "react-icons/bi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi";
import logo from "../../images/homeLogo.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Tooltip } from "antd";

function Header(props) {
  const location = useLocation();
  let isLogged = props.currentUser?.id;
  const navigate = useNavigate();

  function clearLocal() {}

  function searchCourses(e) {
    props.setSearchCourse(e.target.value);
  }

  console.log(props);

  function clickedSearch() {
    navigate("/courses");
  }

  const items = [
    {
      label: "Sign out",
      key: "1",
    },
  ];

  const handleMenuClick = (e) => {
    navigate("/");
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className={"d-flex gap-5"}>
          <Link
            to={"/student"}
            className={"text-center rounded p-1 text-black "}
            style={
              isLogged
                ? {
                    backgroundColor:
                      location.pathname === "/student" ? "#aeccd6" : "",
                    cursor: "pointer",
                    textDecoration: "none",
                  }
                : { display: "none" }
            }
          >
            <FiUserPlus color={"black"} size={30} />
            <br />
           Your Profile
          </Link>
          <Link
            to={"/courses"}
            className={"text-center rounded p-1 text-black"}
            style={
              isLogged
                ? {
                    backgroundColor:
                      location.pathname === "/courses" ? "#aeccd6" : "",
                    cursor: "pointer",
                    textDecoration: "none",
                  }
                : { display: "none" }
            }
          >
            <BiBookAdd color={"black"} size={30} />
            <br />
            Courses
          </Link>
          <Link
            to={"/chatroom"}
            className={"text-center rounded p-1 text-black"}
            style={
              isLogged
                ? {
                    backgroundColor:
                      location.pathname === "/chatroom" ? "#aeccd6" : "",
                    cursor: "pointer",
                    textDecoration: "none",
                  }
                : { display: "none" }
            }
          >
            <HiOutlineChatBubbleOvalLeftEllipsis color={"black"} size={30} />
            <br />
            Chat room
          </Link>
        </div>
        <Link to={"/student"} style={!isLogged ? { display: "none" } : {}}>
          <img className={"imgStyle"} src={logo} alt="" />
        </Link>
        <div
          className={"d-flex justify-content-between align-items-center gap-5"}
        >
          <div>
            <input
              placeholder={"Search Courses..."}
              type="search"
              onClick={clickedSearch}
              onChange={searchCourses}
              value={props.searchCourse}
              style={
                isLogged
                  ? {
                      borderRadius: "20px",
                      border: "1px solid gray",
                      padding: "5px",
                      paddingLeft: "10px",
                      outline: "none",
                      transition: "border-color 0.3s",
                    }
                  : { display: "none" }
              }
              onFocus={(e) => {
                e.target.style.borderColor = "blue";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "gray";
              }}
            />
          </div>

          {isLogged ? (
            <Dropdown.Button
              menu={menuProps}
              placement="bottom"
              icon={<UserOutlined />}
            >
              {props.currentUser?.name ? (
                <p onClick={() => navigate("/student")}>
                  {props.currentUser?.name}
                </p>
              ) : (
                <p onClick={() => navigate("/login")}>Login</p>
              )}
            </Dropdown.Button>
          ) : (
            <Button
              menu={menuProps}
              placement="bottom"
              icon={<UserOutlined />}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
