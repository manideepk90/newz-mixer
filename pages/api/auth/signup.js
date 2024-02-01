import prisma from "../../../lib/prisma";
import { hashPassword } from "../../../lib/hashPassword";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { body } = req;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body?.email,
      },
    });

    if (user) {
      return res
        .status(400)
        .json({ error: "User already exists! Please login" });
    }

    if (body?.password?.length >= 8) {
      const data = await prisma.user.create({
        data: {
          email: body?.email,
          password: await hashPassword(body?.password),
        },
      });

      if (data) {
        const payload = {
          id: data.id,
        };

        const token = jwt.sign(payload, process.env.ACCESS_KEY_TOKEN, {
          expiresIn: 215451,
        });

        return res.status(200).json({
          success: true,
          token: "Bearer " + token,
          email: data.email,
        });
      } else {
        return res.status(500).json({ error: "Failed to create user" });
      }
    } else {
      return res.status(400).json({
        error: "Enter a valid password (at least 8 characters)",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
