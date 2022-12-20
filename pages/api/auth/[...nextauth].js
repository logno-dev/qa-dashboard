import { compare } from "bcryptjs";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "../../../lib/mongodb";


export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        try {
          const client = await clientPromise

          const db = client.db("authenticate")
          const users = await db.collection("users")

          const query = { email: credentials.username }

          const result = await users.findOne(query)

          return result
        } catch (e) {
          console.log(e)
        }

        const check = await compare(credentials.password, result.password)
        // const user = { id: result._id, email: result.email }


        if (check) {
          // Any object returned will be saved in `user` property of the JWT
          return { id: result._id, email: retrun.email }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, email, credentials }) {
      return true
    },
    async signOut() {
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
      }
      return session;
    }
  }
}

export default NextAuth(authOptions)

