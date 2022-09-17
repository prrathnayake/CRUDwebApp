import '../styles/Navbar.css'
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  return navigate('/login')
}

    return (
      <div className="Navbar">
        <img src={require('../images/colored_logo.png' )}alt='Logo' />
        <ul className='list-item'>
            <li><Link className='text-link' to='/'>HOME</Link></li>
            <li><Link className='text-link' to='/contactus'>CONTACT US</Link></li>
            <li><Link className='text-link' to='/aboutus'>ABOUT US</Link></li>
            {!localStorage.getItem('token') ? null : <li><Link className='text-link' to='/admin'>PANEL</Link></li> }
        </ul>
        {!localStorage.getItem('token') ? <Link className='text-link' to='/login'><button className='login-btn'>LOGIN</button></Link> : <button onClick={logout} className='login-btn'>LOGOUT</button>}
        
      </div>
    );
}
  

export default Navbar