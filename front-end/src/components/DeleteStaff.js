
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import '../styles/DeleteStaff.css'

function DeleteStaff() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [done, setDone] = useState(false)

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

    function cancle () {
        return navigate('/admin')
    }

    function confirm () {
        axios.post('http://localhost:3001/staff/delete', {
            id: id
        }).then((res) => {
            if (res.data) {
                setDone(true)
            }   
        })
    }
      
      
    return (
      <div className="DeleteStaff">
        <h1 className='delete-title'>Do you need to delete this user? (id: {id})</h1>
        {done 
        ? <h1 className='delete-body'>Deleted</h1>
        :<div className='delete-body'>
            <button className='delete-button' onClick={confirm}>Confirm</button>
            <button className='delete-button' onClick={cancle}>Cancle</button>
        </div>
        }
        
      </div>
    )
}
  

export default DeleteStaff