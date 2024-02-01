import prisma from "../../../lib/prisma";
import { comparePasswords } from "../../../lib/hashPassword";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { body } = req;
  try {
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
