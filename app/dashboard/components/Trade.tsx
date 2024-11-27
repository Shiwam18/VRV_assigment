"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

import { Role, userStatus } from "@prisma/client";
import { deleteUser, getAllUsers, updateUserStatus } from "@/actions/rbac";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Trade = () => {
  const session = useSession();
  const router = useRouter();
  const [VRV_users, setBhimaxUsers] =useState<[{}]|any>([]);
  const [coins, setCoins] = useState<[{}] | any>([]);
  const [market, setMarket] = useState<[{}] | any>([]);
  const [pairs, setPairs] = useState<[{}] | any>([]);



  const delete_user = async(Id:any)=>{
    const response = await deleteUser(Id);
    getData();
  }

  const getData = async()=>{

    const allUsers = await getAllUsers();
    // console.log(allUsers,"the all users")
 
    setBhimaxUsers(allUsers?.response);
  }

  const updateRowsInCoins = (Id:any) => {
    router.push(`/dashboard/coin/${Id}`);
  }

  const addNewCoin = () => {
    router.push(`/dashboard/coin`)
  }
  const updateRowsInMarkets = async(Id:any) => {
    router.push(`/dashboard/market/${Id}`);
  }
  const updateRowsInPairs = async(Id:any) => {
    router.push(`/dashboard/pair/${Id}`);
  }
  const updateStatus = async(id:number, status:userStatus) => {
    // console.log(id, status, "the update status")
    const response = await updateUserStatus(id, status);
    getData();

  }

  useEffect(()=>{
    const fetchData=async ()=>{
     await getData();

    }
    fetchData()
    
  },[])


  
  const [show, setShow] = useState(false);

  const goToAdminUserDetails = (Id:any) =>{
    router.push(`/dashboard/users/${Id}`);
  }
  return (  
    <>  
      <Sidebar activeMenu={1} />
      
      <div className="row">
        <div className="col-xxl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title">VRV admin Users</h4>
              <a type="button" href="/dashboard/users/create" className="btn btn-primary" >Add new</a>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped responsive-table">
                  <thead>
                    <tr>
                      <th>Usename</th>
                      <th>Role</th>
                      <th>Account Status</th>
                      <th className={session.data?.user?.role==Role.SuperAdmin && session.data?.user?.status==userStatus.ACTIVE?"d-block":"d-none" }>Actions</th>
                      <th>change status</th>
                      <th className={session.data?.user?.role==Role.SuperAdmin && session.data?.user?.status==userStatus.ACTIVE?"d-block":"d-none" }>Super admin access</th>
                    </tr>
                  </thead>
                  <tbody>

                    <>
                      {VRV_users?.length && VRV_users?.map((item:any, idx:number)=>(
                        <tr key={idx}>
                          <td>{item?.username}</td>
                          <td>{item?.role}</td>
                          <td>{item?.status}</td>
                          <td className={session.data?.user?.role==Role.SuperAdmin && session.data?.user?.status==userStatus.ACTIVE?"d-block":"d-none" }><button className="btn btn-warning m-1" onClick={()=>goToAdminUserDetails(item.id)}>update</button></td>
                          <td>
                            
                            <select className={`btn btn-info`} onChange={(e)=>updateStatus(item?.id, e.target.value as userStatus)}>
                              <option value="">Change value</option>
                              <option value={userStatus.ACTIVE}>{userStatus.ACTIVE}</option>
                              <option value={userStatus.INACTIVE}>{userStatus.INACTIVE}</option>
                            </select>
                          </td> 

                          <td className={session.data?.user?.role==Role.SuperAdmin && session.data?.user?.status==userStatus.ACTIVE?"d-block":"d-none" }><button type="button" onClick={()=>delete_user(item?.id)} className="btn btn-danger">Delete User</button></td>
                         
                          
                        </tr>
                      ))}
                    </>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
  );
};

export default Trade;
