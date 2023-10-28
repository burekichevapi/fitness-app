import Card from 'react-bootstrap/Card';

const ExerciseCard = ({ exercise }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={exercise.gifUrl} />
      <Card.Body>
        <Card.Title>{exercise.name}</Card.Title>
        <Card.Text>
          {exercise.instructions}
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Card Link</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ExerciseCard;