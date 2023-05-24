import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { MainNavbar } from '../components/MainNavbar'
import { EditItemsContext } from '../context/EditItemsContext'
import { formatDate } from '../utils/functions'
import { useNavigate } from 'react-router-dom'

export const GuestEdit = () => {
  const navigate = useNavigate()
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    roomNumber: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    paymentMethod: ''
  })
  const [error, setError] = useState('')
  const { editedGuest } = useContext(EditItemsContext)

  useEffect(() => {
    if (editedGuest) setGuestInfo(editedGuest)
  }, [editedGuest])

  const onInputChange = ({ target }) => {
    setGuestInfo({
      ...guestInfo,
      [target.name]: target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editedGuest) {
      updateGuest()
    } else {
      addGuest()
    }
  }

  const updateGuest = async () => {
    try {
      const res = await fetch(`https://hotel-app-crud.onrender.com/api/guests/${guestInfo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(guestInfo)
      })
      if (res.ok) {
        navigate('/guests')
      } else {
        const { errors } = await res.json()
        setError(errors[0].msg)
      }
    } catch (e) {
      setError(e.message)
    }
  }

  const addGuest = async () => {
    try {
      const res = await fetch('https://hotel-app-crud.onrender.com/api/guests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(guestInfo)
      })
      console.log(JSON.stringify(guestInfo))
      if (res.ok) {
        navigate('/guests')
      } else {
        const { errors } = await res.json()
        console.log(errors)
        setError(errors[0].msg)
      }
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <>
      <MainNavbar />
      <div className='row mt-4'>
        <Button onClick={() => navigate('/guests')} variant='dark'>Back to guests</Button>
      </div>
      <div className='p-4 box'>
        <h2 className='mb-3'>Guest Edition</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {/* Guest full name */}
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='formName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name='name'
                  value={guestInfo.name}
                  maxLength={20}
                  type='text'
                  placeholder='Name'
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='formLastName'>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  name='lastName'
                  type='text'
                  value={guestInfo.lastName}
                  maxLength={20}
                  placeholder='last name'
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Guest contact info */}
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='formPhoneNumber'>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  name='phoneNumber'
                  value={guestInfo.phoneNumber}
                  type='text'
                  maxLength={10}
                  placeholder='Phone number'
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='formEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name='email'
                  type='email'
                  maxLength={20}
                  value={guestInfo.email}
                  placeholder='Email'
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Check in and check out dates */}
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='formCheckIn'>
                <Form.Label>Check in</Form.Label>
                <Form.Control
                  name='checkInDate'
                  value={editedGuest ? formatDate(guestInfo.checkInDate) : guestInfo.checkInDate}
                  type='date'
                  placeholder='Check in'
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='formCheckOut'>
                <Form.Label>Check out</Form.Label>
                <Form.Control
                  name='checkOutDate'
                  type='date'
                  value={editedGuest ? formatDate(guestInfo.checkOutDate) : guestInfo.checkOutDate}
                  placeholder='Check out'
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Room and number of guests */}
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='formRoomNumber'>
                <Form.Label>Room number</Form.Label>
                <Form.Control
                  name='roomNumber'
                  value={guestInfo.roomNumber}
                  maxLength={5}
                  type='text'
                  placeholder='Room number'
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='formNumberOfGuests'>
                <Form.Label>Number of guests</Form.Label>
                <Form.Control
                  name='numberOfGuests'
                  type='number'
                  value={guestInfo.numberOfGuests}
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Payment method */}
          <Col>
            <Form.Group className='mb-3' controlId='formPaymentMethod'>
              <Form.Label>Payment method</Form.Label>
              <Form.Control
                name='paymentMethod'
                type='text'
                value={guestInfo.paymentMethod}
                maxLength={20}
                placeholder='Payment method'
                onChange={onInputChange}
              />
            </Form.Group>
          </Col>
          <div className='d-grid gap-2'>
            {
              editedGuest !== null
                ? (
                  <Button variant='dark' type='Submit'>
                    Update
                  </Button>
                  )
                : (
                  <Button variant='dark' type='Submit'>
                    Add
                  </Button>
                  )
            }
          </div>
        </Form>
      </div>
    </>
  )
}
