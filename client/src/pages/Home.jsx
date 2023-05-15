import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { UserAuthContext } from '../context/UserAuthContext'

export const Home = () => {
  const { user, logOut } = useContext(UserAuthContext)

  const handleLogOut = async () => {
    try {
      await logOut()
    } catch (e) {
      console.log(e)
    }
  }

  const userName = user.displayName ?? user.email

  return (
    <>
      <div className='p-4 box mt-3 text-center'>Hello, welcome {userName}</div>
      <div className='d-grid gap-2 mt-3'>
        <Button variant='primary' onClick={handleLogOut}>Log out</Button>
      </div>
    </>
  )
}
