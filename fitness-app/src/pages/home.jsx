import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../services/firebase-service';
import { getAllExercises } from '../services/exercises-service';

const Home = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [exercises, setExercises] = useState([]);

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

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      console.log("fetching exercises");
      const e = await getAllExercises();
      setExercises(e);
    }, 5000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

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
  };

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
      <div>
        {exercises.map((e) => <div key={e.id}>
          bodyPart: {e.bodyPart}<br />
          equipment: {e.equipment}<br />
          gifUrl: {e.gifUrl}<br />
          id {e.id}<br />
          name: {e.name}<br />
          target: {e.target}<br />
          secondaryMuscles: {e.secondaryMuscles}<br />
          instructions: {e.instructions}<br />
          <br />
        </div>)}
      </div>
    </>
  );
};

export default Home;