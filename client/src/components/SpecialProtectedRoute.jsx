import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserAuthContext } from '../context/UserAuthContext'

export const SpecialProtectedRoute = ({ children, isAllowed, redirectPath }) => {
  const { user, rol } = useContext(UserAuthContext)
  console.log(rol)
  if (!user) {
    return <Navigate to='/' />
  } else if (user && !rol.includes(isAllowed)) {
    return <Navigate to={redirectPath} />
  }
  return children || <Outlet />
}
