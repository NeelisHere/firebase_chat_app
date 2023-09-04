import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { collection, or, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from '../firebase'
import { toast } from "react-hot-toast";
import { AuthContext } from '../context/authContext'

const Search = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedUser, setSearchedUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const { currentUser } = useContext(AuthContext)

    const handleSearch = async (e) => {
        if (e.code === 'Enter') {
            const q = query(
                collection(db, "users"),
                or(
                    where("username", "==", searchText),
                    where("email", "==", searchText)
                )
            );
            try {
                setLoading(true)
                const querySnapshot = await getDocs(q);
                // console.log(querySnapshot)
                if (querySnapshot.docs.length === 0) {
                    setSearchText('')
                    setSearchedUser(null)
                }
                querySnapshot.forEach((doc) => {
                    setSearchedUser(doc.data())
                });
            } catch (error) {
                console.log(error)
                toast.error('Some error occurred!')
            } finally {
                setLoading(false)
            }
        }
    }

    const handleSelect = async () => {
        const combinedId = (currentUser.uid > searchedUser.uid) ? currentUser.uid + searchedUser.uid : searchedUser.uid + currentUser.uid
        try {
            const res = await getDoc(doc(db, 'chats', combinedId))
            if (!res.exists()) {
                await setDoc(doc(db, 'chats', combinedId), { messages: [] })
                console.log(currentUser, searchedUser)

                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: searchedUser.uid,
                        displayName: searchedUser.username,
                        photoURL: searchedUser.photoURL
                    },
                    [combinedId + '.date']: serverTimestamp()
                })
                await updateDoc(doc(db, 'userChats', searchedUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + '.date']: serverTimestamp()
                })
                setSearchText('')
                setSearchedUser(null)
                toast.success('Added to friend list!')
            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong!')
        }
    }

    return (
        <div className='search'>
            <div className="searchForm">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                    type="text"
                    placeholder="Find a User"
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleSearch}
                    value={searchText}
                />
            </div>
            {
                searchedUser &&
                (
                    loading ? 
                    <p style={{textAlign: "center", marginBottom: '10px'}}>Loading...</p> 
                    :
                    <div className="userChat" onClick={handleSelect}>
                        <img
                            src={searchedUser.photoURL}
                            alt="x"
                        />
                        <div className="userChatInfo">
                            <span>{searchedUser.username}</span>
                            <span className="userChatEmail">{searchedUser.email}</span>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Search
