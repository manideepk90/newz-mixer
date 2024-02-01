"use client";
import "./news-item.css";
import Link from "next/link";
import axios from "axios";
import { dateDifference } from "./../../lib/dateDifference";
import { authHeader } from "../../lib/services/auth";

export default function NewsItem({ key, data, index, deleteData, markRead }) {
  const hideTheData = async () => {
    try {
      const res = await axios.post(
        `/api/hide?newsId=${data?.hackerId}`,
        {},
        {
          headers: authHeader(),
        }
      );
      if (res.data) {
        deleteData(data?.hackerId);
      }
    } catch (err) {}
  };
  const markAsRead = async () => {
    try {
      const res = await axios.post(
        `/api/markAsRead?newsId=${data?.hackerId}`,
        {},
        {
          headers: authHeader(),
        }
      );
      if (res.data.isRead) {
        markRead(data?.hackerId);
      }
    } catch (err) {}
  };
  return (
    <>
      <tr className="text-lg news-item">
        <td className="text-zinc-600">{index}</td>
        <td className="text-zinc-600">
          <button>▲</button>
        </td>
        <Link href={data?.url}>{data?.title} </Link>
        <span className="text-zinc-600 text-sm">({data?.site})</span>
        <span
          onClick={markAsRead}
          className="text-zinc-600 text-sm cursor-pointer"
        >
          {data?.UserActions[0]?.isRead ? "Mark As unread" : "Mark As read"}
        </span>
      </tr>
      <tr>
        <td colSpan="2"></td>
        <td>
          <p className="text-zinc-600 text-sm">
            {`${data?.upvotes} points by ${data?.user} | `}
            <span title={data?.postedOn}>
              {dateDifference(new Date(), data.postedOn)}
            </span>{" "}
            |{" "}
            <span onClick={hideTheData} className="cursor-pointer">
              Hide
            </span>{" "}
            | <span>{data?.comments} comments</span>
          </p>
        </td>
      </tr>
    </>
  );
}
