import { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/chatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const Messages = () => {
    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext)
    console.log(3, data)
    useEffect(()=>{
        const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc)=>{
            if (doc.exists()) {
                setMessages(doc.data)
            }
        })
        return ()=>{ unsub() }
    }, [data.chatId])

    return (
        <div className='messages'>
            {
                messages.map((message, index) => {
                    <Message key={index} message={message}/>
                }, [])
            }
        </div>
    )
}

export default Messages
