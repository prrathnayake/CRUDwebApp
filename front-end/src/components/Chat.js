import React from 'react'
import {io} from 'socket.io-client'
import '../styles/Chat.css';

const socket = io('http://localhost:3001')
  
function Chat() {

  const [message, setMessage] = React.useState({
    message:'',
    send: true
  })

  const [messageList, setMessageList] = React.useState([])
  const [room, setRoom] = React.useState('')

  socket.on('connect', () => {
    setMessageList([...messageList,{message:`You connected with id: ${socket.id}`, send:true}])
  })

  socket.on('recieve-message', message => {
    setMessageList([...messageList, {message:message, send:false}])
  })
  
  const messageSend = (e) => {
    if (message.message !== ''){
      e.preventDefault();
      setMessageList([...messageList, {message:message, send:true}])
      setMessage({message:'', send:true});
      socket.emit('send-message', message, room)
    } else{
      e.preventDefault();
      setMessage({message:'', send:true});
    }
  } 

  const joinRoom = (e) => {
    if (room !== ''){
      e.preventDefault();
      setRoom(room)
      socket.emit('join-room', room)
      setMessageList([...messageList,{message:`You join to: '${room}' Room`, send:true}])
    } else{
      e.preventDefault();
      setRoom(room)
      socket.emit('join-room')
      setMessageList([...messageList,{message:`Broadcasting.....`, send:true}])
    }
  }
  
  
  
  
  
  
  return (
    <div className="Chat" >

      <form className='room' onSubmit={joinRoom}>
        <input id='room' name='room' placeholder='Room' value={room} onChange={e => setRoom(e.target.value)}></input>
        <button type='submit'>Join</button>
      </form>

      <div className='chat-box'>
        {messageList.map((item) => (
          <p className={`message ${item.send ? "message-send" : ""}` } >
              {item.message}
          </p>
        ))}
      </div>

      <form className='send' onSubmit={messageSend}>
        <input id='send' name='send' value={message.message} placeholder='Type a messsage' onChange={e => setMessage(e.target.value)} ></input>
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default Chat;
