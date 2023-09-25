import React, {useEffect, useState} from 'react';
import apiCall from "../../utils/ApiCall";
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        if (window.location.pathname==='/'){
            localStorage.clear();
        }
    },[])

    const handleLogin = () => {

        apiCall("/api/v1/auth/login", "POST", {email, password}).then((res) => {
            console.log(res)
            if (!res.error) {
                localStorage.setItem("access_token", res.data.access_token);
                localStorage.setItem("refresh_token", res.data.refresh_token);
                if (res.data.roles[0].name === "ROLE_STUDENT") {
                    navigate("/student")
                } else if (res.data.roles[0].name === "ROLE_TEACHER") {
                    navigate("/teacher")
                }
                if (res.error) {
                    alert("Login or password is wrong");
                }
            } else {
                alert("Email or Password is wrong")
            }

        })
    }


    return (
        <div className="container mt-5 w-50">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input type="text" className="form-control" id="email" value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input type="password" className="form-control" id="password" value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className={"d-flex justify-content-between"}>
                                    <button type="button" className="btn btn-primary btn-block"
                                            onClick={handleLogin}>Login
                                    </button>
                                    <Link to={"/register"}>
                                        Do not have an account?
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;