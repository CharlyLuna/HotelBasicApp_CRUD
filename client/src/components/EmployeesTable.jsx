import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { EditItemsContext } from '../context/EditItemsContext'

export const EmployeesTable = ({ employeeData, setAction }) => {
  const { setEditedEmployee } = useContext(EditItemsContext)
  const navigate = useNavigate()
  const handleEmployeeDelete = (employee) => {
    fetch(`https://hotel-app-crud.onrender.com/api/employees/${employee._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setAction(true)
  }

  const handleEmployeeUpdate = (employee) => {
    setEditedEmployee(employee)
    navigate('/employeeEdit')
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
            <th scope='col'>Age</th>
            <th scope='col'>Role</th>
            <th scope='col'>Delete employee</th>
            <th scope='col'>Update employee</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee, index) => (
            <tr key={index}>
              <th scope='row'>{index + 1}</th>
              <td>{employee.name}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.age}</td>
              <td>{employee.role}</td>
              <td>
                <Button variant='dark' onClick={() => handleEmployeeDelete(employee)}>Delete</Button>
              </td>
              <td>
                <Button variant='dark' onClick={() => handleEmployeeUpdate(employee)}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
