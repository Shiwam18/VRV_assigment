"use client"
import React from "react";
import  Link from "next/link";
import { signOut } from "next-auth/react";
import coin from "../../../public/assets/imgs/bitcoin (1).png"
import market from "../../../public/assets/imgs/stock-market.png"
import home from "../../../public/assets/imgs/home.png"
import pair from "../../../public/assets/imgs/pairing.png"
import settings from "../../../public/assets/imgs/gear.png"
import Image from "next/image";

const Sidebar = ({ activeMenu }:{activeMenu:number}) => {
  const menus = [
    { id: 1, href: "/", title: "Home", icon: "icofont-ui-home", flatIcon:home   },
    
  ];
  return (
    <div className="sidebar">
      <div className="brand-logo">
        <Link href={"/"}>
          {/* <Image src={logo} alt="" /> */}
        </Link>
      </div>
      <div className="menu">
        <ul>
          {menus.map((item) => (
            <li key={item.id} className={activeMenu == item.id ? "active" : ""}>
              <Link
                href={item.href}
                title={item.title}
                className={activeMenu == item.id ? "active" : ""}
              >
                <span>
                  <i><Image src={item?.flatIcon} alt="" width={20} height={20}/></i>
                </span>
                <span className="text-white">{item?.title}</span>
              </Link>
            </li>
          ))}

          <li className="logout">
            <Link onClick={()=>signOut()} href={"/"} title="Signout">
              <span>
                <i className="icofont-power"></i>
              </span>
            </Link>
          </li>
        </ul>

        <p className="copyright">
          &#169; <Link href={"/"}>VRV</Link>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
