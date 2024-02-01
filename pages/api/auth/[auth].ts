import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { comparePasswords, hashPassword } from "../../../lib/hashPassword";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { auth } = req.query;
  const { body } = req;
  try {
    switch (req.method) {
      case "POST":
        try {
          if (auth === "login") {
            const user = await prisma.user.findFirst({
              where: {
                email: body?.email,
              },
            });

            if (!user) {
              return res.status(403).json({ error: "No user found" });
            }

            if (await comparePasswords(body?.password, user?.password)) {
              const payload = {
                id: user.id,
              };

              const token = jwt.sign(payload, process.env.ACCESS_KEY_TOKEN, {
                expiresIn: 215451,
              });

              return res.status(200).json({
                success: true,
                token: "Bearer " + token,
                email: user.email,
              });
            } else {
              return res.status(403).json({ error: "Invalid Credentials" });
            }
          }
          //  else if (auth === "signup") {
          //   const user = await prisma.user.findFirst({
          //     where: {
          //       email: body?.email,
          //     },
          //   });

          //   if (user) {
          //     return res
          //       .status(400)
          //       .json({ error: "User already exists! Please login" });
          //   }

          //   if (body?.password?.length >= 8) {
          //     const data = await prisma.user.create({
          //       data: {
          //         email: body?.email,
          //         password: await hashPassword(body?.password),
          //       },
          //     });

          //     if (data) {
          //       const payload = {
          //         id: data.id,
          //       };

          //       const token = jwt.sign(payload, process.env.ACCESS_KEY_TOKEN, {
          //         expiresIn: 215451,
          //       });

          //       return res.status(200).json({
          //         success: true,
          //         token: "Bearer " + token,
          //         email: data.email,
          //       });
          //     } else {
          //       return res.status(500).json({ error: "Failed to create user" });
          //     }
          //   } else {
          //     return res.status(400).json({
          //       error: "Enter a valid password (at least 8 characters)",
          //     });
          //   }
          // } else {
          //   return res.status(400).json({ error: "No Api" });
          // }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      default:
        return res.status(400).json({ error: "API is not available" });
    }
  } catch (err) {
    console.log(err);
  }
}
