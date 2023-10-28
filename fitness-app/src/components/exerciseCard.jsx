import Card from 'react-bootstrap/Card';

const ExerciseCard = ({ exercise }) => {

  return (
    <Card className='m-1'>
      <Card.Img variant="top" src={exercise.gifUrl} />
      <Card.Body className='m-1'>
        <Card.Title className='m-2'>{exercise.name}</Card.Title>
        <Card.Text className='m-2 text-sm'>
          {exercise.instructions}
        </Card.Text>
        <Card.Link href={`https://www.youtube.com`}>Watch Youtube Video</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ExerciseCard;