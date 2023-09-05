import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../context/authContext"
import { ChatContext } from "../context/chatContext"


const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext)
    const [date, setDate] = useState({ hours:'', minutes:'', year:'', month:'', day:'' })
    const { data } = useContext(ChatContext)
    // console.log('inside message component:\n', message, data)
    const chatRef = useRef() 

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: 'smooth' })
        const date = new Date(message.date.seconds*1000)
        const month = date.toLocaleString('default', { month: 'long' });
        setDate({
            hours: date.getHours(),
            minutes: date.getMinutes(),
            year: date.getFullYear(),
            month: month.slice(0, 3),
            day: date.getDay()
        })
    }, [message])

    return (
        <div ref={chatRef} className={message.senderId !== currentUser.uid?"messageFromOtherUser":"messageFromYou"}>
            <div className="userPic">
                <img
                    src={message.senderId !== currentUser.uid ? data.user.photoURL : currentUser.photoURL}
                    alt="x"
                />
            </div>
            <div className="messageInfo">
                <div className="messageContent">
                    {message.text}
                </div>
                {
                    message.imageFile && 
                    <img 
                    src={message.imageFile} 
                        style={{
                            height: '100px', 
                            width: '100%', 
                            borderRadius: '5px',
                            objectFit: 'cover',
                            marginTop: '10px',
                            // border: '2px solid red',
                            marginBottom: '10px',
                        }} 
                        alt="" 
                    />
                }
                <div className="messageTime">
                    {/* {console.log(new Date(message.date.nanoseconds))} */}
                    {`${date.month} ${date.day}, ${date.year} - ${date.hours}:${date.minutes}`}
                    
                </div>
            </div>
        </div>
    )
}

export default Message
