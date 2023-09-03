import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"


const Navbar = () => {


    return (
        <div className="navbar">
            <div className="user">
                <img 
                    src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="x" />
                {/* <FontAwesomeIcon icon={faUser} /> */}
                <div className="userInfo">
                    <span className="userName">John Doe</span>
                    <span className="userEmail">johndoe@humans.com</span>
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
