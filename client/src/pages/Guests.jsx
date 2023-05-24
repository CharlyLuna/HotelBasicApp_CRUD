import { useContext, useEffect, useState } from 'react'
import { MainNavbar } from '../components/MainNavbar'
import { DotSpinner } from '@uiball/loaders'
import { GuestsTable } from '../components/GuestsTable'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { EditItemsContext } from '../context/EditItemsContext'

export const Guests = () => {
  const [guestsData, setGuestsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [actionTriggered, setActionTriggered] = useState(false)
  const { setEditedGuest } = useContext(EditItemsContext)
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

  const handleAddNewGuest = () => {
    navigate('/guestEdit')
    setEditedGuest(null)
  }

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
              <Button onClick={handleAddNewGuest} variant='dark'>Add a new guest</Button>
            </div>
            )}
      </div>
    </>
  )
}
