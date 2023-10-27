import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

export const Login = () => {
  const [loginData, setLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const isLoggedIn = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:9000/auth/login", {
        username: loginData.username,
        password: loginData.password,
      });
      const { message, token } = data;
      localStorage.setItem("userToken", token);
      setSuccess(message);
      setError("");
      navigate("/homepage");
    } catch (err) {
      setSuccess("");
      setError(err.response.data || "An unexpected error occurred.");
    }
  };
  return isLoggedIn ? (
    <Navigate to="/homepage" />
  ) : (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username / Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={loginData.username}
                onChange={(e) =>
                  setLogin({ ...loginData, username: e.target.value })
                }
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-berkeley-blue sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLogin({ ...loginData, password: e.target.value })
                }
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-berkeley-blue sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex w-full justify-center customBtn bg-custom-berkeley-blue hover:bg-custom-cerulean"
            >
              Sign in
            </button>
          </div>
          {error && <h1>{error}</h1>}
          {success && <h1>{success}</h1>}
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-custom-berkeley-blue hover:text-indigo-500"
          >
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};
