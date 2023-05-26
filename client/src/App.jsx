import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Col, Container, Row } from 'react-bootstrap'
import { ProtectedRoute } from './components/ProtectedRoute'
import { UserAuthProvider } from './context/UserAuthProvider'
import { Home, Login, Signup } from './pages'
import { Guests } from './pages/Guests'
import { GuestEdit } from './pages/GuestEdit'
import { EditItemsProvider } from './context/EditItemsProvider'
import { Rooms } from './pages/Rooms'
import { RoomEdit } from './pages/RoomEdit'
import { Employees } from './pages/Employees'
import { useContext } from 'react'
import { UserAuthContext } from './context/UserAuthContext'
import { SpecialProtectedRoute } from './components/SpecialProtectedRoute'

function App () {
  return (
    <Container>
      <Row>
        <Col>
          <UserAuthProvider>
            <EditItemsProvider>
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route element={<ProtectedRoute />}>
                  <Route path='/guests' element={<Guests />} />
                  <Route path='/home' element={<Home />} />
                  <Route path='/guestEdit' element={<GuestEdit />} />
                  <Route path='/rooms' element={<Rooms />} />
                  <Route path='/roomEdit' element={<RoomEdit />} />
                  {/* <Route path='/employees' element={<Employees />} /> */}
                  <Route path='/employeeEdit' element={<RoomEdit />} />
                </Route>
                <Route
                  path='employees'
                  element={
                    <SpecialProtectedRoute
                      redirectPath='/home'
                      isAllowed={['admin']}
                    >
                      <Employees />
                    </SpecialProtectedRoute>
                  }
                />
              </Routes>
            </EditItemsProvider>
          </UserAuthProvider>
        </Col>
      </Row>
    </Container>
  )
}

export default App
