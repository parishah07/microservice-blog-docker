const express = require("express");
const app = express();

app.use(express.json());  

const users = [];  


app.get("/", (req, res) => {
  res.send("Hello, Express!");
});


app.post("/users", (req, res) => {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});


app.get("/users", (req, res) => {
  res.json(users);
});


let posts = [];


app.post("/posts", (req, res) => {
  const { title, content, userId } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    userId,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});


app.get("/posts", (req, res) => {
  res.json(posts);
});


app.put("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) return res.status(404).send("Post not found");

  post.title = req.body.title;
  post.content = req.body.content;
  res.json(post);
});


app.delete("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((p) => p.id !== postId);
  res.status(204).send();
});


app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});