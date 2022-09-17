import axios from 'axios';
import { useState } from 'react';
import '../styles/Contactus.css'

function ContactUs() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [comment, setComment] = useState()

    const submitConatactForm = () =>{
      axios.post('http://localhost:3001/contact',{
        name: name,
        email: email,
        comment: comment
      })
    }

    return (
      <div className="ContactUs">
        <h1> Contact us</h1>
        <div className='contact-body'>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br/>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <form className='contact-form' onSubmit={submitConatactForm}>
              <label htmlFor="name"><b>Full name</b></label>
              <input type="text" id="name" placeholder="Enter Full Name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />

              <label htmlFor="email"><b>Email</b></label>
              <input type="text" id="email" placeholder="Enter Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

              <label htmlFor="comment"><b>Comment</b></label>
              <textarea typw="text" id="comment" rows="6" cols="50" placeholder="Comment" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} required ></textarea>

              <button type="submit">Send</button>
          </form>
        </div> 
      </div>
    );
}
  

export default ContactUs