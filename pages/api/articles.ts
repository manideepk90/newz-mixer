import { NextApiRequest, NextApiResponse } from "next";
import { fetchNews } from "./scrapper/scrapper";
import prisma from "../../lib/prisma";
import withAuth from "./../../lib/authmiddleware";
async function updateOrCreateNewsArticle(article) {
  try {
    const exist = await prisma.newsArticle.findFirst({
      where: {
        hackerId: article.hackerId,
      },
    });
    if (exist)
      await prisma.newsArticle.update({
        where: {
          hackerId: article.hackerId,
        },
        data: {
          upvotes: article.upvotes,
          rank: article.rank,
          comments: article.comments,
        },
      });
    else
      await prisma.newsArticle.create({
        data: { ...article, postedOn: new Date(article.postedOn) },
      });
  } catch (err) {
    console.log(`failed to store ${article.hackerId}`);
  }
}

async function handler(req: any, res: NextApiResponse) {
  const limit = 30;
  let page = 0;
  if (req.query.p) {
    page = parseInt(req.query.p ? req?.query?.p : "1") - 1;
  }
  console.log(req.user.id);
  const data1 = await fetchNews(page + 1);
  for (const data of data1) {
    updateOrCreateNewsArticle(data);
  }
  const data = await prisma.newsArticle.findMany({
    where: {
      NOT: {
        UserActions: {
          some: {
            userId: req?.user?.id,
            isHidden: true,
          },
        },
      },
    },
    take: 30,
    skip: page ? page * limit : 0,
    orderBy: {
      postedOn: "desc",
    },
  });
  if (data) res.status(200).json({ data: data });
  else {
    res.status(200).json({ data: [], scrapping: true });
  }
}
export default withAuth(handler);
