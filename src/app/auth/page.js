import React from "react";
import Link from "next/link";
export default function Page({}) {
  return (
    <div className="auth-container">
      <div>Welcome Back</div>
      <Link className="links" href={"/auth/login"}>
        Login
      </Link>
      <Link className="links" href={"/auth/signup"}>
        Sign Up
      </Link>
    </div>
  );
}
