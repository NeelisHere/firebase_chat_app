import { Link, useNavigate } from "react-router-dom"
import "../style.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore'
import { toast } from "react-hot-toast";
import { useState } from "react";

const Register = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const username = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]
        try {
            setLoading(true)
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const date = new Date().getTime();
            const storageRef = ref(storage, `${username.split(' ').join('-')}-${date}`);
            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    await updateProfile(res.user, {
                        displayName: username,
                        photoURL: downloadURL
                    })
                    await setDoc(doc(db, 'users', res.user.uid), {
                        uid: res.user.uid,
                        username,
                        email,
                        photoURL: downloadURL
                    })
                    toast.success('User Registered Successfully!')
                    navigate('/')
                });
            });

        } catch (error) {
            toast.error('Some error occured!')
            console.log('->', error)
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <p className="title">Register</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input style={{ display: "none" }} type="file" placeholder="Profile Image" id="pfp" />
                    <label htmlFor="pfp">
                        <FontAwesomeIcon icon={faImage} style={{ color: "#858585", margin: '0px 5px' }} />
                        Choose Profile Image
                    </label>
                    <button type="submit" disabled={loading}>
                        {
                            loading? 'Loading...':'Register'
                        }
                    </button>
                </form>
                <p>Already have an account? <Link to={'/login'}>Login</Link> </p>
            </div>
        </div>
    )
}

export default Register
