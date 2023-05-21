import { useEffect, useState } from 'react'
import { MainNavbar } from '../components/MainNavbar'
import { DotSpinner } from '@uiball/loaders'
import { GuestsTable } from '../components/GuestsTable'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const Guests = () => {
  const [guestsData, setGuestsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [actionTriggered, setActionTriggered] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setActionTriggered(false)
    const getGuests = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          'https://hotel-app-crud.onrender.com/api/guests',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        if (res.ok) {
          const { data } = await res.json()
          setGuestsData(data)
        }
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    getGuests()
  }, [actionTriggered])

  console.log(actionTriggered)

  return (
    <>
      <MainNavbar />
      <div>
        {loading
          ? (
            <DotSpinner
              size={40}
              speed={0.9}
              color='black'
            />
            )
          : (
            <div>
              <GuestsTable guestsData={guestsData} setAction={setActionTriggered} />
              <Button onClick={() => navigate('/guestEdit')} variant='dark'>Add a new guest</Button>
            </div>
            )}
      </div>
    </>
  )
}
