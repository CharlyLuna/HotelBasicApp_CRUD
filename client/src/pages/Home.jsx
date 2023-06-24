import { ActionCard } from '../components/ActionCard'
import { MainNavbar } from '../components/MainNavbar'
import { Row } from 'react-bootstrap'

export const Home = () => {
  return (
    <>
      <MainNavbar />
      <Row className='gap-3'>
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
      </Row>
    </>
  )
}
