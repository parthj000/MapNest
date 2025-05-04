import { clientPromise } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import UserModel from "../../../../../models/User";
import GoogleProvider from "next-auth/providers/google";




export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    
  ],
  callbacks: {
    signIn: async function ({ user, account }: { user: any; account: any }) {
      try {
        await clientPromise();

        console.log(user,account);

        const existUser = await UserModel.findOne({gmail:user.email});
        if(existUser){
          return true;
        }
        const newUser = new UserModel({
          gmail: user.email,
          name: user.name,
          provider: account.provider,
          profileImage:user.image
        });
        const saved = await newUser.save();
        console.log(saved);
        console.log(user, account);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
