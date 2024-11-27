import React from "react";
import Form from "../create/Form";
import { getAllUsers, getAllUsersById } from "@/actions/rbac";


export default async function UpdateUser ({params}:{params: Promise<{id:string}>}) {
    const id = (await params).id;
    // console.log(id, "the to catch params");
    const userData = await getAllUsersById(parseInt(id));
    // console.log(userData,"the coinsData in page.tsx");
    
    return (
        <Form data = {userData?.response} />
    )

}