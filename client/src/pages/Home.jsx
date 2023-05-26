import { useContext } from 'react'
import { ActionCard } from '../components/ActionCard'
import { MainNavbar } from '../components/MainNavbar'
import { UserAuthContext } from '../context/UserAuthContext'

export const Home = () => {
  const { rol } = useContext(UserAuthContext)

  return (
    <>
      <MainNavbar />
      <div>
        <ActionCard
          title='Guests'
          description='Check and modify guests list'
          redirection='/guests'
        />
        <ActionCard
          title='Rooms'
          description='Check and modify rooms'
          redirection='/rooms'
        />
        <ActionCard
          special
          title='Employees'
          description='Check and modify employees list'
          redirection='/employees'
        />
      </div>
    </>
  )
}
