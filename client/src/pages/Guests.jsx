import { useContext, useEffect, useState } from 'react'
import { MainNavbar } from '../components/MainNavbar'
import { DotSpinner } from '@uiball/loaders'
import { GuestsTable } from '../components/GuestsTable'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { EditItemsContext } from '../context/EditItemsContext'
import { useDebounce } from '../utils/useDebounce'

export const Guests = () => {
  const [guestsData, setGuestsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [actionTriggered, setActionTriggered] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const debouncedSearch = useDebounce(searchText)
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

  useEffect(() => {
    if (searchText) {
      const searchResults = guestsData.filter((item) => item.name.toLowerCase()
        .includes(searchText.toLowerCase()) || item.lastName.toLowerCase()
        .includes(searchText.toLowerCase()))
      console.log(searchText)
      setSearchResults(searchResults)
    }
  }, [debouncedSearch])

  const handleAddNewGuest = () => {
    navigate('/guestEdit')
    setEditedGuest(null)
  }

  console.log(guestsData)

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
            <>
              <div className='mb-4'>
                <input
                  name='searchText'
                  type='text'
                  placeholder='Search'
                  value={searchText}
                  onChange={({ target }) => setSearchText(target.value)}
                />
              </div>
              <div>
                <GuestsTable guestsData={searchText ? searchResults : guestsData} setAction={setActionTriggered} />
                <Button onClick={handleAddNewGuest} variant='dark'>Add a new guest</Button>
              </div>
            </>
            )}
      </div>
    </>
  )
}
