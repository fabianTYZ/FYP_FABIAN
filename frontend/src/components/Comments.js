import React, {useEffect, useState} from 'react';
import {HiOutlineUserCircle} from "react-icons/hi";
import apiCall from "../utils/ApiCall";

function Comments(props) {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        getComments()
    }, [props?.videoId])
    function getComments() {
        apiCall("/api/comments?videoId=" + props?.videoId, "GET").then((res) => {
            setMessages(res.data)
        })
    }

    function sendMessage() {
        if (message !== "") {
            apiCall("/api/comments", "POST", {
                userId: props?.userId,
                videoId: props?.videoId,
                message: message
            }).then(() => {
                getComments()
                setMessage("")
            })
        }


    }

    return (
        <div className=" w-100">
            <div className="d-flex justify-content-center">
                <div className="w-100">
                    <div className="card ">
                        <div className="card-body border overflow-y-auto" style={{height: "300px"}}>
                            {
                                messages?.map(item => <div key={item.id}>
                                    <div>
                                        <div style={{borderTopRightRadius: "10px"}}
                                             className={"d-flex p-1 bg-light w-25"}>
                                            <HiOutlineUserCircle size={40}/>
                                            <div>
                                                <h6 className="fw-bold text-primary mb-0">{item.user?.name}</h6>
                                                <p className="text-muted small mb-0">
                                                    {new Date(item.time).getHours() + ":" + new Date(item.time).getMinutes() + ":" + new Date(item.time).getSeconds()}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{borderBottomRightRadius: "10px", borderTopRightRadius: "10px"}}
                                             className="mb-4 bg-light p-2">
                                            {item.message}
                                        </div>
                                    </div>

                                </div>)
                            }
                        </div>
                        <div className="card-footer py-3 border-0" style={{backgroundColor: "#f8f9fa"}}>
                            <div className="d-flex flex-start w-100">
                                <div className="form-outline w-100">
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="form-control"
                          id="textAreaExample"
                          rows="4"
                          style={{background: "#fff1"}}>

                </textarea>
                                    <label className="form-label" htmlFor="textAreaExample">Message</label>
                                </div>
                            </div>
                            <div className="float-end mt-2 pt-1">
                                <button onClick={sendMessage} className="btn btn-primary btn-sm">Post comment</button>
                                <button className="btn btn-outline-primary btn-sm">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comments;