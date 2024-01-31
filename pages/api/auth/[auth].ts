import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { comparePasswords, hashPassword } from "./../../../lib/hashPassword";
import jwt from "jsonwebtoken";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { auth } = req.query;
  const { body } = req;
  switch (req.method) {
    case "POST":
      if (auth === "login") {
        const user = await prisma.user.findFirst({
          where: {
            email: body?.email,
          },
        });
        if (!user) res.status(403).json({ error: "No user found" });
        if (await comparePasswords(body?.password, user?.password)) {
          const payload = {
            id: user?.id,
          };
          try {
            const token = jwt.sign(payload, process.env.ACCESS_KEY_TOKEN, {
              expiresIn: 215451,
            });

            res.status(200).json({
              success: true,
              token: "Bearer " + token,
              email: user?.email,
            });
          } catch (err) {
            res.status(400).json({
              success: false,
            });
          }
        }
        res.status(403).json({ error: "Invalid Credentials" });
      } else if (auth === "signup") {
        const user = await prisma.user.findFirst({
          where: {
            email: body?.email,
          },
        });
        if (user)
          res.status(400).json({ error: "User already exists! please login" });
        if (body?.password?.length >= 8) {
          const data = await prisma.user.create({
            data: {
              email: body?.email,
              password: await hashPassword(body?.password),
            },
          });
          if (data) {
            const payload = {
              id: user?.id,
            };
            try {
              const token = jwt.sign(payload, process.env.ACCESS_KEY_TOKEN, {
                expiresIn: 215451,
              });

              res.status(200).json({
                success: true,
                token: "Bearer " + token,
                email: user?.email,
              });
            } catch (err) {
              res.status(400).json({
                success: false,
              });
            }
          }
          res.status(400).json({ error: "failed to create user" });
        }
        res.status(400).json({ error: "Enter valid Password" });
      }
      res.status(400).json({ error: "No Api" });
      break;
    default:
      res.status(400).json({ error: "API Is not available" });
  }
}
