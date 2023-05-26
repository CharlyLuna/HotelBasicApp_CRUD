import { useContext, useEffect, useState } from 'react'
import { MainNavbar } from '../components/MainNavbar'
import { DotSpinner } from '@uiball/loaders'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { EditItemsContext } from '../context/EditItemsContext'
import { RoomsTable } from '../components/RoomsTable'

export const Rooms = () => {
  const [roomsData, setRoomsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [actionTriggered, setActionTriggered] = useState(false)
  const { setEditedRoom } = useContext(EditItemsContext)
  const navigate = useNavigate()

  useEffect(() => {
    setActionTriggered(false)
    const getRooms = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          'https://hotel-app-crud.onrender.com/api/rooms',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        if (res.ok) {
          const { data } = await res.json()
          setRoomsData(data)
        }
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    getRooms()
  }, [actionTriggered])

  const handleAddNewRoom = () => {
    navigate('/roomEdit')
    setEditedRoom(null)
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
              <RoomsTable roomsData={roomsData} setAction={setActionTriggered} />
              <Button onClick={handleAddNewRoom} variant='dark'>Add a new room</Button>
            </div>
            )}
      </div>
    </>
  )
}
