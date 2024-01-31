"use client"
import "./news-item.css";
import Link from "next/link";
import { dateDifference } from "./../../lib/dateDifference";

export default function NewsItem({ key, data, index }) {
  const hideTheData = async()=>{

  }
  return (
    <>
      <tr className="text-lg news-item">
        <td className="text-zinc-600">{index}</td>
        <td className="text-zinc-600">
          <button>▲</button>
        </td>
        <Link href={data?.url}>{data?.title} </Link>
        <span className="text-zinc-600 text-sm">({data?.site})</span>
      </tr>
      <tr>
        <td colSpan="2"></td>
        <td>
          <p className="text-zinc-600 text-sm">
            {`${data?.upvotes} points by ${data?.user} | `}
            <span title={data?.postedOn}>
              {dateDifference(new Date(), data.postedOn)}
            </span>{" "}
            | <span onClick={hideTheData}>Hide</span> | <span>{data?.comments} comments</span>
          </p>
        </td>
      </tr>
    </>
  );
}