import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import { compare } from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sign, verify } from "jsonwebtoken";

async function generateTokens(userId: string) {
  const accessToken = sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "15m" });
  const refreshToken = sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });

  await User.findByIdAndUpdate(userId, { refreshToken });
  return { accessToken, refreshToken };
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) return null;

        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) return null;

        const { accessToken, refreshToken } = await generateTokens(user.id);
        return { id: user.id, accessToken, refreshToken };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.userId = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000;
        return token;
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      try {
        verify(token.refreshToken as string, process.env.JWT_SECRET!);
        const { accessToken, refreshToken } = await generateTokens(token.userId as string);
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000;
      } catch (err) {
        console.error("Token refresh failed:", err);
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.userId as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET!,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
