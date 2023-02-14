import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Password from "../../../models/password";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import UserType from "../../../types/user";
import { NextAuthOptions } from "next-auth";
import response from "../../../lib/response";

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
    return response(res, {
      type: "UNAUTHORIZED",
      msg: "You need to log in first to get passwords",
    });
  }

  // ************** Get the passwords **************
  try {
    const passwords = await Password.find({
      userId: (session.user as UserType)._id,
    });

    return response(res, {
      type: "SUCCESS",
      data: passwords,
    });
  } catch (error) {
    console.log(error);
    return response(res, {
      type: "SERVER_ERROR",
      msg: "Something went wrong",
    });
  }
}
