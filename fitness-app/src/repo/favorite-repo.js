const FAVORITE_EXERCISES_KEY = 'favoriteExercises';

export const handleSaveExercise = (exerciseId) => {

  console.log(`Saving exercise with ID: ${exerciseId}`);

  // retrieve the current list of favorite exercises from localStorage
  const storedFavorites = localStorage.getItem(FAVORITE_EXERCISES_KEY);
  let favorites = [];

  // if there's data in localStorage, parse it
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
  }

  // if the exerciseId is not in the list, add it
  if (!favorites.includes(exerciseId)) {
    favorites.push(exerciseId);
  }

  // save the updated list back to localStorage
  localStorage.setItem(FAVORITE_EXERCISES_KEY, JSON.stringify(favorites));
};