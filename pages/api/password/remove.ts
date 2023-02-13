import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Password from "../../../models/password";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import UserType from "../../../types/user";
import { NextAuthOptions } from "next-auth";

// Remove a password
// First get the password by id
// Then check if the password belongs to the logged in user
// Then remove the password
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const session = await getServerSession(
    req,
    res,
    authOptions as NextAuthOptions
  );

  // ************** Check if user is logged in **************
  if (!session) {
    return res.status(401).json({
      type: "UNAUTHORIZED",
      message: "You need to log in first to remove password",
    });
  }

  const { _id } = req.body;

  // ************** Get the password **************
  try {
    const password = await Password.findById(_id);

    if (!password) {
      return res.status(404).json({
        type: "NOTFOUND",
        message: "Password not found",
      });
    }

    // ************** Check if the password belongs to the logged in user **************
    if ((session.user as UserType)._id !== password.userId.toString()) {
      return res.status(401).json({
        type: "UNAUTHORIZED",
        message: "You are not authorized to remove this password",
      });
    }

    // ************** Remove the password **************
    await password.remove();

    return res
      .status(200)
      .json({ type: "SUCCESS", message: "Password removed successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ type: "ERROR", message: "Something went wrong" });
  }
}
