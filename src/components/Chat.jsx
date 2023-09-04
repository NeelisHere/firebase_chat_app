import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faVideo, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import Messages from "./Messages"
import Input from "./Input"
import { useContext } from "react"
import { ChatContext } from "../context/chatContext"

const Chat = () => {
    const { data } = useContext(ChatContext)
    console.log(4, data)

    return (
        <div className='chatbox'>
            <div className="chatNavbar">
                <div className="chatInfo">
                    <div className="chatImage">
                        <img 
                            src={data.user.photoURL}
                            alt="x" 
                        />
                    </div>
                    <div className="chatNameEmail">
                        <span>{data.user.displayName}</span>
                        <span className="chatEmail">janedoe@humans.com</span>
                    </div>
                </div>
                <div className="chatIcons">
                    <FontAwesomeIcon icon={faPhone} />
                    <FontAwesomeIcon icon={faVideo} />
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
            </div>
            <div className="chat">
                {/* <Messages /> */}
            </div>
            <div className="inputbox">
                <Input />
            </div>
        </div>
    )
}

export default Chat
