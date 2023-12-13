import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Comments = ({comment}) => {



  return (
    <div className="mt-2">
    <Card>
      <Card.Header>Comentario de @{comment.autor}</Card.Header>
      <Card.Body>
        <Card.Text>
        {comment.description}
        </Card.Text>
        <Button className='me-2' variant="dark"></Button>
        <Button variant="danger"></Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Comments