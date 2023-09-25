import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import UserBio from "../UserBio/userBio";
import apiCall from "../../utils/ApiCall";
import "./index.css";
import VideoCourse from "../VideoCourse/videoCourse";
import { DeleteFilled } from "@ant-design/icons";
import Footer from "../footer/Footer";
function Student(props) {
  const [courseVideo, setCourseVideo] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);

  useEffect(() => {
    if (props?.currentUser?.id) {
      getUserCourse();
    }
  }, [props?.currentUser?.id]);

  function getUserCourse() {
    apiCall("/api/course/video", "GET", null, {
      userId: props?.currentUser?.id,
    }).then((res) => {
      setCourseVideo(res.data);
      console.log(res.data);
    });
  }

  function showVideo(item) {
    setSelectedCourse(item);
    console.log(item);
    localStorage.setItem("videoObj", JSON.stringify(item));
  }

  const videoObj = JSON.parse(localStorage.getItem("videoObj"));

  function deleteCourse(item) {
    apiCall("/api/course", "DELETE", null, {
      userId: item.userId,
      courseId: item.id,
    }).then((res) => {
      localStorage.removeItem("videoObj");
      localStorage.removeItem("video");
      localStorage.removeItem("courseId");
      getUserCourse();
    });
  }

  return (
    <div>
      <Header currentUser={props?.currentUser} />
      <UserBio getStudent={props.getStudent} currentUser={props?.currentUser} />
      <div className={"d-flex bg-white gap-3 p-4 h-100"}>
        <div className={"left-side"}>
          <div className={"header"}>My Courses</div>
          <div className={"body-settings"}>
            {courseVideo.map((item, index) => (
              <div
                key={item.id}
                className={" d-flex justify-content-between btn-group"}
              >
                <div
                  onClick={() => showVideo(item)}
                  className={"link-settings"}
                  style={{
                    background:
                      item.id === videoObj?.id ? "#2b76bd" : "#7ec8f2",
                    cursor: "pointer",
                  }}
                >
                  <div>
                    {index + 1}. {item.courseName}
                  </div>
                </div>

                <div
                  onClick={() => deleteCourse(item)}
                  className={"deleteCourseBtn"}
                >
                  <DeleteFilled />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={"border overflow-y-auto rounded p-4 w-100"}>
          <VideoCourse
            getUserCourse={getUserCourse}
            selectedCourse={selectedCourse}
            setCurrentUser={props.setCurrentUser}
            currentUser={props.currentUser}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Student;
