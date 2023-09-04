import { useContext, useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/authContext";


const Chats = () => {
    const [chats, setChats] = useState([])
    const { currentUser } = useContext(AuthContext)

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

    console.log(chats)
    return (
        <div className='chats'>
            {
                chats?.map((chat, index) => {
                    return (
                        <div className="userChat" key={index}>
                            <img
                                src={chat[1].userInfo.photoURL}
                                alt="x"
                            />
                            <div className="userChatInfo">
                                <span>{chat[1].userInfo.displayName}</span>
                                <span className="userChatLatestMessage">{chat[1].userInfo.lastMessage?.text}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Chats
