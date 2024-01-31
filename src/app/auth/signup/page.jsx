"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signup } from "./../../lib/services/auth";
import { useAuth } from "../../lib/authContext";
export default function Page({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {  login } = useAuth();

  const handleSubmit = async (e) => {
    setLoading(true);
    setError("");
    try {
      e.preventDefault();
      if (
        email.trim() &&
        password.trim().length >= 8 &&
        password.trim() === confirmPassword.trim()
      ) {
        const res = await signup({ email, password });
        if (res?.data) {
          localStorage.setItem("token", res?.data?.token);
          localStorage.setItem("email", res?.data?.email);
          setTimeout(() => login(res?.data), 500);
        }
      } else {
        setError("Please enter valid details");
      }
    } catch (err) {
      setError(err.response.data.error);
    }
    setLoading(false);
  };
  useEffect(() => {
    setLoading(false);
    setError("");
    setEmail("");
    setPassWord("");
    setConfirmPassword("");
  }, []);

  return (
    <div className="auth-container">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3"
      >
        <div>
          <h1 className="text-2xl">Get started</h1>
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
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 hover:border-grey"
            id="email"
            type="text"
          />
          <label htmlFor="password">Password</label>
          <input
            className="border p-2"
            value={password}
            onChange={(e) => setPassWord(() => e.target.value)}
            type="password"
          />
          <label htmlFor="password">Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(() => e.target.value)}
            className="border p-2"
            type="password"
          />
          <button
            disabled={loading}
            className="my-3 p-2 border bg-indigo-950 text-white rounded-md"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
