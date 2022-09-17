import axios from 'axios';
import React, { useEffect, useState } from 'react'

import '../styles/ViewStaffs.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeSharpIcon from '@mui/icons-material/UpgradeSharp';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

function ViewStaffs() {

  const [staff, setStaff] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/viewstaffs')
    .then((res) => setStaff(res.data))
  })


    return (
      <div className="ViewStaffs">
        <h1 className='func-title'>View Staffs</h1>
        <div clasName="table-container">
          <table className="table">
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
              {staff.map((item) => {
                    return (
                      <tr>
                      <td>{item.staff_id}</td>
                      <td>{item.s_fname}</td>
                      <td>{item.s_lname}</td>
                      <td>{item.s_email}</td>
                      <td className='actions'>
                      <Link className='text-link' to={`/staff/add/${item.staff_id}`} >
                            <IconButton >
                              <RemoveRedEyeIcon />
                            </IconButton>
                          </Link>
                          <Link className='text-link' to={`/staff/delete/${item.staff_id}`} >
                            <IconButton >
                            <DeleteIcon />
                            </IconButton>
                          </Link>
                          <Link className='text-link' to={`/staff/update/${item.staff_id}`} >
                            <IconButton >
                            <UpgradeSharpIcon />
                            </IconButton>
                          </Link>
                      </td>
                      </tr>)
                })}
              
          </table>
        </div>
      </div>
    );
}
  

export default ViewStaffs