import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
	{ path: '/', element: <Home/> },
	{ path: '/register', element: <Register/> },
	{ path: '/Login', element: <Login/> },
])  

function App() {
	return (
		<div>
			<div><Toaster/></div>
			<RouterProvider router={router}/>
		</div>
	);
}

export default App;
