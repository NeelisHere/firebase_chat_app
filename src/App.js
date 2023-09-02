import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

const router = createBrowserRouter([
	{ path: '/', element: <Home/> },
	{ path: '/register', element: <Register/> },
	{ path: '/Login', element: <Login/> },
])  

function App() {
	return (
		<div>
			<RouterProvider router={router}/>
		</div>
	);
}

export default App;
