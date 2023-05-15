import { useContext, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuthContext } from '../context/UserAuthContext'

export const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signUp } = useContext(UserAuthContext)

  const navigate = useNavigate()

  const onPasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const onEmailChange = ({ target }) => {
    setEmail(target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signUp(email, password)
      navigate('/')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <>
      <div className='p-4 box'>
        <h2 className='mb-3'>Firebase Auth Signup</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control
              type='email'
              placeholder='Email address'
              onChange={onEmailChange}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Control
              type='password'
              placeholder='Password'
              onChange={onPasswordChange}
            />
          </Form.Group>

          <div className='d-grid gap-2'>
            <Button variant='primary' type='Submit'>
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className='p-4 box mt-3 text-center'>
        Already have an account? <Link to='/'>Log In</Link>
      </div>
    </>
  )
}
