import React from 'react'

const Chats = () => {
    return (
        <div className='chats'>
            <div className="userChat">
                <img 
                    src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'
                    alt="x" 
                />
                <div className="userChatInfo">
                    <span>Jane Doe</span>
                    <span className="userChatLatestMessage">hello latest message</span>
                </div>
            </div>
            <div className="userChat">
                <img 
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="x" 
                />
                <div className="userChatInfo">
                    <span>Jane Doe</span>
                    <span className="userChatLatestMessage">hello latest message</span>
                </div>
            </div>
            <div className="userChat">
                <img 
                    src='https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600'
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
