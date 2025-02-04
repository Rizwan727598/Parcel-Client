import React, { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError(null);

    try {
      const result = await signInUser(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${result.user.displayName || "User"}!`,
      });
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid credentials. Please try again.",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const { displayName, email, photoURL } = result.user;
      await axios.post("http://localhost:8000/social-login", {
        name: displayName,
        email,
        profileImage: photoURL,
        userType: "User",
      });

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome, ${displayName}!`,
      });
      navigate("/");
    } catch (error) {
      setError("Google Login failed. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: "Please try again.",
      });
    }
  };

  return (
    <div className="hero min-h-screen bg-white dark:bg-gray-800">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">
            Sign In Now!
          </h1>
          <p className="py-6 text-gray-600 dark:text-gray-300">
            Welcome back! Sign in to continue and explore more features.
          </p>
        </div>
        <div className="card bg-white dark:bg-gray-800 w-full max-w-sm shadow-2xl">
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text text-gray-800 dark:text-gray-300">
                  Email
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input bg-white dark:bg-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text text-gray-800 dark:text-gray-300">
                  Password
                </span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input bg-white dark:bg-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            {error && <p className="text-red-300 text-sm">{error}</p>}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="divider text-gray-800 dark:text-gray-300">OR</div>
          <div className="form-control">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300"
            >
              Sign In with Google
            </button>
          </div>
          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-600 dark:text-gray-300">
              Don’t have an account?{" "}
              <Link
                to="/SignUp"
                className="text-blue-500 hover:underline font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
