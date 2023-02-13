import { NextAuthOptions } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Password from "../../../models/password";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import UserType from "../../../types/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(
    req,
    res,
    authOptions as NextAuthOptions
  );
  await dbConnect();

  // ************** Check if user is logged in **************
  if (!session) {
    return res.status(401).json({
      type: "UNAUTHORIZED",
      message: "You need to log in first to create password",
    });
  }

  // ************** Get the data from the request **************
  const { title, website, password } = req.body;

  // ************** Check if all the required fields are present **************
  if (!title || !password) {
    return res
      .status(400)
      .json({ type: "INVALID", message: "Title and password are required" });
  }

  // ************** Create the password **************
  console.log("User id: ", (session.user as UserType)._id);
  console.log("User: ", session.user);
  try {
    const newPass = new Password({
      // userId: session.user?._id ,
      userId: (session.user as UserType)._id,
      title,
      website,
      password,
    });

    await newPass.save();

    return res.status(201).json({
      type: "SUCCESS",
      message: "Password created successfully",
      data: newPass,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ type: "ERROR", message: "Something went wrong" });
  }
}
