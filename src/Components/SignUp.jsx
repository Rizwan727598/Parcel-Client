import React, { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const profileImage = e.target.photoURL.value.trim();
    const userType = e.target.userType.value;

    setError(null);

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must include at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;

      // Update Firebase profile
      await updateProfile(user, { displayName: name, photoURL: profileImage });

      // Ensure users cannot self-assign "Admin" role
      const finalUserType = userType === "Admin" ? "User" : userType;

      // Send user data to backend
      await axios.post("http://localhost:8000/register", {
        name,
        email,
        profileImage,
        userType: finalUserType,
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: `Welcome, ${user.displayName || "User"}!`,
      });

      e.target.reset();
      navigate("/"); // Redirect to home after registration
    } catch (err) {
      setError("Registration failed. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white hero dark:bg-gray-800">
      <div className="flex-col hero-content lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">
            Sign Up Now!
          </h1>
          <p className="py-6 text-gray-600 dark:text-gray-300">
            Join us today! Fill in your details to create an account.
          </p>
        </div>
        <div className="w-full max-w-sm bg-white shadow-2xl card dark:bg-gray-800">
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="text-gray-800 label-text dark:text-gray-300">
                  Name
                </span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-white border-gray-300 input dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="text-gray-800 label-text dark:text-gray-300">
                  Email
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-white border-gray-300 input dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="photoURL" className="label">
                <span className="text-gray-800 label-text dark:text-gray-300">
                  Photo URL
                </span>
              </label>
              <input
                type="text"
                id="photoURL"
                name="photoURL"
                className="bg-white border-gray-300 input dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="text-gray-800 label-text dark:text-gray-300">
                  Password
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="bg-white border-gray-300 input dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 flex items-center text-gray-600 right-3 dark:text-gray-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="userType" className="label">
                <span className="text-gray-800 label-text dark:text-gray-300">
                  User Type
                </span>
              </label>
              <select
                id="userType"
                name="userType"
                className="bg-white border-gray-300 input dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                required
              >
                <option value="User">User</option>
                <option value="DeliveryMen">Delivery Men</option>
                <option value="Admin" disabled>
                  Admin (Manual Assignment)
                </option>
              </select>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="mt-6 form-control">
              <button
                type="submit"
                className="text-white bg-blue-500 btn hover:bg-blue-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <a
                href="/SignIn"
                className="font-medium text-blue-500 hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
