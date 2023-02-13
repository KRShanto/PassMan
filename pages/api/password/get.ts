import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Password from "../../../models/password";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import UserType from "../../../types/user";
import { NextAuthOptions } from "next-auth";

// Get all the passwords of the logged in user
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
      message: "You need to log in first to get passwords",
    });
  }

  // ************** Get the passwords **************
  try {
    const passwords = await Password.find({
      userId: (session.user as UserType)._id,
    });

    // return res.status(200).json({ type: "SUCCESS", data: passwords });
    // sleep for 5 sec

    return res.status(200).json({ type: "SUCCESS", data: passwords });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ type: "ERROR", message: "Something went wrong" });
  }
}
