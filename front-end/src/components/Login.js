import React, {useLayoutEffect} from 'react'
import '../styles/Login.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [err, setErr] = React.useState('')

    useLayoutEffect(() => {
      if(localStorage.getItem('token')){
          const accessToken = JSON.parse(localStorage.getItem('token'))
          axios.post('http://localhost:3001/adminAuth', {
              accessToken : accessToken
          }).then((res) => {
              if(res.data === 'authenticated') return navigate('/admin')
          })
      }  
  })

  const login = async (e) =>{
    e.preventDefault()
    if (email !== '' || password !== ''){
      try {
        setEmail('')
        setPassword('')
        await axios.post('http://localhost:3001/login', {
          email: email,
          password: password
        }).then((res) => {
          if (res.data.accessToken)
          {
            localStorage.setItem('token', JSON.stringify(res.data.accessToken))
            localStorage.setItem('role', JSON.stringify(res.data.role))
            if(res.data.role === 'admin') return navigate(`/admin`)
            navigate(`/staff`)
          }else {
            setErr(res.data)
          }
        })       
      }catch(error) {
        console.log(error)
      }
      
    }
  }

  const googleLogin = async () => {
    console.log('Login through Google')
    await axios.get('http://localhost:3001/google')
  }

  const facebookLogin = async () => {
    console.log('Login through Facebook')
    await axios.get('http://localhost:3001/facebook')
  }



    return (
      <div className="Login">
        <div className='login-form'>
            <form className='form' onSubmit={login}>
                <label className='label' name='email'>Email</label>
                <input placeholder="Enter your Email" type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label className='label' name='password'>Password</label>
                <input placeholder="Enter your Email" type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                {err ? <p className='err-msg'>{err}</p> : null}
                <button type='submit'>LogIn</button>
                <label className='forget'>Forget password?  <Link className='text-link' to='/forgetPassword'>click</Link></label>
            </form>

            <div className='extra-login'>
                <button onClick={googleLogin}><GoogleIcon /> Login with Google account</button>
                <button onClick={facebookLogin}><FacebookRoundedIcon/> Login with Facebook account</button>
            </div>
        </div>
      </div>
    );
}
  

export default Login