
export const RoomsTable = ({ roomsData, setAction }) => {
  // const { setEditedRoom } = useContext(EditItemsContext)
  // const navigate = useNavigate()
  // const handleGuestDelete = (room) => {
  //   fetch(`https://hotel-app-crud.onrender.com/api/rooms/${room._id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   setAction(true)
  // }

  // const handleRoomUpdate = (room) => {
  //   setEditedRoom(room)
  //   navigate('/roomEdit')
  // }

  const handleRoomStatus = (status) => {
    if (status) {
      return 'Available'
    } else {
      return 'Not available'
    }
  }

  return (
    <div className='table-responsive'>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Room number</th>
            <th scope='col'>Room price</th>
            <th scope='col'>Room status</th>
            <th scope='col'>Room type</th>
          </tr>
        </thead>
        <tbody>
          {roomsData.map((room, index) => (
            <tr key={index}>
              <th scope='row'>{index + 1}</th>
              <td>{room.roomNumber}</td>
              <td>{room.roomPrice}</td>
              <td>{handleRoomStatus(room.roomStatus)}</td>
              <td>{room.roomType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
