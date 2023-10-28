import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { getVideoUrl } from '../services/youtube-service';

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

  return (
    <Card className='m-1'>
      <Card.Img variant="top" src={exercise.gifUrl} />
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
