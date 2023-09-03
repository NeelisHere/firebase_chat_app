import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faVideo, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import Messages from "./Messages"
import Input from "./Input"

const Chat = () => {
    return (
        <div className='chatbox'>
            <div className="chatNavbar">
                <div className="chatInfo">
                    <div className="chatImage">
                        <img 
                            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600" 
                            alt="x" 
                        />
                    </div>
                    <div className="chatNameEmail">
                        <span>Jane Doe</span>
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
                <Messages />
            </div>
            <div className="inputbox">
                <Input />
            </div>
        </div>
    )
}

export default Chat
