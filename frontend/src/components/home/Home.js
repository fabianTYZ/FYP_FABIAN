import React, { useEffect } from "react";
import logo from "../../images/homeLogo.jpg";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();
  function handleBack() {
    navigate("/register");
  }

  useEffect(() => {
    if (window.location.pathname === "/") {
      localStorage.clear();
    }
  }, []);

  return (
    <div>
      <Header currentUser={props?.currentUser} />
      <div className={"text-center mt-5"}>
        <img style={{ width: "150px", height: "150px" }} src={logo} alt="#" />
        <h1 className="display-4 text-primary">Empowering Education for All</h1>
      </div>
      <div className={"text-center mt-5"}>
        <button
          onClick={handleBack}
          className={"btn btn-outline-primary display-4"}
        >
          Sign up for free
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
