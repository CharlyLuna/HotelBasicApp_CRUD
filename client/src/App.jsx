import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Col, Container, Row } from 'react-bootstrap'
import { ProtectedRoute } from './components/ProtectedRoute'
import { UserAuthProvider } from './context/UserAuthProvider'
import { Home, Login, Signup } from './pages'

function App () {
  return (
    <Container>
      <Row>
        <Col>
          <UserAuthProvider>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route
                path='/home'
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </UserAuthProvider>
        </Col>
      </Row>
    </Container>
  )
}

export default App
