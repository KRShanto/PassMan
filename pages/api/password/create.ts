import { NextAuthOptions } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Password from "../../../models/password";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import UserType from "../../../types/user";
import response from "../../../lib/response";

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
    return response(res, {
      type: "UNAUTHORIZED",
      msg: "You need to log in first to create password",
    });
  }

  // ************** Get the data from the request **************
  const {  username, website, password } = req.body;

  // ************** Check if all the required fields are present **************
  if (!username || !password) {
    return response(res, {
      type: "INVALID",
      msg: "Username and password are required",
    });
  }

  // ************** Create the password **************
  try {
    const newPass = new Password({
      userId: (session.user as UserType)._id,
      username,
      website,
      password,
    });

    await newPass.save();

    return response(res, {
      type: "SUCCESS",
      msg: "Password created successfully",
      data: newPass,
    });
  } catch (error) {
    console.log(error);
    return response(res, {
      type: "SERVER_ERROR",
      msg: "Something went wrong",
    });
  }
}
