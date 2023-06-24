import { useContext } from 'react'
import { UserAuthContext } from '../context/UserAuthContext'
import { Button, Container } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

export const MainNavbar = () => {
  const { user, logOut } = useContext(UserAuthContext)
  const userName = user.displayName ?? user.email

  const handleLogOut = async () => {
    try {
      await logOut()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Navbar bg='light' fixed='top' className='px-0'>
      <Container fluid>
        <Navbar.Brand>
          <Link to='/home'>Hotel</Link>
        </Navbar.Brand>
        <Navbar.Text className='justify-content-start'>
          Signed in as: {userName}
        </Navbar.Text>
        <Button variant='primary' onClick={handleLogOut}>Log out</Button>
      </Container>
    </Navbar>
  )
}
