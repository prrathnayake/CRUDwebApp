import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Reset() {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const id = useParams().token

    const resetPassword = (e) => {
        e.preventDefault()
        if( password !== confirmPassword) return console.log('password doesn\'t match!!!')
        axios.post('http://localhost:3001/reset', {
            accessToken : id,
            password: password,
        }).then((res) => {
            return console.log(res.data)
        })
    }

    return (
      <div className="Reset">
        <h1>Rest</h1>

        <form onSubmit={resetPassword} >

            <label>Enter a new password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>Confirm password</label>
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type='submit'>Submit</button>

        </form>
      </div>
    );
}
  

export default Reset