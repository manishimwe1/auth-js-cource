import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import { User } from "./lib/models/user";
import { compare } from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    user: {
      role: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      name: "credetials",
      //default page api/auth/signin
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = (credentials.email as string) || undefined;
        const password = (credentials.password as string) || undefined;

        if (!email || !password) {
          throw new CredentialsSignin("please provide email and password");
        }

        await connectDB();

        const user = await User.findOne({ email }).select("+password +role");

        if (!user)
          throw new CredentialsSignin({ cause: "Invalid email and password" });
        if (!user.password)
          throw new CredentialsSignin({ cause: "Invalid password" });

        const isMatched = await compare(password, user.password);

        if (!isMatched) throw new Error("Invalid  password did not match");

        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          id: user.id,
        };

        //return user to cookies
        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        (session.user.id = token.sub),
          (session.user.role = token?.role as string);
      }

      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        //@ts-ignore
        token.role = user?.role;
      }
      return token;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          await connectDB();
          const existUser = await User.findOne({ email });

          if (!existUser) {
            await User.create({
              firstName: name,
              email,
              image,
              authProviderId: id,
            });
          } else {
            return true;
          }
        } catch (error: any) {
          console.log("error in creating user", error?.message);
        }
      }

      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});
