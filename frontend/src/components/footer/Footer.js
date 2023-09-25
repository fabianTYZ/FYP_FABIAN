import React from "react";
import { AiOutlineFacebook, AiOutlineYoutube } from "react-icons/ai";
import { CiTwitter } from "react-icons/ci";

function Footer() {
  return (
    <footer className="footer fixed-bottom pt-4 bg-dark text-white p-2">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex gap-2">
          <div className="footer-left">
            <p>Privacy Policy</p>
          </div>
          |
          <div className="footer-right">
            <p>About</p>
          </div>
          |
          <div className="footer-right">
            <p>Donate</p>
          </div>
          |
          <div className="footer-right">
            <p>Support</p>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div>
            <input style={{ outline: "none" }} type="text" />
          </div>
          <div className="d-flex justify-content-center align-items-center gap-3">
            <AiOutlineFacebook size={25} />
            <CiTwitter size={25} />
            <AiOutlineYoutube size={25} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
