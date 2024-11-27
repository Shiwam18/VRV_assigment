"use client"
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Role, userStatus } from "@prisma/client";
import React from "react";
import Link from "next/link";
import logo from "@/public/assets/vrv-logo.jpeg";
import { createNewUser } from "@/actions/rbac";
import { toast } from "react-toastify";

const SignUp = () => {
  const session = useSession();
  useEffect(()=>{
    if(session.status=='authenticated') router.push('/dashboard')
  },[session])
  const router = useRouter();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>(Role.Admin);

    const handleSubmit = async() =>{
        const Formdata = {
            username, password, status:userStatus.ACTIVE, role
        }
    const SignUp_response = await createNewUser(Formdata);
        if(password!=confirmPassword){
            toast.error("passwords did not match!")
            return;
        }
        if(SignUp_response?.status==200){
            console.log("login success full", SignUp_response)
            toast.success("Sign Up successFull Now login!")
            router.push('/dashboard');
        }else{
            toast.error(`${SignUp_response?.response}`);
        }
    }
  return (
    <div className="authincation section-padding">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-xl-5 col-md-6">
            <div className="mini-logo text-center my-4">
              <Link href={"/"}>
				    <Image src={logo} alt="" width={200} />
              </Link>
              <h4 className="card-title mt-3">Sign in to VRV Admintrator.</h4>
            </div>
            <div className="auth-form card">
              <div className="card-body">
                <form
                  name="myform"
                  className="signin_validate row g-3"
                  action={handleSubmit}
                >
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="jhon@example.com"
                      name="username"
                      required
					  value={username}
					  onChange={(e)=>setUsername(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      required
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
					  value={password}
					  onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      required
                      type="password"
                      className="form-control"
                      placeholder="CofirmPassword"
                      name="ConfirmPassword"
					  value={confirmPassword}
					  onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                  <select required value={role} className="form-select" name="role" onChange={(e)=>setRole(e.target.value as Role)} aria-label="Default select example">
                    <option value="">Select Role</option> 
                    <option value={Role.Admin}>Admin</option>
                    <option value={Role.SuperAdmin}>Super-admin</option>
                  </select>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign Up
                    </button>
                  </div>
                </form>
                <p className="mt-3 mb-0">
                  Already have an account{" "}
                  <Link className="text-primary" href={"/"}>
                    Log In
                  </Link>
                </p>
              </div>
            </div>
            <div className="privacy-link">
              <Link href={"#"}>
                Have an issue with 2-factor authentication?
              </Link>
              <br />
              <Link href={"#"}>Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
