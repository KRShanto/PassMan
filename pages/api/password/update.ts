import { NextAuthOptions } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Password from "../../../models/password";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
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
  const { _id, title, website, password } = req.body;

  // ************** Check if all the required fields are present **************
  if (!_id || !title || !password) {
    return response(res, {
      type: "INVALID",
      msg: "Title and password and _id are required",
    });
  }

  try {
    await Password.updateOne(
      { _id },
      {
        $set: {
          title,
          website,
          password,
        },
      }
    );

    return response(res, {
      type: "SUCCESS",
      msg: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    return response(res, {
      type: "SERVER_ERROR",
      msg: "Something went wrong",
    });
  }
}
