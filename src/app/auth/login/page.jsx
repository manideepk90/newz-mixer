"use client";

import React, { useContext, useEffect, useState } from "react";
import { login } from "./../../lib/services/auth";
import { useAuth } from "./../../lib/authContext";
export default function Page({ }) {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, login: loginAuth } = useAuth();
  const handleSubmit = async (e) => {
    setLoading(true);
    setError("");
    try {
      e.preventDefault();
      if (email.trim() && password.trim()) {
        const res = await login({ email, password });
        if (res?.data) {
          localStorage.setItem("token", res?.data?.token);
          localStorage.setItem("email", res?.data?.email);
          setTimeout(() => loginAuth(res?.data), 500);
        }
      } else {
        setError("Please enter valid details");
      }
    } catch (err) {
      setError(err.response.data.error);
      // console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(false);
    setError("");
    setEmail("");
    setPassWord("");
  }, []);

  return (
    <div className="auth-container">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3"
      >
        <div>
          <h1 className="text-2xl">Welcome back</h1>
        </div>
        {error && (
          <div className="border error-box">
            <h1 className="text-xm"> {error}</h1>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email Id</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="border p-2 hover:border-grey"
            id="email"
            type="text"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
            className="border p-2"
            type="password"
          />
          <button
            disabled={loading}
            className="my-3 p-2 border bg-indigo-950 text-white rounded-md"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
