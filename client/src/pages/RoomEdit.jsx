import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { MainNavbar } from '../components/MainNavbar'
import { EditItemsContext } from '../context/EditItemsContext'
import { formatDate } from '../utils/functions'
import { useNavigate } from 'react-router-dom'

export const RoomEdit = () => {
  const navigate = useNavigate()
  const [roomInfo, setRoomInfo] = useState({
    roomNumber: '',
    roomPrice: '',
    roomStatus: '',
    roomType: ''
  })
  const [error, setError] = useState('')
  const { editedRoom } = useContext(EditItemsContext)

  useEffect(() => {
    if (editedRoom) setRoomInfo(editedRoom)
  }, [editedRoom])

  const onInputChange = ({ target }) => {
    setRoomInfo({
      ...roomInfo,
      [target.name]: target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editedRoom) {
      updateRoom()
    } else {
      addRoom()
    }
  }

  const updateRoom = async () => {
    try {
      const res = await fetch(`https://hotel-app-crud.onrender.com/api/rooms/${roomInfo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(roomInfo)
      })
      if (res.ok) {
        navigate('/rooms')
      } else {
        const { errors } = await res.json()
        setError(errors[0].msg)
      }
    } catch (e) {
      setError(e.message)
    }
  }

  const addRoom = async () => {
    try {
      const res = await fetch('https://hotel-app-crud.onrender.com/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(roomInfo)
      })
      console.log(JSON.stringify(roomInfo))
      if (res.ok) {
        navigate('/rooms')
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
        <Button onClick={() => navigate('/rooms')} variant='dark'>Back to guests</Button>
      </div>
      <div className='p-4 box'>
        <h2 className='mb-3'>Room Edition</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {/* Room main info */}
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='formRoomNumber'>
                <Form.Label>Room number</Form.Label>
                <Form.Control
                  name='roomNumber'
                  value={roomInfo.roomNumber}
                  maxLength={5}
                  type='text'
                  placeholder='roomNumber'
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='formRoomType'>
                <Form.Label>Room type</Form.Label>
                <Form.Control
                  name='roomType'
                  type='text'
                  value={roomInfo.roomType}
                  maxLength={20}
                  placeholder='room type'
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Room info */}
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='formRoomStatus'>
                <Form.Label>Room status</Form.Label>
                <Form.Control
                  name='roomStatus'
                  value={roomInfo.roomStatus}
                  type='text'
                  maxLength={10}
                  placeholder='Room status'
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='formRoomPrice'>
                <Form.Label>Room price</Form.Label>
                <Form.Control
                  name='roomPrice'
                  type='number'
                  value={roomInfo.roomPrice}
                  placeholder='Room price'
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className='d-grid gap-2'>
            {
              editedRoom !== null
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
