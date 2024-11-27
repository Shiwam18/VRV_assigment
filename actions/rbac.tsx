"use server"
import { PrismaClient, userStatus } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

export const createNewUser = async(Formdata:any) => {
    try {
        const existing_user = await prisma.admin_users.findFirst({
            where:{
                username:Formdata.username,
            }
        })
        if(existing_user){
            return {response:"Username already exists!", status:401};
        }
        const hashed_password = await bcrypt.hash(Formdata.password, 10);
        const new_user = await prisma.admin_users.create({
            data:{
                username:Formdata.username,
                password:hashed_password,
                role:Formdata.role,
                status:Formdata.status
            }
        })
        return {response:"User created successfully!", status:200, data:new_user}

    } catch (error) {
        console.log("error in creating newUsers in rbac.", error);
        return {response:"Error in creating new Users", status:400};
    }
};


export const getAllUsers = async() => {
    // console.log("in the getall user")
    try {
        const response = await prisma.admin_users.findMany();
        return {response:response, status:200};
    } catch (error) {
        return {response:error, status:400};
    }
};

export const getAllUsersById = async(id:number)=>{
    try {
        const response = await prisma.admin_users.findFirst({where:{id}});
        return {response:response, status:200};
    } catch (error) {
        return {response:error, status:400};
    }
};

export const deleteUser = async(id:number)=>{
    try {
        const response = await prisma.admin_users.delete({where:{id}});
        return {response:response, status:200};
    } catch (error) {
        return {response:error, status:400};
    }
};

export const updateUserStatus = async(id:number, status:userStatus)=>{
    try {
        const response = await prisma.admin_users.update({
            where:{
                id
            },
            data:{
                status:status as userStatus,
            }

        });
        return {response:response, status:200};
    } catch (error) {
        return {response:error, status:400};
    }
};

export const updateAdminUsers = async(id:number, Formdata:any)=>{
    const hashed_password = await bcrypt.hash(Formdata.password, 10);
    try {
        const response = await prisma.admin_users.update({
            where:{
                id
            },
            data:{
                username:Formdata.username,
                password:Formdata.hashed_password,
                role:Formdata.role,
                status:Formdata.status as userStatus,
            }

        });
        return {response:response, status:200};
    } catch (error) {
        return {response:error, status:400};
    }
};

