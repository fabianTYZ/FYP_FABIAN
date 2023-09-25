import React, { useState } from "react";
import Video from "../course/video";
import { Progress, Space } from "antd";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import Footer from "../footer/Footer";

function VideoCourse(props) {
  const [video, setVideo] = useState("");
  const videoObj = JSON.parse(localStorage.getItem("videoObj"));
  const courseIdL = localStorage.getItem("courseId");

  function showVideo(item) {
    localStorage.setItem("courseId", item.id);
    localStorage.setItem("video", JSON.stringify(item));
    setVideo(item);
  }

  const finishedCount = videoObj?.courseVideo?.filter(
    (item) => item.isFinished
  ).length;
  const totalCount = videoObj?.courseVideo?.length;
  const progressPercentage = (finishedCount / totalCount) * 100;
  return (
    <div>
      <div
        className={
          "d-flex justify-content-center align-items-center gap-4 pb-4"
        }
      >
        <h5>My Progress</h5>
        <Space wrap>
          {progressPercentage === 100 ? (
            <Progress type="circle" percent={100} format={() => "Done"} />
          ) : (
            <Progress
              type="circle"
              percent={progressPercentage}
              format={(percent) => `${percent} %`}
            />
          )}
        </Space>
      </div>
      {videoObj && (
        <div className="bg-info text-center shadow-lg rounded p-3 w-25 my-4">
          <span
            style={{
              color: "white",
              fontSize: "18px",
              fontFamily: "Arial, sans-serif",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Adding text shadow
            }}
          >
            Chapters
          </span>
        </div>
      )}

      <div className={"d-flex"}>
        {videoObj?.length === 0 ? (
          <div className={" display-6 justify-content-center my-5"}>
            Select a Course...
          </div>
        ) : (
          <div className={"d-flex gap-5 justify-content-between w-75"}>
            <div className={"d-flex flex-column"}>
              {videoObj?.courseVideo.map((item) => (
                <div
                  key={item.id}
                  className={"d-flex align-items-center gap-2"}
                >
                  {item.isFinished ? (
                    <div className={"checkBox "}>
                      <ImCheckboxChecked color={"green"} size={20} />
                    </div>
                  ) : (
                    <div className={"checkBox "}>
                      <ImCheckboxUnchecked color={"black"} size={20} />
                    </div>
                  )}

                  <div
                    key={item.id}
                    style={{
                      backgroundColor: item.id === courseIdL ? "cadetblue" : "",
                      color: item.id === courseIdL ? "white" : "",
                    }}
                    className={"courseName border"}
                    onClick={() => showVideo(item)}
                  >
                    <h6 className={"px-2"}>{item.name}</h6>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Video
                setCurrentUser={props.setCurrentUser}
                getUserCourse={props?.getUserCourse}
                video={video}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoCourse;
