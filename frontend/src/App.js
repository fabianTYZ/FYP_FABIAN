import React, {useCallback, useEffect, useState} from 'react';
import "./App.css";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/home/Login";
import Register from "./components/home/Register";
import Student from "./components/home/Student";
import Teacher from "./components/home/Teacher";
import apiCall from "./utils/ApiCall";
import ErrorPage from "./components/404/ErrorPage";
import Course from "./components/course/Course";
import Chatroom from "./components/chatroom/Chatroom";

function App(props) {
    const [currentUser, setCurrentUser] = useState();
    const [searchCourse, setSearchCourse] = useState("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const navigate = useNavigate();
    const blockedPages = ["/student", "/courses", "/chatroom" ,"/teacher"];
    const location = useLocation();

    const checkSecurity = useCallback(async () => {
        if (blockedPages.some((blockedPage) => location.pathname.startsWith(blockedPage))) {
            let accessToken = localStorage.getItem("access_token");
            if (accessToken !== null) {
                try {
                    const res = await apiCall("/api/v1/security", "GET");
                    if (res?.error) {
                        if (res?.data[0].name !== "ROLE_TEACHER") {
                            navigate("/404");
                        }
                    }
                } catch (error) {
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        }
    }, [blockedPages, location.pathname, navigate]);

    useEffect(() => {
        checkSecurity();
    }, [checkSecurity, navigate]);

    useEffect(() => {
        getStudent()
    }, [location.pathname])

    function getStudent() {
        apiCall("/api/v1/auth/decode").then((res) => {            setCurrentUser(res.data);
            localStorage.setItem("userId", res.data.id)
        })
    }


    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Home currentUser={currentUser}/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/student"} element={<Student setCurrentUser={setCurrentUser} getStudent={getStudent} currentUser={currentUser}/>}/>
                <Route path={"/teacher"} element={<Teacher currentUser={currentUser}/>}/>
                <Route path={"/courses"} element={<Course searchCourse={searchCourse} setSearchCourse={setSearchCourse} currentUser={currentUser}/>}/>
                <Route path={"/chatroom"} element={<Chatroom currentUser={currentUser}/>}/>
                <Route path={"*"} element={<ErrorPage/>}/>
            </Routes>
        </div>
    );
}

export default App;