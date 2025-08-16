import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    };
    accessToken: string;
  }

  interface User {
    id: string;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}
