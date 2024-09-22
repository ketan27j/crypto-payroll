import db from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            // phone: { label: "Phone number", type: "text", placeholder: "1234567890", required: true },
            email: { label: "Email Id", type: "email", placeholder: "user@email.com", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          async authorize(credentials: any) {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    email: credentials.email
                }
            });

            if (existingUser) {
                // const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                const passwordValidation = credentials.password === existingUser.password;
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.email,
                        role: existingUser.role
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
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role
            }
            token.role = token.role || "User"
            return token
        },
        async session({ token, session }: any) {
            console.log('user session', session);
            session.user.id = token.sub
            session.user.role = token.role
            return session
        }
    }
  }
  