import React from "react";
import LottieInstance from "lottie-react";
import { Link } from "react-router-dom";
import forbiddenAnimation from "../../../assets/lottie/forbidden.json";

// Resolves the "got: object" issue if the bundler wraps the default export
const Lottie = LottieInstance.default || LottieInstance;

const Forbidden = () => {
    console.log(Lottie);
console.log(forbiddenAnimation);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 text-center">

        <div className="w-72 sm:w-80 mx-auto">
          <Lottie
            animationData={forbiddenAnimation}
            loop={true}
          />
        </div>

        <h1 className="text-6xl font-extrabold text-red-600">403</h1>

        <h2 className="text-3xl font-bold mt-3">
          Access Forbidden
        </h2>

        <p className="text-gray-500 mt-4">
          Sorry! You don't have permission to access this page.
          <br />
          Please go back to the Dashboard or Home page.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            to="/dashboard"
            className="btn bg-red-600 hover:bg-red-700 text-white border-none"
          >
            Dashboard
          </Link>

          <Link
            to="/"
            className="btn btn-outline border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;