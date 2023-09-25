import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import apiCall from "../../utils/ApiCall";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {Controller, useForm} from "react-hook-form";
import {ToastContainer, toast} from 'react-toastify';


function Register(props) {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm();
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleLogin = (data) => {
        apiCall("/api/v1/auth/register", "POST", data).then((res) => {
            if (!res.error) {
                navigate("/login");
            }
        })
    }
    return (
        <div>
            <ToastContainer/>
            <div className="container mt-5 w-75">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Register</h2>
                                <form onSubmit={handleSubmit(handleLogin)}>
                                    <div className="mb-3">
                                        <Controller
                                            rules={{required: "Email is required"}}
                                            name='email'
                                            control={control}
                                            render={({field}) => (
                                                <div>
                                                    <input placeholder={"Email"} className="form-control" {...field}
                                                           type='email'/>
                                                    {errors.email && (
                                                        <p className='text-danger small'>{errors.email.message}!</p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <Controller
                                            name='name'
                                            rules={{required: "Name is required"}}
                                            control={control}
                                            render={({field}) => (
                                                <div>
                                                    <input placeholder={"Name"} className="form-control" {...field}
                                                           type='text'/>
                                                    {errors.name && (
                                                        <p className='text-danger small'>{errors.name.message}!</p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-3 ml-2 d-flex input-group align-items-center">
                                        <Controller
                                            name='password'
                                            control={control}
                                            rules={{required: "Password is required"}}
                                            render={({field}) => (
                                                <div className={"w-100"}>
                                                    <div className={"d-flex input-group"}>
                                                        <input placeholder={"Password"}
                                                               type={showPassword ? 'text' : 'password'}
                                                               className="form-control" {...field}/>
                                                        <button
                                                            className='btn btn-outline-secondary h-75'
                                                            type='button'
                                                            onClick={handleTogglePassword}
                                                        >
                                                            {showPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                                                        </button>
                                                    </div>
                                                    {errors.password && (
                                                        <p className='text-danger small'>{errors.password.message}!</p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className={"text-center"}>
                                        <button className="btn btn-primary btn-block">
                                            Submit
                                        </button>
                                        <button onClick={()=>navigate("/login")} className="btn mx-2 btn-primary btn-block">
                                            Back to login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default Register;