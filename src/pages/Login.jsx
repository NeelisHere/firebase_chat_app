import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <p className="title">Login</p>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password"/>
                    <button type="submit">Login</button>
                </form>
                <p>No account? <Link to={'/register'}>Register</Link> </p>
            </div>
        </div>
    )
}

export default Login
