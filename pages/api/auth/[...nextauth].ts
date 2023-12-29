import NextAuth, { AuthOptions } from "next-auth";
import faunadb, { Collection, Client as FaunaClient } from "faunadb";
import { FaunaAdapter } from "@next-auth/fauna-adapter";
import GithubAuthProvider from "next-auth/providers/github";
const q = faunadb.query;

export const faunaDBClient = new FaunaClient({
  secret: process.env.FAUNA_SECRET || "",
  scheme: "http",
  domain: "localhost",
  // port: 8443,
});

const NextAuthOptions: AuthOptions = {
  providers: [
    GithubAuthProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  adapter: FaunaAdapter(faunaDBClient),
};
export default NextAuth(NextAuthOptions);
