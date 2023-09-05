import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faVideo, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import Messages from "./Messages"
import Input from "./Input"
import { useContext, useState } from "react"
import { ChatContext } from "../context/chatContext"
import { Badge } from "@chakra-ui/react"

const Chat = () => {
    const { data } = useContext(ChatContext)
    const [attachments, setAttachments] = useState([])
    // console.log(4, data)
    const removeAttachment = () => {
        setAttachments([])
    }

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
                <Messages />
            </div>
            <div className="attachments">
                {
                    attachments.map((attachment) => {
                        return (
                            <Badge className="tag" onClick={removeAttachment}>
                                {attachment.type}
                            </Badge>
                        )
                    })
                }
            </div>
            <div className="inputbox">
                <Input attachments={attachments} setAttachments={setAttachments}/>
            </div>
        </div>
    )
}

export default Chat
