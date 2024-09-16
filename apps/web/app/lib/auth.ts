import db from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1234567890", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          async authorize(credentials: any) {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.client.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.email
                    }
                }
                return null;
            }
            // try {
            //     const user = await db.user.create({
            //         data: {
            //             number: credentials.phone,
            //             password: hashedPassword
            //         }
            //     });
            
            //     return {
            //         id: user.id.toString(),
            //         name: user.name,
            //         email: user.number
            //     }
            // } catch(e) {
            //     console.error(e);
            // }

            return null
          },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            allowDangerousEmailAccountLinking: true,
          }),
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
  