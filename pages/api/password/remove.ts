import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Password from "../../../models/password";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import UserType from "../../../types/user";
import { NextAuthOptions } from "next-auth";
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
      msg: "You need to log in first to remove password",
    });
  }

  const { _id } = req.body;

  // ************** Get the password **************
  try {
    const password = await Password.findById(_id);

    if (!password) {
      return response(res, {
        type: "NOTFOUND",
        msg: "Password not found",
      });
    }

    // ************** Check if the password belongs to the logged in user **************
    if ((session.user as UserType)._id !== password.userId.toString()) {
      return response(res, {
        type: "UNAUTHORIZED",
        msg: "You are not authorized to remove this password",
      });
    }

    // ************** Remove the password **************
    await password.remove();

    return response(res, {
      type: "SUCCESS",
      msg: "Password removed successfully",
    });
  } catch (error) {
    console.log(error);
    return response(res, {
      type: "SERVER_ERROR",
      msg: "Something went wrong",
    });
  }
}
