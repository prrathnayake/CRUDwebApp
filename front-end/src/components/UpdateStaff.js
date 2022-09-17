import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import '../styles/UpdateStaff.css'

function UpdateStaff() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState('')
    const [msg, setMsg] = useState('')

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

    useEffect(() => {
            axios.post('http://localhost:3001/staff/view', {
            id:id
        }).then((res) => {
            setDetails(res.data)
        })
    },[id])

    const updateForm = (e) => {
        e.preventDefault()
        if (details !== null) {
            axios.post('http://localhost:3001/staff/update', {
            details: details
        }).then((res) => setMsg(res.data))
    }
    }

    
      
    return (
      <div className="UpdateStaff">
        <h1>Update Staff {id} </h1> {msg ? <h3> - {msg} - </h3> : null}
        <form onSubmit={updateForm} className='update-body'>
            <label htmlFor="fname"><b>Frist Name</b></label>
            <input value={details.s_fname} type="text" id="fname" placeholder="Enter First Name" name="fname" required onChange={(e) => setDetails({...details, s_fname: e.target.value})}/>

            <label htmlFor="lname"><b>Last Name</b></label>
            <input value={details.s_lname} type="text" id="lname" placeholder="Enter Last Name" name="lname" required onChange={(e) => setDetails({...details, s_lname: e.target.value})} />

            <label htmlFor="address"><b>Address</b></label>
            <textarea value={details.s_Address} type="text"  placeholder="Enter Address" name="address" required onChange={(e) => setDetails({...details, s_Address: e.target.value})}></textarea>

            <label htmlFor="mobile"><b>Mobile Number</b></label>
            <input value={details.s_mobile} type="text" id="mobile" placeholder="Enter Mobile Number" name="mobile" required onChange={(e) => setDetails({...details, s_mobile: e.target.value})} />

            <label htmlFor="email"><b>Email</b></label>
            <input value={details.s_email} type="text" id="email" placeholder="Enter Email" name="email" required onChange={(e) => setDetails({...details, s_email: e.target.value})} />

            <label htmlFor="role"><b>Role</b></label>
            <label><b>Current role:  {JSON.stringify(details.s_role)}</b></label>
            <select name="role" id="role" onChange={(e) => setDetails({...details, s_role: e.target.value})} defaultValue={JSON.stringify(details.s_role) ===  "admin" ? 'admin' : 'staff'}>
                <option value="admin">Administrator</option>
                <option value="staff">Staff</option>
            </select>
            {msg ? <h3>{msg}</h3> : null}
            <button type='submit'>Submit</button>
            
        </form>
      </div>
    )
}
  

export default UpdateStaff