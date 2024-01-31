"use client";
import NewsItem from "./ui/News-articles/news-item";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "./lib/authContext";
library.add(fas);
import { authHeader } from "./lib/services/auth";
export default function Home() {
  const [data, setData] = useState([]);
  const page = useSearchParams().get("p");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, login } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log(authHeader())
        const res = await axios.get(`/api/articles?p=${page}`, {
          headers: authHeader(),
        });
        if (res?.data?.data) setData(() => res?.data?.data);
      } catch (err) {
        setError("Failed to load Data");
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (email && token) {
      login({ email, token });
    }
  }, []);

  return (
    <main>
      {loading && (
        <div className="min-h-screen flex justify-center items-center">
          <p>Loading</p>{" "}
        </div>
      )}
      {error && (
        <div className="min-h-screen flex justify-center items-center">
          <p>{error}</p>
        </div>
      )}
      <table>
        <tbody>
          {data &&
            data.map((ele, index) => (
              <NewsItem data={ele} key={index} index={index + 1} />
            ))}
        </tbody>
      </table>
      <Link href={`/?p=${parseInt(page ? page : "1") + 1}`}>More</Link>
    </main>
  );
}
