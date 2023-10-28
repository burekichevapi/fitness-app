import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../services/firebase-service';
import LoginButton from "../loginButton";
import LogoutButton from '../logoutButton';
import NavbarItems from "./sideNavbarItems";
import NavbarHeader from "./sideNavbarHeader";
import "./sideNavbar.css";


const NavBar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    const body = document.body;
    body.classList.toggle("sidebar-open");
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setCurrentUser("");
      navigate("/");
      console.log("Signed out successfully");
    }).catch((error) => {
      // An error happened.
    });
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user.displayName);
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''} bg-transparent`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="container-fluid">
        <div>
          {
            currentUser === "" ? <LoginButton
              onClickHandler={handleGoogleLogin}
              buttonText="Login with Google"
            /> :
              <LogoutButton onClickHandler={handleLogout} />
          }
        </div>

        <NavbarHeader />
        <div className="media-body">
          <p className="m-2 text-light">Welcome {currentUser}</p>
        </div>
      </div >
      <NavbarItems />
    </div >
  );
};

export default NavBar;