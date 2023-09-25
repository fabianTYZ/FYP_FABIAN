import React, {useEffect, useState} from 'react';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import './index.css'
import apiCall from "../../utils/ApiCall";
import {useNavigate} from "react-router-dom";
import reactImg from "./react.jpg"

function Course(props) {
    const [courses, setCourses] = useState();
    const [courseUser, setCourseUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        apiCall("/api/course", "GET").then((res) => {
            setCourses(res.data);
        })
    }, []);

    function getOneCourse(item) {
        apiCall("/api/course", "POST", null, {
            userId: item.userId,
            courseId: item.courseId
        }).then((res) => {
            if (!res.error) {
                setCourseUser(res.data)
                navigate("/student");
            } else {
                alert("You have already selected this course");
            }
        })
    }

    return (
        <div>
                <Header searchCourse={props.searchCourse} setSearchCourse={props.setSearchCourse} currentUser={props?.currentUser}/>
                <div className={"container"}>
                    <section className="course-section mt-4 pb-5">
                        <div className="container pb-3">
                            <div className="row">
                                {courses?.filter(item=>item.name.toLowerCase().includes(props.searchCourse.toLowerCase())).map(item =>
                                    <div key={item.id} className="col-md-3">
                                        <div className="card mb-4">
                                            <img
                                                src={reactImg}
                                                className="card-img-top"
                                                alt="course"
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <p className="card-text">
                                                    {
                                                        item.description
                                                    }
                                                </p>
                                                <p className="card-text">
                                                    Instructor: John Doe
                                                </p>
                                                <p className="card-text">Duration: 4 weeks</p>
                                                <button disabled={courseUser?.userId === props.currentUser?.id}
                                                        onClick={() => getOneCourse({
                                                            courseId: item.id,
                                                            userId: props.currentUser.id
                                                        })} className="btn btn-primary">
                                                    Enroll Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    </section>


                </div>
                <Footer/>
        </div>
);
}

export default Course;