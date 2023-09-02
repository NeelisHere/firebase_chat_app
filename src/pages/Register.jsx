import { Link } from "react-router-dom"
import "../style.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <p className="title">Register</p>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <input style={{display: "none"}} type="file" placeholder="Profile Image" id="pfp"/>
                    <label htmlFor="pfp">
                        <FontAwesomeIcon icon={faImage} style={{color: "#858585", margin: '0px 5px'}} />
                        Choose Profile Image
                    </label>
                    <button type="submit">Register</button>
                </form>
                <p>Already have an account? <Link to={'/login'}>Login</Link> </p>
            </div>
        </div>
    )
}

export default Register
