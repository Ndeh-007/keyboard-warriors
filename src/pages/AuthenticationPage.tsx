import React, { useState } from "react";
import {Link} from "react-router-dom"
// import { isUserAuthenticated } from "../core/apis/authentication";
import LOCAL_IMAGES from "../core/images";
import { useNavigate } from "react-router-dom";

const AuthenticationPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<Boolean>(true);
  let navigate = useNavigate();

  // check if the user is authenitcated
  //   function verifyAuthentication() {
  //     if (!isUserAuthenticated()) {
  //       console.log("user not authenticated");
  //       return;
  //     }

  //     console.log("User authenticated");
  //   }

  // route to browse challenges
  function routeToBrowse() {
    navigate("/browse");
  }

  function handleCreateAccountFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    routeToBrowse();
  }

  function handleLoginFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    routeToBrowse();
  }

  // toggles the presented form
  function toggleForm() {
    setIsSignUp(!isSignUp);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-white-400 via-blue-300 to-white-400 flex items-center justify-center">
      <div className="bg-white border-2 border-solid border-gray-200  rounded-xl shadow-lg overflow-hidden w-11/12 md:w-4/5 lg:w-3/4 xl:w-3/5 grid grid-cols-1 md:grid-cols-2">
        {/* Left Section */}
        <div className="relative bg-gray-100 flex flex-col justify-center items-center">
          {/* Image Illustration */}
          {/* <img
            src={LOCAL_IMAGES.whitewhiteKeyboard}
            alt="Illustration"
            className="w-full h-full"
          /> */}
        </div>

        {/* Right Section */}
        <div className="p-8 flex flex-col justify-center">
          <div className="mb-10">
            <div style={{ width: "10%" }}>
              <img src={LOCAL_IMAGES.logo512} alt=""></img>
            </div>
            <div className="text-2xl font-bold text-gray-800 mt-5">
              {isSignUp ? "Create Account" : "Account Login"}
            </div>
            <p className="text-gray-500">KeyBoard Warriors.</p>
          </div>

          {/* Form */}
          {/* Create Account */}
          {isSignUp ? (
            <>
              <form onSubmit={(e) => handleCreateAccountFormSubmit(e)}>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="john.doe"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john.doe@gmail.com"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="mb-6">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to the{" "}
                      <Link to="/legal" className="text-blue-500 hover:underline">
                        privacy policy & terms
                      </Link>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                >
                  Sign up
                </button>
              </form>

              <div className="text-center mt-6 text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => toggleForm()}
                >
                  Sign In
                </button>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={(e) => handleLoginFormSubmit(e)}>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="john.doe"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                >
                  Login
                </button>
              </form>

              <div className="text-center mt-6 text-sm text-gray-500">
                Don't have an account?{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => toggleForm()}
                >
                  Create Account
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
