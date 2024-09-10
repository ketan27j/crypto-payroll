import db from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";

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
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    toast.success('Logged in successfully');
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }
            toast.error('Username or password is incorrect');
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
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
  