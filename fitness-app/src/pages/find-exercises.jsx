import { useState } from "react";
import { getExercisesByBodyPart } from "../services/exercises-service";
import ExerciseCard from "../components/exerciseCard";

const FindExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [maxResults, setMaxResults] = useState(10);
  const [checkboxBodyParts, setCheckboxBodyParts] = useState([
    { name: "all", checked: false },
    { name: "cardio", checked: false },
    { name: "chest", checked: false },
    { name: "back", checked: false },
    { name: "neck", checked: false },
    { name: "wait", checked: false },
    { name: "shoulders", checked: false },
    { name: "lowerArms", checked: false },
    { name: "lowerLegs", checked: false },
    { name: "upperArms", checked: false },
    { name: "upperLegs", checked: false },
  ]);

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...checkboxBodyParts];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;

    if (updatedCheckboxes[index].name === "all") {
      updatedCheckboxes.forEach(check => {
        if (check.name !== "all") check.checked = false
      });
    }

    let result = [];

    updatedCheckboxes.filter((c) => c.checked).forEach((checkbox) => {
      const bodyPart = getExercisesByBodyPart(checkbox.name, maxResults);
      result = result.concat(bodyPart);
    });
    console.log(result);

    setExercises(result);
    setCheckboxBodyParts(updatedCheckboxes);
  };

  const handleChangeMaxResult = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setMaxResults(selectedValue);
  };

  return (
    <div className="">
      <div>
        <h2>
          Find Exercises
        </h2>
        {checkboxBodyParts.map((checkbox, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={checkbox.checked}
              onChange={() => handleCheckboxChange(index)}
            />
            {checkbox.name}
          </label>
        ))}
      </div>
      <div>
        <label>Max results:</label>
        <select value={maxResults} onChange={handleChangeMaxResult}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={150}>150</option>
        </select>
      </div>

      {
        exercises.map((exercise) => {
          return <div key={exercise.id}>
            <ExerciseCard exercise={exercise} />
          </div>
        })
      }
    </div>
  );
};

export default FindExercises;
