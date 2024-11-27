"use client"

import { createNewUser, updateAdminUsers } from "@/actions/rbac";
import { Role, userStatus } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "react-toastify";


export default function Form ({data}:{data:any}) {
    const userData = data?data:null;
    // console.log(data,"The is data")

    // console.log(coinsData,"the coins Data in client component.")
    const router = useRouter();
    const [username, setUserName] = useState<string>(userData?.username);
    const [password, setPassword] = useState<string>(userData?.password);
    const [role, setRole] = useState<Role>(userData?.role);
    const [status, setStatus] = useState<userStatus>(userData?.status);

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        const Formdata = {
            username,
            password,
            role,
            status,
        }
        // console.log(Formdata,"the formdata");

        if(userData!=null){
            const response = await updateAdminUsers(userData.id, Formdata);
            // console.log(response,"the response after updation in db.")
            if(response.status==200) {
                toast.success("User updation successfull");
                router.push("/dashboard");
            }else{
                toast.error("someting went wrong!")
            }
        }else{
            const response  = await createNewUser(Formdata);
            // console.log(response, "the response");
            
            if(response?.status==200) {
                toast.success("New User Added successfully!")
                router.push("/dashboard")
            }
        }
    }

    return (
        <div className="card-body">
            
            <div className="row">
            
           
            <div className="col-xxl-12">
                <div className="card">
                <div className="card-header">
                    <h1 className="card-title">{userData==null?"Add New User ":"Update User"}</h1>
                </div>
                <div className="card-body">
                <form
                    method="post"
                    name="myform"
                    className="personal_validate"
                    onSubmit={handleSubmit}
                    >
                    <div className="row g-4">
                        <div className="col-xxl-6 col-xl-6 col-lg-6">
                        <label className="form-label">User Name <span className="text-danger">*</span></label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="username here"
                            name="username"
                            value={username}
                            onChange={(e)=>setUserName(e.target.value)}
                        />
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6">
                        <label className="form-label">Password<span className="text-danger">*</span></label>
                        <input
                            type="password"
                            required
                            className="form-control"
                            placeholder="password"
                            name="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        </div>

                        
                        

                        <div className="col-xxl-6 col-xl-6 col-lg-6">
                            <label className="form-label">Status <span className="text-danger">*</span></label>
                            <select className="form-select" name="status" value={status} onChange={(e)=>setStatus(e.target.value as userStatus)} required>
                                <option value="">Select</option>
                                <option value={userStatus.ACTIVE}>ACTIVE</option>
                                <option value={userStatus.INACTIVE}>INACTIVE</option>
                            </select>
                        </div>

                        <div className="col-xxl-6 col-xl-6 col-lg-6">
                            <label className="form-label">Role <span className="text-danger">*</span></label>
                            <select className="form-select" name="role" value={role} onChange={(e)=>setRole(e.target.value as Role)} required>
                                <option value="">Select</option>
                                <option value={Role.Admin}>Admin</option>
                                <option value={Role.SuperAdmin}>SuperAdmin</option>
                            </select>
                        </div>

                        <div className="col-12">
                            <Link href="/dashboard" className="btn btn-secondary pl-5 pr-5 waves-effect m-2">Back</Link>
                            
                            <button className="btn btn-success pl-5 pr-5 waves-effect" type="submit">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
                </div>
                </div>
            </div>
            </div>
      </div>
    )
}