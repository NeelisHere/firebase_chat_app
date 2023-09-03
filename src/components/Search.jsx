import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { collection, or, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase'
import { toast } from "react-hot-toast";

const Search = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedUser, setSearchedUser] = useState(null)
    const [loading, setLoading] = useState(false)

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
    return (
        <div className='search'>
            <div className="searchForm">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                    type="text"
                    placeholder="Find a User"
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>
            {
                searchedUser &&
                (
                    loading ? 
                    <p style={{textAlign: "center", marginBottom: '10px'}}>Loading...</p> :
                    <div className="userChat">
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
