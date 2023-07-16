import React from "react";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl normal-case">PlayLists</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
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
    </div>
  );
};

export default Header;
