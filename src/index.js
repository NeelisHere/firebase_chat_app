import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from "./context/authContext";
import { ChatContextProvider } from './context/chatContext';
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<AuthContextProvider>
		<ChatContextProvider>
			<ChakraProvider>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</ChakraProvider>
		</ChatContextProvider>
	</AuthContextProvider>
);
