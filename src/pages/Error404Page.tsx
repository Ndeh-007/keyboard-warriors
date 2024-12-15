import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LOCAL_IMAGES from "../core/images";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../core/routes";

const Error404Page: React.FC = () => {
  let navigate = useNavigate()

  function handleBtnClicked() {
    navigate(APP_ROUTES['home'].url)
  }

  return (
    <div className="w-full h-screen not-found-page">
      <Header />
      <div className="page-not-found-body">
        <div className="container mx-auto">
          <div className="not-found-holder">
            <div className="image-holder">
              <img src={LOCAL_IMAGES.notFound} alt="page not found" />
            </div>
            <div className="text-holder">
              <div className="not-found-text">Page Not Found</div>
              <button className="not-found-button" onClick={()=>handleBtnClicked()}>
                <div>
                  <span className="material-icons">arrow_back</span>
                </div>
                <div>Browse Challenges</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Error404Page;
