import React, { useEffect, useState } from "react";
import Rodal from "rodal";
import apiCall from "../../utils/ApiCall";
import { AiOutlineUser } from "react-icons/ai";

function UserBio(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(props?.currentUser?.name || ""); // Initialize with default value if currentUser is defined
  const [bio, setBio] = useState(props?.currentUser?.bio || "");
  const [email, setEmail] = useState(props?.currentUser?.email || "");
  // const [nickname, setNickname] = useState(props?.currentUser?.nickname || '');

  useEffect(() => {
    // Update state when currentUser changes
    setName(props?.currentUser?.name || "");
    setBio(props?.currentUser?.bio || "");
    setEmail(props?.currentUser?.email || "");
    // setNickname(props?.currentUser?.nickname || '');
  }, [props?.currentUser]);

  const handleSave = () => {
    const userDTO = {
      name,
      bio,
      email,
      // nickname,
    };
    apiCall("/api/user/" + props?.currentUser?.id, "PUT", userDTO)
      .then(() => {
        props.getStudent();
        setModalVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ backgroundColor: "lightgoldenrodyellow" }}>
      <div
        className={
          "container d-flex p-4 justify-content-between align-items-center"
        }
      >
        <div className={"d-flex align-items-center justify-content-center"}>
          <div>
            <AiOutlineUser size={"70px"} />
          </div>
          <div>
            <h4>{props?.currentUser?.name}</h4>
            {props?.currentUser?.email}
          </div>
        </div>
        <div>
          <p className={"display-6"}>
            {props?.currentUser?.bio ? props?.currentUser?.bio : "No bio yet"}
          </p>
        </div>
        <div>
          <button
            onClick={() => setModalVisible(true)}
            className={"btn btn-warning"}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <Rodal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        height={500}
      >
        <div>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Bio:</label>
            <textarea
              className="form-control"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button onClick={handleSave} className="btn btn-primary">
            Save
          </button>
        </div>
      </Rodal>
    </div>
  );
}

export default UserBio;
