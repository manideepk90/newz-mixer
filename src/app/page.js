"use client";
import NewsItem from "./ui/News-articles/news-item";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { createContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "./lib/authContext";
library.add(fas);
import { authHeader } from "./lib/services/auth";
export default function Home() {
  const [data, setData] = useState([]);

  const deleteData = (id) => {
    const modifiedData = data.filter((e) => e.hackerId !== id);
    setData(modifiedData);
  };
  const markAsRead = (id) => {
    const modifiedData = data.map((e) => {
      if (e.hackerId === id) {
        return {
          ...e,
          UserActions: [
            {
              isRead: !e?.UserActions[0]?.isRead,
            },
          ],
        };
      } else return e;
    });
  };

  const page = useSearchParams().get("p");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const { user, login } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/articles?p=${page}`, {
          headers: authHeader(),
        });
        if (res?.data?.data) setData(() => res?.data?.data);
      } catch (err) {
        if (err.response?.status === 401) router.push("/auth");
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
              <NewsItem
                data={ele}
                key={index}
                markRead={markAsRead}
                index={index + 1}
                deleteData={deleteData}
              />
            ))}
        </tbody>
      </table>
      <Link href={`/?p=${parseInt(page ? page : "1") + 1}`}>More</Link>
    </main>
  );
}
