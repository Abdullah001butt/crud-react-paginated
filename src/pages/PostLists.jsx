import React, { useState } from "react";
import AddPost from "../components/AddPost";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, fetchPosts } from "../api/posts";
import { useNavigate } from "react-router-dom";

const PostLists = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    isLoading,
    isError,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts", page, pageSize],
    queryFn: () => fetchPosts(page, pageSize),
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = (id) => {
    deletePostMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  console.log(posts);
  return (
    <div className="max-w-md mx-auto p-4 pt-6">
      <AddPost />
      <ul className="divide-y divide-gray-200">
        {posts.map((post, index) => (
          <li key={index} className="py-4">
            <div
              onClick={() => navigate(`/post/${post.id}`)}
              className="bg-white shadow-md rounded px-4 py-2 cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
            >
              <h4 className="text-lg font-bold text-blue-600 hover:text-blue-800">
                {post.title}
              </h4>
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => navigate(`/post/${post.id}/edit`)}
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <span className="mx-2">{page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostLists;
