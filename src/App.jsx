import React from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import PostLists from "./pages/PostLists";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto p-4 flex justify-between">
          <h1 className="text-3xl text-white font-bold">Awesome Crud</h1>
          <ul className="flex items-center">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Posts
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<PostLists />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
