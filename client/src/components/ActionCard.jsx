import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const ActionCard = ({ title, description, redirection }) => {
  const navigate = useNavigate()

  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant='light' onClick={() => navigate(redirection)}>Check {title}</Button>
      </Card.Body>
    </Card>
  )
}
