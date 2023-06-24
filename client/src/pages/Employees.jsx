import { useContext, useEffect, useState } from 'react'
import { MainNavbar } from '../components/MainNavbar'
import { DotSpinner } from '@uiball/loaders'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { EditItemsContext } from '../context/EditItemsContext'
import { EmployeesTable } from '../components/EmployeesTable'

export const Employees = () => {
  const [employeesData, setEmployeesData] = useState([])
  const [loading, setLoading] = useState(false)
  const [actionTriggered, setActionTriggered] = useState(false)
  const { setEditedGuest } = useContext(EditItemsContext)
  const navigate = useNavigate()

  useEffect(() => {
    setActionTriggered(false)
    const getEmployees = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          'https://hotel-app-crud.onrender.com/api/employees',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        if (res.ok) {
          const { data } = await res.json()
          setEmployeesData(data)
        }
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    getEmployees()
  }, [actionTriggered])

  const handleAddNewEmployee = () => {
    navigate('/employeeEdit')
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
              <EmployeesTable employeeData={employeesData} setAction={setActionTriggered} />
              <Button onClick={handleAddNewEmployee} variant='dark'>Add a new employee</Button>
            </div>
            )}
      </div>
    </>
  )
}
