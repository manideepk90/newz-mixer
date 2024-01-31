import React from "react";
import "./auth.css";

export default function Layout({ children }) {
  return (
    <section className="auth-page">
      {children}
    </section>
  );
}
