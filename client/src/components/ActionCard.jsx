import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const ActionCard = ({ title, description, redirection, special }) => {
  const navigate = useNavigate()

  return (
    <Card>
      {special && <Card.Header as='h5'>Only for admins</Card.Header>}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant='dark' onClick={() => navigate(redirection)}>Check {title}</Button>
      </Card.Body>
    </Card>
  )
}
