import axios from "axios";
import { useState } from "react";

import '../styles/ForgetPassword.css'

function ForgetPassword() {

  const [email, setEmail] = useState('')
  const [form, setForm] = useState({
    id: '',
    f_name: '',
    l_name: '',
    s_email:''
  })

  const requestPassword = async(e) => {
    e.preventDefault()
    await axios.post('http://localhost:3001/changePassword',{
      email: email
    }).then((res) => {
      const data = res.data

      setForm({
        id: data.staff_id,
        f_name: data.s_fname,
        l_name: data.s_lname,
        s_email: data.s_email
      })
    })
  }

    return (
      <div className="ForgetPassword">
        <h1 className="ForgetPassword-title">Forget Password!!!</h1>

          {form.f_name === '' 
          ? <div> 
              <div className="ForgetPassword-form">
                <label htmlFor='email' >Email</label>
                <input placeholder="Enter your email..." name='email' value={email} type='email' onChange={(e) => setEmail(e.target.value)} required />

                <button className="ForgetPassword-button" type='submit' onClick={requestPassword}>submit</button>
              </div>
            </div>
          :<div>
              <h3>Please check your email.</h3>
            </div> 
          }

        </div>
    );
}
  

export default ForgetPassword