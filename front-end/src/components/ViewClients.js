import React from 'react'

import '../styles/ViewClients.css'

function ViewClients() {
    return (
      <div className="ViewClients">
        <h1 className='func-title'>View Clients</h1>
        <div clasName="table-container">
          <table className="table">
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>1001</td>
                <td>Pasan Ransika</td>
                <td>Rathnayake</td>
                <td>pasanransika1@gmail.com</td>
                <td>Action</td>
              </tr>
          </table>
        </div>
      </div>
    );
}
  

export default ViewClients