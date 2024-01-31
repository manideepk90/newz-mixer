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
          isRead: !exist.isRead,
        },
      });
    await prisma.userActions.create({
      data: {
        userId: req?.user?.id,
        newsArticleId: newsId,
        isRead: true,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
export default WithAuth(handler);
