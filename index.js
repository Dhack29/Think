const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Mark",
        content: "AI is a powerful technology that is transforming the way humans work12. According to Sundar Pichai, the CEO at Google, AI is one of the most powerful things humanity is working on, even more powerful than electricity or fire3. AI can automate processes or tasks that once required human power, and can make sense of data on a scale that no human ever could, returning substantial business benefits",
    },
    {   
        id: uuidv4(),
        username: "alex",
        content: "When BMW bought Rolls-Royce from Volkswagen back in 2002, the rights to The Spirit of Ecstasy were held by Volkswagen. Subsequently, Volkswagen requested $40 million to transfer ownership to BMW, which agreed to the terms and paid the sizable sum.",
    },
    {
        id: uuidv4(),
        username: "berry",
        content: "With the iPhone 16 and iPhone 16 Pro, it has never been clearer that the cycle of radical invention has given way to iterative updates—not just on an annual basis, but a monthly one, due to delayed features coming in later software updates during the iOS 18 cycle.",
   },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
} );

app.get("/posts/:id", (req, res) =>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req, res) =>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () =>{
    console.log(`listening to port ${port}`);
});