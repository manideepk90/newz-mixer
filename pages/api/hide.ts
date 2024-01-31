import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import WithAuth from "../../lib/authmiddleware";

async function handler(req: any, res: NextApiResponse) {
  try {
    const { newsId } = req.query;
    const exist = await prisma.userActions.findFirst({
      where: {
        userId: req?.user?.id,
        newsArticleId: newsId,
      },
    });
    if (exist)
      await prisma.userActions.update({
        where: {
          id: exist.id,
        },
        data: {
          isHidden: true,
        },
      });
    await prisma.userActions.create({
      data: {
        userId: req?.user?.id,
        newsArticleId: newsId,
        isHidden: true,
      },
    });
    res.status(201).json({ hidden: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "failed to hide" });
  }
}

export default WithAuth(handler);
