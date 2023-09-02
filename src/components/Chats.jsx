import React from 'react'

const Chats = () => {
    return (
        <div className='chats'>
            <div className="userChat">
                <img 
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="x" 
                />
                <div className="userChatInfo">
                    <span>Jane Doe</span>
                    <span className="userChatLatestMessage">hello latest message</span>
                </div>
            </div>
        </div>
    )
}

export default Chats
