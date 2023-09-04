import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { ChatContext } from "../context/chatContext"


const Message = ({ user }) => {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    
    return (
        <div className={user === 'sender'?"messageFromOtherUser":"messageFromYou"}>
            <div className="userPic">
                <img
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="x"
                />
            </div>
            <div className="messageInfo">
                <div className="messageContent">
                    Hello, this is a new message.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur sequi corrupti maxime quis omnis earum vero vel nisi aperiam non!
                </div>
                <div className="messageTime">
                    12:45 AM
                </div>
            </div>
        </div>
    )
}

export default Message
