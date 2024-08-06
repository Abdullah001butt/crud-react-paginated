import axios from "axios";

export async function fetchPosts(page = 1, pageSize = 2) {
  try {
    const response = await axios.get(
      `http://localhost:3000/posts?_page=${page}&_limit=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchPost(id) {
  try {
    const response = await axios.get(`http://localhost:3000/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createPost(newPost) {
  try {
    const response = await axios.post("http://localhost:3000/posts", newPost, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function updatePost(updatedPost) {
  try {
    const response = await axios.put(
      `http://localhost:3000/posts/${updatedPost.id}`,
      updatedPost,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deletePost(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/posts/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`Post with ID ${id} not found`);
    } else {
      console.error(error);
    }
    return [];
  }
}
