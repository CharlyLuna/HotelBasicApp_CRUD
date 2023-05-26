import { useState } from 'react'
import { EditItemsContext } from './EditItemsContext'

export const EditItemsProvider = ({ children }) => {
  const [editedGuest, setEditedGuest] = useState(null)
  const [editedRoom, setEditedRoom] = useState(null)
  const [editedEmployee, setEditedEmployee] = useState(null)

  return (
    <EditItemsContext.Provider value={{
      setEditedGuest,
      editedGuest,
      setEditedRoom,
      editedRoom,
      setEditedEmployee,
      editedEmployee
    }}
    >
      {children}
    </EditItemsContext.Provider>
  )
}
