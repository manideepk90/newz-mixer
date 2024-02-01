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
    if (exist) {
      const result = await prisma.userActions.update({
        where: {
          id: exist.id,
        },
        data: {
          isRead: !exist.isRead,
        },
      });
      return res.status(201).json({ isRead: result.isRead });
    }
    await prisma.userActions.create({
      data: {
        userId: req?.user?.id,
        newsArticleId: newsId,
        isRead: true,
      },
    });
    res.status(201).json({ isRead: true });
  } catch (err) {
    console.log(err);
    res.status(201).json({ error: "failed to mark as read" });
  }
}
export default WithAuth(handler);
