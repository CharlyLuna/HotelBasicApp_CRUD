import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { EditItemsContext } from '../context/EditItemsContext'
import { formatDate } from '../utils/functions'

export const GuestsTable = ({ guestsData, setAction }) => {
  const { setEditedGuest } = useContext(EditItemsContext)
  const navigate = useNavigate()
  const handleGuestDelete = (guest) => {
    fetch(`https://hotel-app-crud.onrender.com/api/guests/${guest._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setAction(true)
  }

  const handleGuestUpdate = (guest) => {
    setEditedGuest(guest)
    navigate('/guestEdit')
  }
  return (
    <div className='table-responsive'>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Last name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Room number</th>
            <th scope='col'>Check in date</th>
            <th scope='col'>Check out date</th>
            <th scope='col'>Delete guest</th>
            <th scope='col'>Update guest</th>
          </tr>
        </thead>
        <tbody>
          {guestsData.map((guest, index) => (
            <tr key={index}>
              <th scope='row'>{index + 1}</th>
              <td>{guest.name}</td>
              <td>{guest.lastName}</td>
              <td>{guest.email}</td>
              <td>{guest.phoneNumber}</td>
              <td>{guest.roomNumber}</td>
              <td>{formatDate(guest.checkInDate)}</td>
              <td>{formatDate(guest.checkOutDate)}</td>
              <td>
                <Button variant='dark' onClick={() => handleGuestDelete(guest)}>Delete</Button>
              </td>
              <td>
                <Button variant='dark' onClick={() => handleGuestUpdate(guest)}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
