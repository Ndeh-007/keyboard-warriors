import React from "react";
import LOCAL_IMAGES from "../core/images";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../core/routes";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="container mx-auto">
        <div className="flex flex-wrap">

          <div className="block flex-1 footer-group">
            <div className="footer-group-item footer-logo cursor-pointer">
              <img src={LOCAL_IMAGES.logo192White} alt="" />
            </div>
            <div className="footer-group-item">
              Why not earn from your typing speed?
              Prove your worth as a true keyboard warrior. Dominate others.
            </div>
          </div>

          <div className="flex-1 hidden lg:block"></div>

          <div className="block flex-1 footer-group">
            <div className="footer-group-header-item"></div>
            <div className="footer-group-item footer-group-item-interact">
              <Link to={APP_ROUTES["home"].url}>Browse Challenges</Link>
            </div>
            <div className="footer-group-item footer-group-item-interact">
              <Link to={APP_ROUTES["profile"].url}>My Challenges</Link>
            </div>
            <div className="footer-group-item footer-group-item-interact">
              <Link to={APP_ROUTES["legal"].url}>Legal</Link>
            </div>
            {/* <div className="footer-group-item">width</div> */}
          </div>

          <div className="block flex-1 footer-group">
            <div className="footer-group-header-item">Contact</div>
            <div className="footer-group-item">
              If you have any questions or complains, please reach out to us. We
              are here to help! 💌{" "}
            </div>
            <div className="footer-group-item underline footer-group-item-interact">
              <a href="mailto:support@keyboardwarriors.com">
                support@keyboardwarriors.com
              </a>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
        &copy; {new Date().getFullYear()} Keyboard Warriors. All rights
        reserved.
      </div>
      </div>
    </div>
  );
};

export default Footer;
