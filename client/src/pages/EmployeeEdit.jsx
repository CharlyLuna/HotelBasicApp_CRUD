import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { MainNavbar } from '../components/MainNavbar'
import { EditItemsContext } from '../context/EditItemsContext'
import { useNavigate } from 'react-router-dom'

export const EmployeeEdit = () => {
  const navigate = useNavigate()
  const [employeeInfo, setEmployeeInfo] = useState({
    name: '',
    lastName: '',
    email: '',
    age: '',
    role: '',
    password: ''
  })
  const [error, setError] = useState('')
  const { editedEmployee } = useContext(EditItemsContext)

  useEffect(() => {
    if (editedEmployee) setEmployeeInfo(editedEmployee)
  }, [editedEmployee])

  const onInputChange = ({ target }) => {
    setEmployeeInfo({
      ...employeeInfo,
      [target.name]: target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editedEmployee) {
      updateEmployee()
    } else {
      addEmployee()
    }
  }

  const updateEmployee = async () => {
    try {
      const res = await fetch(`https://hotel-app-crud.onrender.com/api/employees/${employeeInfo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeInfo)
      })
      if (res.ok) {
        navigate('/employees')
      } else {
        const { errors } = await res.json()
        setError(errors[0].msg)
      }
    } catch (e) {
      setError(e.message)
    }
  }

  const addEmployee = async () => {
    try {
      const res = await fetch('https://hotel-app-crud.onrender.com/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeInfo)
      })
      if (res.ok) {
        navigate('/employees')
      } else {
        const { errors } = await res.json()
        setError(errors[0].msg)
      }
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <>
      <MainNavbar />
      <div className='p-4 box'>
        <h2 className='mb-3'>{editedEmployee ? 'Employee Edition' : 'Employee Creation'}</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {/* Employee full name */}
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='formName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name='name'
                  value={employeeInfo.name}
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
                  value={employeeInfo.lastName}
                  maxLength={20}
                  placeholder='Last name'
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Employee info */}
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='formAge'>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  name='age'
                  value={employeeInfo.age}
                  type='number'
                  placeholder='Age'
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
                  value={employeeInfo.email}
                  placeholder='Email'
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Employee role and password */}
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='formRole'>
                <Form.Label>Role</Form.Label>
                <Form.Control
                  name='role'
                  type='text'
                  value={employeeInfo.role}
                  maxLength={20}
                  placeholder='Role'
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name='password'
                  type='password'
                  minLength={8}
                  maxLength={20}
                  value={employeeInfo.password}
                  placeholder='Password'
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className='d-grid gap-2'>
            {
              editedEmployee !== null
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
          <div className='d-grid mt-4'>
            <Button onClick={() => navigate('/employees')} variant='primary'>Back to employees</Button>
          </div>
        </Form>
      </div>
    </>
  )
}
