import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { userDetail } from "./Data";

const UserDropdown = () => {
  const userData = userDetail;
  const history = useHistory();

  const userEmail = localStorage.getItem("ADMINEMAIL");

  const handleClick = () => {
    localStorage.removeItem("ADMIN");
    localStorage.removeItem("ADMINEMAIL");
    history.push("/");
  };

  return (
    <>
      <li className="dropdown">
        <a
          href="/"
          data-toggle="dropdown"
          className="nav-link dropdown-toggle nav-link-lg nav-link-user"
        >
          <img
            alt="image"
            src={userData.userImg}
            className="rounded-circle mr-1"
          />
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <div style={{ color: "#6777ef", textAlign: "center" }}>
            {userEmail ? <div>{userEmail}</div> : <span>Login</span>}
          </div>
          {userData.datas.map((data, idata) => {
            return (
              <>
                <NavLink
                  key={idata}
                  to={data.link}
                  activeStyle={{
                    color: "#6777ef",
                  }}
                  exact
                  className="dropdown-item has-icon"
                >
                  <i className={data.icode} /> {data.title}
                </NavLink>
              </>
            );
          })}

          <div className="dropdown-divider" />
          <a
            // href="/"
            className="dropdown-item has-icon text-danger"
            onClick={handleClick}
          >
            <i className={userData.logoutIcon} /> {userData.logoutTitle}
          </a>
        </div>
      </li>
    </>
  );
};

export default UserDropdown;
