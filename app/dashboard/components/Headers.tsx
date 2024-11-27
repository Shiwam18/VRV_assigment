"use client"

import React from "react"
import Image from "next/image";
import { signOut } from "next-auth/react";
import Dropdown from "react-bootstrap/Dropdown";
import Link from "next/link";
import logo from "@/public/assets/vrv-logo.jpeg"
import thumb from "@/public/assets/images/profile/2.png";

const Header = () => {
  const onClick = () => {
    document.querySelector("body")?.classList.toggle("dark-theme");
  };

  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="header-content">
              <div className="header-left">
                <div className="brand-logo">
                  <Link href={"/"}>
                    {/* <Image src={logo} alt="" width={50} height={0}/> */}
                    {/* <span>Qash</span> */}
                  </Link>
                </div>
                <div className="search">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Here"
                      />
                      <span className="input-group-text">
                        <i className="icofont-search"></i>
                      </span>
                    </div>
                  </form>
                </div>
              </div>

              <div className="header-right">
                <div className="dark-light-toggle" onClick={() => onClick()}>
                  <span className="dark">
                    <i className="icofont-moon"></i>
                  </span>
                  <span className="light">
                    <i className="icofont-sun-alt"></i>
                  </span>
                </div>
                <Dropdown className="notification">
                  <Dropdown.Toggle>
                    <div className="notify-bell" data-toggle="dropdown">
                      <span>
                        <i className="icofont-alarm"></i>
                      </span>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="notification-list mt-4"
                    align="end"
                  >
                    <h4>Announcements</h4>
                    <div className="lists">
                      <Link href={"#"} className="">
                        <div className="d-flex align-items-center">
                          <span className="mr-3 icon success">
                            <i className="icofont-check"></i>
                          </span>
                          <div>
                            <p>Account created successfully</p>
                            <span>2020-11-04 12:00:23</span>
                          </div>
                        </div>
                      </Link>
                      <Link href={"#"} className="">
                        <div className="d-flex align-items-center">
                          <span className="mr-3 icon fail">
                            <i className="icofont-close"></i>
                          </span>
                          <div>
                            <p>2FA verification failed</p>
                            <span>2020-11-04 12:00:23</span>
                          </div>
                        </div>
                      </Link>
                      <Link href={"#"} className="">
                        <div className="d-flex align-items-center">
                          <span className="mr-3 icon success">
                            <i className="icofont-check"></i>
                          </span>
                          <div>
                            <p>Device confirmation completed</p>
                            <span>2020-11-04 12:00:23</span>
                          </div>
                        </div>
                      </Link>
                      <Link href={"#"} className="">
                        <div className="d-flex align-items-center">
                          <span className="mr-3 icon pending">
                            <i className="icofont-warning"></i>
                          </span>
                          <div>
                            <p>Phone verification pending</p>
                            <span>2020-11-04 12:00:23</span>
                          </div>
                        </div>
                      </Link>

                      <Link href={"./settings-activity"}>
                        More <i className="icofont-simple-right"></i>
                      </Link>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown className="profile_log">
                  <Dropdown.Toggle>
                    <span className="thumb">
                      <Image src={thumb} alt="" width="30" />
                    </span>
                    <span className="arrow">
                      <i className="icofont-angle-down"></i>
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className=" mt-4" align="end">
                    <div className="user-email">
                      <div className="user">
                        <span className="thumb">
                          <Image src={thumb} alt="" width={40} height={38} />
                        </span>
                        <div className="user-info">
                          <h5>Jannatul Maowa</h5>
                          <span>Qash.inc@gmail.com</span>
                        </div>
                      </div>
                    </div>

                    <div className="user-balance">
                      <div className="available">
                        <p>Available</p>
                        <span>0.00 BTC</span>
                      </div>
                      <div className="total">
                        <p>Total</p>
                        <span>0.00 USD</span>
                      </div>
                    </div>
                    <Link href={"profile"} className="dropdown-item">
                      <i className="icofont-ui-user"></i>Profile
                    </Link>
                    <Link href={"/wallet"} className="dropdown-item">
                      <i className="icofont-wallet"></i>Wallet
                    </Link>
                    <Link href={"/settings-profile"} className="dropdown-item">
                      <i className="icofont-ui-settings"></i> Setting
                    </Link>
                    <Link href={"/settings-activity"} className="dropdown-item">
                      <i className="icofont-history"></i> Activity
                    </Link>
                    <Link href={"/lock"} className="dropdown-item">
                      <i className="icofont-lock"></i>Lock
                    </Link>
                    <Link onClick={()=>signOut()} href={"/"} className="dropdown-item logout">
                      <i className="icofont-logout"></i> Logout
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

