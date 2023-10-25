import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';


export const NavBar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");

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

  const renderNavButtons = () => {
    if (currentUser !== "")
      return (<div> <button onClick={handleLogout}> Logout </button> </div>);

    return (<div>
      <button onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>);
  };

  const renderNavItems = () => (<>
    <Nav.Item>
      <Link to="/home">Active</Link>
    </Nav.Item>
    <Nav.Item>
      <Link to="link-1">Link</Link>
    </Nav.Item>
    <Nav.Item>
      <Link to="link-2">Link</Link>
    </Nav.Item>
  </>);

  return (
    <Nav
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <p>
        Welcome Home {currentUser}
      </p>

      {renderNavButtons()}
      {renderNavItems()}
    </Nav>
  );
};