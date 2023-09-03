import { Link } from "react-router-dom"
import "../style.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Register = () => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            username: '',
            email: '',
            password: '',
            pfp: '',
        }
        Object.keys(user).forEach((key, index) => {
            user[key] = e.target[index].value
        })
        // console.log(1, user)

        try {
            const res = await createUserWithEmailAndPassword(auth, user.email, user.password)
            // console.log(2, res.user)
            const picName = user.username.split(' ').join('-')
            const storageRef = ref(storage, picName);

            const uploadTask = uploadBytesResumable(storageRef, user.pfp);

            uploadTask.on(
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('pfp available at', downloadURL);
                        await updateProfile(res.user, {
                            displayName: user.username,
                            photoURL: downloadURL
                        })
                    });
                }
            );

        } catch (error) {
            console.log(error)
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
                    <button type="submit">Register</button>
                </form>
                <p>Already have an account? <Link to={'/login'}>Login</Link> </p>
            </div>
        </div>
    )
}

export default Register
