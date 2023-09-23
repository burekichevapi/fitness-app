import React from 'react';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home")
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
          Welcome Home
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
  )
}

export default Home;

/*

Cannot read properties of undefined (reading 'email')
TypeError: Cannot read properties of undefined (reading 'email')
    at http://localhost:3000/static/js/bundle.js:173:34
*/