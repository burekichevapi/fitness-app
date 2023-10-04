import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../services/firebase-service';
import { getAllExercises, getExercisesByBodyPart } from '../services/exercises-service';

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
      //const e = getAllExercises();
      const e = getExercisesByBodyPart("back");
      console.log("rendering:", e);
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
        {exercises.map((exercise, index) => <div key={exercise.id}>
          index: {index} <br />
          bodyPart: {exercise.bodyPart}<br />
          equipment: {exercise.equipment}<br />
          gifUrl: {exercise.gifUrl}<br />
          id {exercise.id}<br />
          name: {exercise.name}<br />
          target: {exercise.target}<br />
          secondaryMuscles: {exercise.secondaryMuscles}<br />
          instructions: {exercise.instructions}<br />
          <br />
        </div>)}
      </div>
    </>
  );
};

export default Home;