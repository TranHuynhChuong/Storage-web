import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser } from "@/lib/actions/user.actions";

declare module "next-auth" { interface Session { accessToken?: string; user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
    }; } }

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 ngày
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async signIn({ user }) {
      try {
        if (user?.email && user?.name) {
          const { userId } = await createUser({
            accountId: user.id,
            fullName: user.name,
            email: user.email,
            avatar: user.image,
          });
          user.id = userId;
        }
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error);
        return false;
      }
    },

     async redirect({ url, baseUrl }) {
    if (url.startsWith("/")) return `${baseUrl}${url}`
    else if (new URL(url).origin === baseUrl) return url
    return baseUrl
  },
      
    async jwt({ token, user, account }) {
      if (account && user) {
          token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
          session.accessToken = token.accessToken as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
