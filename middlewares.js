module.exports = (req, res, next) => {
  if (req.method === "DELETE" && req.url.startsWith("/posts/")) {
    const id = req.url.split("/").pop();
    const postIndex = db.posts.findIndex((post) => post.id === parseInt(id));
    if (postIndex !== -1) {
      db.posts.splice(postIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).send({ error: "Post not found" });
    }
  } else {
    next();
  }
};
