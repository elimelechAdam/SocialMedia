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
      const { message, token, _id } = data;
      localStorage.setItem("userToken", token);
      localStorage.setItem("userId", _id);
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
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-1 focus:ring-white sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-1 focus:ring-white"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex w-full justify-center borderBtnWhite"
            >
              Sign in
            </button>
          </div>
          {error && <span className="text-white block">{error}</span>}
          {success && <span className="text-white block">{success}</span>}
        </form>

        <p className="mt-10 text-center text-sm text-gray-300">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-white hover:text-slate-300"
          >
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};
