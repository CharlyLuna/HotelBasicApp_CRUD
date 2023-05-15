import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Col, Container, Row } from 'react-bootstrap'
import { ProtectedRoute } from './components/ProtectedRoute'
import { UserAuthProvider } from './context/UserAuthProvider'
import { Home, Login, Signup } from './pages'
import { Guests } from './pages/Guests'

function App () {
  return (
    <Container>
      <Row>
        <Col>
          <UserAuthProvider>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/guests' element={<Guests />} />
                <Route path='/home' element={<Home />} />
              </Route>
            </Routes>
          </UserAuthProvider>
        </Col>
      </Row>
    </Container>
  )
}

export default App
