import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost } from "../api/posts";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: post,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id),
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="spinner-border animate-spin inline-block w-16 h-16 border-8 rounded-full"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error: {error.message}</p>
      </div>  
    );
  }
  return (
    <div className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="bg-white shadow-md rounded overflow-hidden">
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded absolute right-2 top-2 mt-64 mr-96"
        >
          Back to List Posts
        </button>
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-lg leading-relaxed">{post.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
