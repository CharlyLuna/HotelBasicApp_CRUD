import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'

export const GuestEdit = () => {
  const [guestInfo, setGuestInfo] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
  }, [])

  return (
    <>
      <div className='p-4 box'>
        <h2 className='mb-3'>Firebase Auth Login</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={() => {}}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control
              aria-label='name'
              value='name'
              type='email'
              placeholder='Name'
              onChange={() => {}}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Control
              type='password'
              placeholder='Password'
              onChange={() => {}}
            />
          </Form.Group>

          <div className='d-grid gap-2'>
            <Button variant='primary' type='Submit'>
              Log In
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}
