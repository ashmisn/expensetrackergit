import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import {loginAction} from '../../redux/slice/authSlice'
import { loginAPI } from "../../services/users/userService";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const LoginForm = () => {

  const dispatch = useDispatch();
  const [message, setMessage] = useState(""); // State for success/error message
  
  // Mutation setup for login API
  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
    onSuccess: (data) => {
      console.log("Login successful:", data);
      // Show login success message
      setMessage("Login successful");
      // Redirect or perform further actions if needed
       window.location.href = "/dashboard"; // Example redirection after successful login
    },
    onError: (error) => {
      console.error("Login failed:", error);
      // Show error message
      setMessage("Login failed, please try again.");
    },
  });

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
   
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      mutateAsync(values)
        .then((data) => {
          console.log("Login response:", data);
          dispatch(loginAction(data));
          localStorage.setItem("userInfo",JSON.stringify(data));
        })
        .catch((e) => {
          console.log("Error:", e);
        });
    },
  });

  return (
    <form
      className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200"
      onSubmit={formik.handleSubmit}
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">Login</h2>
      <p className="text-sm text-center text-gray-500">Login to access your account</p>

      {/* Input Field - Email */}
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-xs text-red-500">{formik.errors.email}</span>
        )}
      </div>

      {/* Input Field - Password */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-red-500">{formik.errors.password}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        disabled={!formik.isValid || isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      {/* Success/ Error Message */}
      {message && (
        <div className="text-center text-sm mt-2">
          <p className={isError ? "text-red-500" : "text-green-500"}>
            {message}
          </p>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
