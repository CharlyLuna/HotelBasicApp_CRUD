import React, { useEffect } from 'react'
import { MainNavbar } from '../components/MainNavbar'

export const Guests = () => {
  useEffect(() => {
    const getGuests = async () => {
      try {
        const res = await fetch(
          'http://localhost:3001/api/guests',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        const { data } = await res.json()
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    }
    getGuests()
  }, [])

  return (
    <>
      <MainNavbar />
      <div>Guests</div>
    </>
  )
}
