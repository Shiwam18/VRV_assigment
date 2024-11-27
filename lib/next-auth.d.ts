// types/next-auth.d.ts
import { Session, User } from "next-auth";
import { Role, userStatus } from '@prisma/client';

declare module "next-auth" {
  export interface User {
    id: number;
    username: string;
    role: Role;
    status: userStatus;
    image?: string | null;
  }

  export interface Session {
    user: User;
  }
}
