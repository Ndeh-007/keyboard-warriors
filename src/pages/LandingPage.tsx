import React from "react";
import LOCAL_IMAGES from "../core/images";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
    let navigate = useNavigate()

  function handleGetStartedClicked() {
    navigate("/auth")
    return;
  }

  return (
    <div className="w-full h-screen content-center justify-center flex items-center">
      <div className="background-image">
        <div className="overlay-gradient">
          <div className="text-center p-10">
            <img
              src={LOCAL_IMAGES.logo512}
              alt="keyboard warriors logo"
              className="logo"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              KEYBOARD WARRIORS
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 mb-8">
              Put Your Money Where Your Mouth Is ... Literally
            </p>

            <button
              onClick={(e) => handleGetStartedClicked()}
              className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg shadow-md transition duration-300"
            >
              Get Started
            </button>
            <p className="mt-6 text-sm text-gray-500">
              contact@keyboardwarriors.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
