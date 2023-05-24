import { useState } from 'react'
import { EditItemsContext } from './EditItemsContext'

export const EditItemsProvider = ({ children }) => {
  const [editedGuest, setEditedGuest] = useState(null)

  return (
    <EditItemsContext.Provider value={{ setEditedGuest, editedGuest }}>
      {children}
    </EditItemsContext.Provider>
  )
}
