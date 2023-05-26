import { Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
// import GoogleButton from 'react-google-button'
import { useContext, useState } from 'react'
import { UserAuthContext } from '../context/UserAuthContext'

export const Login = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const { logIn } = useContext(UserAuthContext)

  const navigate = useNavigate()

  const onEmailChange = ({ target }) => {
    setEmail(target.value)
  }

  const onPasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await logIn(email, password)
      navigate('/home')
    } catch (e) {
      setError(e.message)
    }
  }

  // const handleGoogleSignIn = async (e) => {
  //   e.preventDefault()
  //   try {
  //     await googleSignIn()
  //     navigate('/home')
  //   } catch (e) {
  //     setError(e.message)
  //   }
  // }

  return (
    <>
      <div className='p-4 box'>
        <h2 className='mb-3'>Firebase Auth Login</h2>
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
              Log In
            </Button>
          </div>
        </Form>
        {/* <hr /> */}
        {/* <div>
          <GoogleButton
            className='g-btn'
            type='dark'
            onClick={handleGoogleSignIn}
          />
        </div> */}
      </div>
      <div className='p-4 box mt-3 text-center'>
        Don't have an account? <Link to='/signup'>Sign up</Link>
      </div>
    </>
  )
}
