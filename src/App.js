import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useContext } from 'react'
import { AuthContext } from './context/authContext'

const ProtectedRoute = ({ children }) => {
	const { currentUser } = useContext(AuthContext)
	if(!currentUser) return (<Navigate to={'/login'} />)
	else return children
} 


const router = createBrowserRouter([
	{ path: '/', element: <ProtectedRoute><Home /></ProtectedRoute>},
	{ path: '/register', element: <Register /> },
	{ path: '/Login', element: <Login /> },
])

function App() {
	return (
		<div>
			<div><Toaster /></div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
