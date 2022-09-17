import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate} from 'react-router-dom';

import '../styles/Admin.css'
import ViewClients from './ViewClients';
import ViewStaffs from './ViewStaffs';


function Admin() {

    const navigate = useNavigate();
    const [body, setBody] = useState('staffs')

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

    function change(page){
        setBody(page)
    }

    const render = useMemo(() => {
        if( body === 'staffs'){
            return(
                <ViewStaffs />
            )
        } else if  (body === 'clients'){
            return(
                <ViewClients />
            )
        }
    },[body])

    return (
      <div className="Admin">
        <h1 className='admin-title'>Admin Panel</h1>
        <div className='admin-body'>
            <div className='admin-navbar'>
               <label className='admin-func' onClick={(e) => change('staffs')}>Vew Staff</label>
               <label className='admin-func' onClick={(e) => change('clients')}>Vew Clients</label>
            </div>
            <div className='nav-body'>
                {render}
            </div>
        </div>
        
        
      </div>
    );
}
  

export default Admin