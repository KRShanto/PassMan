import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Password from "../../../models/password";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import UserType from "../../../types/user";
import { NextAuthOptions } from "next-auth";
import response from "../../../lib/response";
import crypto from "crypto";

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

    // **************** Decrypt the passwords ****************
    const key = process.env.PASSWORD_SALT as string;
    passwords.forEach((password) => {
      const iv = Buffer.from(password.iv, "hex");
      const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(key),
        iv
      );
      let decrypted = decipher.update(password.password, "hex", "utf8");

      decrypted += decipher.final("utf8");
      password.password = decrypted;
    });

    // remove the iv from the response
    // passwords.forEach((password) => {
    //   delete password.iv;
    // });
    passwords.forEach((password) => {
      password.iv = "";
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
