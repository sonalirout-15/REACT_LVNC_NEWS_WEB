import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { adminLoginStart } from "../../../Redux/Actions/AdminActions";
import { userDetail } from "./Data";

const UserDropdown = () => {
  const userData = userDetail;
  const history = useHistory();
  const handleClick = () => {
    localStorage.removeItem("ADMIN");
    history.push("/");
  };
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminLoginStart());
  }, []);

  const admin = useSelector((state) => state?.admin.adminLogin?.userEmail);
  const [data, setData] = useState(admin);

  useEffect(() => {
    setData(admin)
  }, [admin])

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
          <div style={{ color: "#6777ef", textAlign: "center" }}>{data}</div>
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
            href="/"
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
