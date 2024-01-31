"use client";
import Image from "next/image";
import mainImage from "./../icon2.png";
import Link from "next/link";
import { useAuth } from "../lib/authContext";
export default function NavBar({}) {
  const { user, logout } = useAuth();
  return (
    <>
      <header>
        <nav>
          <div className="header-container">
            <Link href={"/"}>
              <div className="flex gap-3">
                <Image src={mainImage} alt="main-icon" />
                <h1>Zacker News</h1>
              </div>
            </Link>
            {user ? (
              <p onClick={logout}>Logout</p>
            ) : (
              <div className="flex gap-3">
                <Link href="/auth/login">Login</Link>
                <Link href="/auth/signup">Sign up</Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
