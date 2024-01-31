import axios from "axios";
import * as cheerio from "cheerio";
import { lastValueFrom } from "rxjs";
export async function fetchNews(page: number = 1) {
  try {
    const html = await axios
      .get(`https://news.ycombinator.com/?p=${page}`)
      .then((res) => res.data);

    const $ = cheerio.load(html);
    const elements = $(".athing");
    const data: any = [];
    elements.each((index, element) => {
      const id = $(element).attr("id");
      const rank = $(element).find(".rank").text().trim();
      const title = $(element).find(".title a").text().trim();
      const link = $(element).find(".title a").attr("href");
      const site = $(element).find(".sitestr").text().trim();

      const score = $(element)
        .next()
        .find(".score")
        .text()
        .trim()
        ?.replace(" points", "");
      const user = $(element).next().find(".hnuser").text().trim();
      const age = $(element).next().find(".age").attr("title");
      const comments = $(element)
        .next()
        .find(".subtext span.subline a:contains('comments')")
        .text()
        .trim()
        ?.replace(" comments", "");
      data.push({
        hackerId: id,
        rank: rank.replace(".", ""),
        title: title,
        url: link,
        site: site,
        upvotes: parseInt(score ? score : "0"),
        user: user,
        postedOn: age,
        comments: parseInt(comments ? comments : "0"),
      });
    });
    return data;
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}
