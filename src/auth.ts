import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { getAccountByUserId } from "@/data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  // unstable_update
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    async jwt({ token, account }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const isOAuthUser = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!isOAuthUser;

      // Update
      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        // Update
        session.user.name = token.name;
        session.user.email = token.email!;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  basePath: "/api/auth",
  ...authConfig,
});
