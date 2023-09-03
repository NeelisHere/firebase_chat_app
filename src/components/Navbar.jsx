import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'


const Navbar = () => {
    const { currentUser } = useContext(AuthContext) 

    return (
        <div className="navbar">
            <div className="user">
                <img 
                    src={currentUser.photoURL}
                    alt="x" />
                {/* <FontAwesomeIcon icon={faUser} /> */}
                <div className="userInfo">
                    <span className="userName">{currentUser.displayName}</span>
                    <span className="userEmail">{currentUser.email}</span>
                </div>
            </div>
            <button
                style={{
                    backgroundColor: "transparent",
                    outline: 'none',
                    color: 'white',
                    border: 'none', 
                    cursor: 'pointer',
                    marginRight: '10px'
                }}
                onClick={()=>{
                    signOut(auth)
                }}
            >
                <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />
            </button>
        </div>
    )
}

export default Navbar
