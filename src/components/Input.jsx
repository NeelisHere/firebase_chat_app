import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import { FileUploadIcon } from "./ExtraIcons"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext"
import { ChatContext } from "../context/chatContext"
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase"
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { Button, ButtonGroup, background } from '@chakra-ui/react'
import { AttachmentIcon } from '@chakra-ui/icons'
import { Badge } from '@chakra-ui/react'
import { Box } from "@chakra-ui/react"
// import { updateProfile } from "firebase/auth"
// import { toast } from "react-hot-toast"
// import { Navigate, useNavigate } from "react-router-dom"

const Input = ({ attachments, setAttachments }) => {
    // const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    useEffect(() => {
        if (imageFile) {
            setAttachments([...attachments, {type: 'image'}])
        } 
        if (!imageFile) {
            setAttachments([])
        }
    }, [imageFile])

    useEffect(() => {
        if(attachments.length === 0) {
            setImageFile(null)
        }
    }, [attachments])

    const handleSend = async () => {
        try {
            setLoading(true)
            if (imageFile) {
                const storageRef = ref(storage, uuid())
                await uploadBytesResumable(storageRef, imageFile).then(() => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        await updateDoc(doc(db, 'chats', data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                imageFile: downloadURL
                            })
                        })
                    });
                });
            } else {
                await updateDoc(doc(db, 'chats', data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now()
                    })
                })
            }
            await updateDoc(doc(db, 'userChats', currentUser.uid), {
                [data.chatId + '.lastMessage']: {
                    text,
                    imageFile: imageFile ? true : false,
                    sender: currentUser.uid
                },
                [data.chatId + '.date']: serverTimestamp()
            })
            await updateDoc(doc(db, 'userChats', data.user.uid), {
                [data.chatId + '.lastMessage']: {
                    text,
                    imageFile: imageFile ? true : false,
                    sender: currentUser.uid
                },
                [data.chatId + '.date']: serverTimestamp()
            })
            setLoading(false)
            console.log('Message sent successfully')
            setText('')
            setImageFile(null)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='inputbox'>
            <div className="typing">
                <input
                    type="text"
                    placeholder="Send message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

            </div>
            <div className="sendicons">
                <Button
                    m={'4px'}
                    w={'36px'}
                    h={'36px'}
                    borderRadius={'50%'}
                    colorScheme='teal'
                    size='sm'
                >
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        id="image-file"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    <label htmlFor="image-file" 
                        style={{ 
                            // border: '2px solid red', 
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: "pointer" 
                        }}
                    >
                        <AttachmentIcon />
                    </label>
                    
                </Button>

                <Button m={'4px'} isLoading={loading} onClick={handleSend} colorScheme='teal' size='sm'>
                    Send
                </Button>
            </div>
        </div>
    )
}

export default Input
