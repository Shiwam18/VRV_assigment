import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient, Role, userStatus } from '@prisma/client'

import bcrypt from "bcrypt"

const prisma = new PrismaClient();
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {
                    
                    type: 'text',
                    placeholder: 'jhon@example.com'
                },
                password:{
                    
                    type:'password',
                    placeholder:'Password',
                },
                role: {
                    type: 'select',
                    options: [
                        {value: Role.Admin },
                        {value: Role.SuperAdmin},
                    ],
                }
            },
            authorize: async (credentials): Promise<any> => {
                if(!credentials ){
                    // console.log("NO credentials setn to authOptions!")
                    return null;
                }
                const {username, password, role} = credentials;
                // console.log(username,password, role, "here are the username and password")
                
                const user = await prisma.admin_users.findFirst({
                    where:{
                        
                        AND:[
                            {username:username},
                            {role:role as Role},
                        ]
                    },
                });

                // console.log(user,"printing the users")

                if(!user) {
                    // console.log("No user found with this email");
                    return null;
                }
                if(user.status==userStatus.INACTIVE) {
                    return null;
                }
                const hashPassword = bcrypt.hash(password, 10);

                const match = await bcrypt.compare(password, user.password);
                if(match){
                    console.log(user, "this is user in authoptions!")
                    return user;
                }
                else{
                    console.log(user, "Incorrect credentials!")
                    return null;
                }
            }
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            // Persist user data in the JWT token
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
                token.status = user.status;
                token.image = user.image;
            }
            return token;
        },

        async session({ session, token }:{session:any, token:any}) {
            // Add custom user fields to the session object
            if (token) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.role = token.role;
                session.user.status = token.status;
                session.user.image = token.image;
            }
            return session;
        }
    },
}