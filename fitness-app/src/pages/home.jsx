import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../services/firebase-service';

const Home = () => {
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

  return (
    <>
      <nav>
        <p>
          Welcome Home {currentUser}
        </p>

        <div>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div>
          <button onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </div>
      </nav>
    </>
  );
};

export default Home;