import { ActionCard } from '../components/ActionCard'
import { MainNavbar } from '../components/MainNavbar'

export const Home = () => {
  return (
    <>
      <MainNavbar />
      <div>
        <ActionCard
          title='Guests'
          description='Check and modify guests list'
          redirection='/guests'
        />
      </div>
    </>
  )
}
