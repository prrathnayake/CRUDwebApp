import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import '../styles/StaffDetails.css'

function StaffDetails() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [details, setDetails] = useState('')

    useEffect(() => {
      if(localStorage.getItem('token')){
          const accessToken = JSON.parse(localStorage.getItem('token'))
          axios.post('http://localhost:3001/adminAuth', {
              accessToken : accessToken
          }).then((res) => {
              if(res.data !== 'authenticated'){ 
                  localStorage.removeItem('token')
                  localStorage.removeItem('role')
                  return navigate('/login')
              }
              if(JSON.parse(localStorage.getItem('role')) !== "admin") return navigate('/staff') 
          })
      } else {
          return navigate('/login')
      }
  })

    useEffect(() => {axios.post('http://localhost:3001/staff/view', {
          id:id
      }).then((res) => {
        setDetails(res.data)
      })
    },[id])
      
    return (
      <div className="StaffDetails">
        <div  className="StaffDetails-title">
          <h1>Details of {details.s_fname} {details.s_lname}</h1>
        </div>
        <div className="staff-details">
            <p>First Name: {details.s_fname}</p>
            <p>Last Name: {details.s_lname}</p>
            <p>Email: {details.s_email}</p>
            <p>Mobile: {details.s_mobile}</p>
            <p>Address: {details.s_Address}</p>
            <p>Role: {details.s_role}</p>
        </div>
      </div>
    )
}
  

export default StaffDetails