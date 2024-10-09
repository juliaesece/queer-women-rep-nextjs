"use server"

import EmailProvider from "next-auth/providers/email"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../lib/mongo";
import { getUserByEmail } from "./getUserByEmail";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    pages: {
        signIn: '/signin',
        //     signOut: '/auth/signout',
        //     error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/verify-request', // (used for check email message)
        newUser: '/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            const DBuser = await getUserByEmail(session.user.email)
            session.user.username = DBuser.username
            session.user.id = DBuser._id
            return session
        }
    }
}