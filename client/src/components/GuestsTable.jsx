import { Button } from 'react-bootstrap'

export const GuestsTable = ({ guestsData, setAction }) => {
  const handleGuestDelete = (guest) => {
    fetch(`https://hotel-app-crud.onrender.com/api/guests/${guest._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setAction(true)
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
            <th scope='col'>Delete guest</th>
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
              <td>
                <Button variant='dark' onClick={() => handleGuestDelete(guest)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
