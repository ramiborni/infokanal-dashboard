import { NextAuthOptions, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const result = await axios.post("https://api.infokanal.com/login", credentials);
  
        // If no error and we have user data, return it
        if (result.status === 200) {
          return {
            id:  credentials?.username,
            username : credentials?.username
          } as User
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
  pages: {
    signIn: "/", //sigin page
  },
  callbacks: {
    async redirect({url, baseUrl}) {
      return url.startsWith(baseUrl) ? url : baseUrl + '/dashboard';
    }
  },
};
