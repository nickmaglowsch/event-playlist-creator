import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const tabActive = (href: string): string => {
    let className = "tab";
    if (router.pathname === href) {
      className += " tab-active";
    }

    return className;
  };

  const isPrimaryPage = router.pathname.split("/").length === 2;

  return (
    <div className="navbar flex justify-between bg-base-100">
      <a className="btn btn-ghost text-xl normal-case">PlayLists</a>

      {isPrimaryPage && (
        <div className="tabs tabs-boxed">
          <Link href="/" className={tabActive("/")}>
            Em alta
          </Link>
          <Link href="/my-events" className={tabActive("/my-events")}>
            Meus Eventos
          </Link>
          <Link href="/i-am-going" className={tabActive("/i-am-going")}>
            Eventos confirmados
          </Link>
        </div>
      )}
      <div className="dropdown-end dropdown">
        <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
          <div className="w-10 rounded-full">
            <img
              width={10}
              height={10}
              alt="avatar"
              src={
                sessionData?.user?.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQS-JMTESlO6eTlnsnSlmSL0ZMK6Cplzi-Lg&usqp=CAU"
              }
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <div className="cursor-pointer">Profile</div>
          </li>
          <li>
            <div className="cursor-pointer" onClick={() => void signOut()}>
              Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
