import React from "react";
import "./Header.css";
import {
  Search,
  Home,
  SupervisorAccountRounded,
  BusinessCenter,
  Chat,
  NotificationAdd,
} from "@mui/icons-material";
import linkedin from "../assets/linkedin.png";
import HeaderOption from "./HeaderOption";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import swal from "sweetalert";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const logOutOfApp = () => {
    dispatch(logout());
    auth.signOut();
    swal("Successfull", "You have log out from the app", "success");
  };

  return (
    <div className="header">
      <div className="header__left">
        <img src={linkedin} alt="" />
        <div className="header__search">
          <Search />
          <input placeholder="Search" type="search" />
        </div>
      </div>
      <div className="header__right">
        <HeaderOption Icon={Home} title="Home" />
        <HeaderOption Icon={SupervisorAccountRounded} title="My Network" />
        <HeaderOption Icon={BusinessCenter} title="Jobs" />
        <HeaderOption Icon={Chat} title="Messaging" />
        <HeaderOption Icon={NotificationAdd} title="Notifications" />
        <HeaderOption
          avatar="https://upload.wikimedia.org/wikipedia/commons/9/9e/Placeholder_Person.jpg"
          title={user?.displayName}
          onClick={logOutOfApp}
        />
      </div>
    </div>
  );
};

export default Header;
