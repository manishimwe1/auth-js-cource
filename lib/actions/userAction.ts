"use server";
import { redirect } from "next/navigation";
import connectDB from "../db";
import { User } from "../models/user";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

const login = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error: any) {
    console.log(error?.message);
  }
  redirect("/");
};

const register = async (formData: FormData) => {
  const firstName = formData.get("firstname");
  const lastName = formData.get("lastname");
  const email = formData.get("email");
  const password = formData.get("password");

  // console.log(firstName,lastname,email,password);
  if (!firstName || !lastName || !email || !password) {
    throw new Error("please fill all fields");
  }

  await connectDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new Error("user already exist");

  const hashPass = await hash(password as string, 12);
  await User.create({ firstName, lastName, email, password: hashPass });

  console.log("user successfully");
  redirect("/login");
};

export { register, login };
