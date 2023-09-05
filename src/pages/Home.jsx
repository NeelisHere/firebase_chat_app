import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { useContext } from 'react'
import { ChatContext } from '../context/chatContext'
import NoChatSelected from '../components/NoChatSelected'


const Home = () => {
    const { data } = useContext(ChatContext)
    return (
        <div className="home">
            <div className="container">
                <Sidebar />
                {
                    data.chatId === 'null'?
                    <NoChatSelected />:<Chat />
                }
            </div>
        </div>
    )
}

export default Home
