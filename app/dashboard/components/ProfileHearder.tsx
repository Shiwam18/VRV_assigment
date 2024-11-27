"use client"
import Link from "next/link";


const menus = [
  { id: 1, href: "/dashboard/settings-profile", title: "Profile" },
  { id: 2, href: "/dashboard/settings-application", title: "Application" },
  { id: 3, href: "/dashboard/settings-security", title: "Security" },
  { id: 4, href: "/dashboard/settings-activity", title: "Activity" },
  { id: 5, href: "/dashboard/settings-privacy", title: "Privacy" },
  { id: 6, href: "/dashboard/settings-payment-method", title: "Payment Method" },
  { id: 7, href: "/dashboard/settings-api", title: "API" },
  { id: 8, href: "/dashboard/settings-fees", title: "Fees" },
];

const ProfileHeader = ({ pageTitle, children, activeMenuID }:any) => {
  return (
    <>
      <div className="row">
        <div className="col-xxl-12">
          <div className="page-title">
            <h4>{pageTitle}</h4>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="settings-menu">
                {menus.map((menus) => (
                  <Link
                    key={menus.id}
                    className={activeMenuID == menus.id ? "active" : ""}
                    href={`/${menus.href}`}
                  >
                    {menus.title}
                  </Link>
                ))}
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileHeader;
