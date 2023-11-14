import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { getVideoUrl } from '../../repo/youtube-repo';
import config from "../../config.json";
import "./exerciseCard.css";

const FAVORITE_EXERCISES_KEY = 'favoriteExercises';

const ExerciseCard = ({ exercise, onRemoveFavorite, showRemoveFavorite = true }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const getId = async () => {
      try {
        const url = await getVideoUrl(exercise.name);
        setVideoUrl(url);
      } catch (error) {
        console.error('Error fetching video URL: ', error);
        setVideoUrl(null);
      } finally {
        setLoading(false);
      }
    };

    // check if the exercise.id is in the localStorage
    const storedFavorites = localStorage.getItem(FAVORITE_EXERCISES_KEY);
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.includes(exercise.id));
    }

    getId();
  }, [exercise.name, exercise.id]);

  const handleImageNotFound = ({ currentTarget }) => {
    currentTarget.onerror = null;
    currentTarget.src = config.appLogoUrl;
  };

  const handleRemoveFavorite = () => {
    onRemoveFavorite(exercise.id);
    setIsFavorite(false);
  };

  return (
    <Card className='m-1'>
      <Card.Img variant="top" src={exercise.gifUrl} onError={handleImageNotFound} />
      <Card.Body className='m-1'>
        <Card.Title className='m-2'>{exercise.name}</Card.Title>
        <Card.Text className='m-2 text-sm'>
          {exercise.instructions}
        </Card.Text>
        {loading ? (
          <Spinner animation="border" role="status" />
        ) : (
          <Card.Link href={videoUrl} target='_blank' rel="noreferrer">
            Watch Youtube Video
          </Card.Link>
        )}
        {isFavorite && showRemoveFavorite && ( // Conditionally render based on showRemoveFavorite
          <Button variant="danger" onClick={handleRemoveFavorite}>
            Remove Favorite
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ExerciseCard;