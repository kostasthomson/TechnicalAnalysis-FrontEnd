import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home, Analysis } from "./Pages";

function App() {
	return (
		<BrowserRouter>
			<header className="w-full h-20 flex items-center ps-20 pe-20 text-2xl font-bold bg-blue-500 text-white">
				<h1>TDTM</h1>
			</header>
			<Routes>
				<Route index element={<Home />} />
				<Route path="analysis/*" element={<Analysis />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
