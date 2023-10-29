import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { getVideoUrl } from '../repo/youtube-repo';
import config from "../config.json";

const ExerciseCard = ({ exercise }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

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

    getId();
  }, [exercise.name]);

  const handleImageNotFound = ({ currentTarget }) => {
    currentTarget.onerror = null;
    currentTarget.src = config.appLogoUrl;
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
      </Card.Body>
    </Card>
  );
};

export default ExerciseCard;
