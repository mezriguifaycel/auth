import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const isAuth = localStorage.getItem('isAuth')
  const User = useSelector(state=> state.User.user)
  // useEffect(()=>{
  //   !isAuth && navigate('/Login')
  // },[isAuth])
  return (
    <div>
       <h2>Wel come to {User?.name} Profile</h2>
    </div>
  )
}

export default Profile