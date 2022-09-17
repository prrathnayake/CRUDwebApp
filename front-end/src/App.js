import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import Home from './components/Home'
import ContactUs from './components/ContactUs'
import AboutUs from './components/AboutUs'
import Login from './components/Login'
import Admin from "./components/Admin";
import Staff from "./components/Staff";
import ForgetPassword from "./components/ForgetPassword";
import Reset from "./components/Reset";
import ViewStaff from "./components/ViewStaffs";
import StaffDetails from "./components/StaffDetails";
import DeleteStaff from "./components/DeleteStaff";
import UpdateStaff from "./components/UpdateStaff";
 
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<Admin />} />
        <Route path="staff" element={<Staff />} />
        <Route path="forgetPassword" element={<ForgetPassword />} />
        <Route path="staff/add/:id" element={<StaffDetails />} />
        <Route path="staff/delete/:id" element={<DeleteStaff />} />
        <Route path="staff/update/:id" element={<UpdateStaff />} />
        <Route path="resetPassword/:token" element={<Reset />} />
        <Route path="*" element=
        {
            <main>
              <h1>There's nothing here!</h1>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
