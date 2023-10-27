import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../services/firebase-service';
import Constants from '../constants';
import "./navbar.css";


export const NavBar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

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
        // Signed in
        const user = userCredential.user;
        setCurrentUser(user.displayName);
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }

  const renderLoginButtons = () => {
    if (currentUser !== "")
      return (<button Class="btn btn-secondary" onClick={handleLogout}> Logout </button>);

    return (
      <button Class="btn btn-secondary" onClick={handleGoogleLogin}>
        Login with Google
      </button>);
  };

  const renderNavItems = () => (
    <ul Class="nav flex-column bg-dark mb-0">
      <li Class="nav-item">
        <Link class="nav-link text-dark font-italic bg-light" to="/">Home</Link>
      </li>
      <li Class="nav-item">
        <Link class="nav-link text-dark font-italic bg-light" to="">My Workout</Link>
      </li>
      <li Class="nav-item">
        <Link class="nav-link text-dark font-italic bg-light" to="">Goals + Progress</Link>
      </li>
      <li Class="nav-item">
        <Link class="nav-link text-dark font-italic bg-light" to="">Find Exercises</Link>
      </li>
    </ul>);

  return (<>
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div Class="container-fluid">
        <div>{renderLoginButtons()}</div>
        <img src={Constants.AppIconUrl} alt="pink-dumbbell" width="35" Class="mr-3 rounded-circle img-thumbnail shadow-sm" />
        <Link Class="navbar-brand" to="/">Fitness App</Link>
        <div Class="media-body">
          <p Class="m-2 text-light">Welcome, {currentUser}</p>
        </div>
      </div >
      {renderNavItems()}
    </div >
  </>
  );
};