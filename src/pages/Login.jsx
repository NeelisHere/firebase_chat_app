import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-hot-toast"


const Login = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        try {
            setLoading(true)
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    toast.success(`${user.displayName} logged in successfully!`)
                    navigate('/')
                })
                .catch((error) => {
                    console.log(error)
                    toast.error(`${error.code}: ${error.message}`)
                });
        } catch (error) {
            console.log(error)
            toast.error(`Some error occurred!`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <p className="title">Login</p>
                <form onSubmit={handleSubmit} >
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button style={{cursor: 'pointer'}} type="submit" disabled={loading}>
                        { loading?'Loading...':'Login' }
                    </button>
                </form>
                <p>No account? <Link to={'/register'}>Register</Link> </p>
            </div>
        </div>
    )
}

export default Login
