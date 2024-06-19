import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Analysis from "./Pages/Analysis";
import Home from "./Pages/Home";

//todo: add data manipulation: fetch -> organize -> render
export type File = {
	node_id: string;
	name: string;
	path: string;
	java: boolean;
	complexity: number;
	loc: number;
	td: number;
	numFiles: number;
	commentLines: number;
	codeSmells: number;
	functions: number;
};
export type Author = {
	email: string;
	name: string;
};
export type Commit = {
	sha: string;
	message: string;
	date: string;
	author: Author;
	complexity: number;
	loc: number;
	td: number;
	numFiles: number;
	commentLines: number;
	codeSmells: number;
	functions: number;
	tags: string[];
	files: File[];
	projectName: string;
};
export type DataType = {
	key: string;
	maxTd: number;
	value: Commit[];
};

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
