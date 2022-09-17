import axios from 'axios';
import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';

import '../styles/Staff.css'

function Staff() {

    const navigate = useNavigate();

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
                if(JSON.parse(localStorage.getItem('role')) !== "staff") return navigate('/admin')
            }) 
        }  else {
            return navigate('/login')
        }
    })

    return (
      <div className="Staff">
        <h1 className='staff-title'>Staff Panel</h1>
      </div>
    );
}
  

export default Staff