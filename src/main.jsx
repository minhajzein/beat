import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route path='/*' element={<App />} />
				</Routes>
			</Provider>
		</BrowserRouter>
	</StrictMode>
)
