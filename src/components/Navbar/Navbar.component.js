import React, { useState } from "react";
import './navbar.style.css'
import logo from "../../images/PP_logo_yellow.png"
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {NavLink} from "react-router-dom"
function Header({ location }) {
  const [icons, seticons] = useState(false);
  const [classna, setclassna] = useState("slider");
  return (
    <>
     <ToastContainer
            className="white text-center text-capitalize"
            position="top-center"
            closeOnClick
            draggable
            margin-top="-50px"
            zIndex="9999999" />
    <div className="navbar">
      <img className="navbar_logo" src={logo} alt="logo" />
      <div
        className="menu-toggle"
        onClick={() => {
          var bola = !icons;
          seticons(!icons);
          if (bola === false) {
            setclassna("mid");
            setTimeout(() => {
              setclassna(bola ? "active" : "slider");
            }, 1000);
          } else {
            setclassna(bola ? "active" : "slider");
          }
        }}
      >
        {!icons ? (
          <MenuIcon style={{ fontSize: "30px", color: "white" }} />
        ) : (
          <ClearIcon style={{ fontSize: "30px", color: "white" }} />
        )}
      </div>
      <nav className={classna}>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/token">TrackAmbulance</NavLink>
        <NavLink to="#">PastRide</NavLink>
        <NavLink to="#">Profile</NavLink>
        <NavLink to="#">Login</NavLink>
        {/* <NavLink to="/signup">Signup</NavLink> */}
        {location === "home" && <div className="animation start-home" />}
        {location === "token" && (
          <div className="animation start-user" />
        )}
        {location === "pastride" && (
          <div className="animation start-hospital" />
        )}
        {location === "profile" && <div className="animation start-aboutus" />}
        {/* {location === "login" && (
          <div className="animation start-collaborate" />
        )} */}
        {location === "login" && (
          <div className="animation start-collaborate" />
        )}
      </nav>
      <div className="clearfix"></div>
    </div>
    </>
  );
}

export default Header;