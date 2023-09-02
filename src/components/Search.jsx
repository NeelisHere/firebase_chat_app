import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Search = () => {
    return (
        <div className='search'>
            <div className="searchForm">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input type="text" placeholder="Find a User" />
            </div>
            <div className="userChat">
                <img 
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="x" 
                />
                <div className="userChatInfo">
                    <span>Jane Doe</span>
                    <span className="userChatEmail">janedoe@humans.com</span>
                </div>
            </div>
        </div>
    )
}

export default Search
