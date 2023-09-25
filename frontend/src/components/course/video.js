import React, {useEffect, useRef, useState} from 'react';
import YouTube from 'react-youtube';
import apiCall from "../../utils/ApiCall";
import Comments from "../Comments";

function Video(props) {
    const [currentUser, setCurrentUser] = useState();
    const videoObj = JSON.parse(localStorage.getItem("videoObj"));

    const videoOptions = {
        height: '390',
        width: '640'
    };

    useEffect(() => {
        apiCall("/api/v1/auth/decode").then((res) => {
            setCurrentUser(res.data);
        })
    }, [props.video.id]);


    const onVideoEnd = (youtubeId) => {
        apiCall("/api/course", "PUT", null, {userId: currentUser?.id, youtubeId: youtubeId})
            .then(() => {
                props.getUserCourse();
                window.location.reload()
            })
    };
    const video = JSON.parse(localStorage.getItem("video"));
    return (
        <div>
            {
                video?.id &&
                <div className={"d-flex justify-content-center flex-column  border p-3 align-items-center"}>
                    <YouTube
                        videoId={video?.youtubeId}
                        opts={videoOptions}
                        onEnd={() => onVideoEnd(video?.id)}
                    />
                    <Comments videoId={video?.id} userId={currentUser?.id}/>
                </div>
            }
        </div>
    );
}

export default Video;