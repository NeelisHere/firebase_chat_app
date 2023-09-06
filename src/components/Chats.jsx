import { useContext, useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";


const Chats = () => {
    const [chats, setChats] = useState([])
    const { currentUser } = useContext(AuthContext)
    const { data, dispatch } = useContext(ChatContext) 

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(Object.entries(doc.data()))
            });

            return () => { unsub() }
        }
        if (currentUser.uid) {
            getChats()
        }
    }, [currentUser.uid])

    const handleSelect = (user) => {
        // console.log(1, user)
        dispatch({ type:'CHANGE_USER', payload:user })
    }

    return (
        <div className='chats'>
            {
                // console.log('>>', chats)
                // .sort((a, b) => (a.nanoseconds - b.nanoseconds))
                chats?.map((chat, index) => {
                    // console.log('>>', chat[1].date.seconds)
                    const { lastMessage, userInfo } = chat[1]
                    let selectedChatStyle = {}
                    if (userInfo.uid === data.user.uid) {
                        selectedChatStyle = {
                            backgroundColor: '#dedede'
                        }
                    }
                    return (
                        <div className="userChat" style={selectedChatStyle} key={index} onClick={()=>{handleSelect(userInfo)}}>
                            <img
                                src={userInfo.photoURL}
                                alt="x"
                            />
                            <div className="userChatInfo">
                                <span>{userInfo.displayName}</span>
                                <span className="userChatLatestMessage">
                                    {lastMessage?.imageFile && <FontAwesomeIcon style={{marginRight: '4px'}} icon={faImage} />}
                                    {lastMessage?.sender === currentUser.uid ? 'You: ' : ''}
                                    {lastMessage?.text}
                                </span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Chats
