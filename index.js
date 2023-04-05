import http from "http";
import path from "path";
import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import cookieparser from "cookie-parser";
//it tells us the directopry name. path has some other methods as well.
// console.log(path.dirname("/home/index,js"));

//this is the http approch (without the express framework approch)
// const server = http.createServer((req, res) => {
// //   if (req.url === "/about") {
// //     res.end("<h1>Hello its me prateek</h1>");
// //   } else if (req.url === "/") {
// //     res.end("<p>This is Homepage</p>");
// //   } else if (req.url === "/contact") {
// //     res.end("<h1>This is Contactpage</h1>");
// //   }
// });
// server.listen(5000, () => {
//   console.log("server is running");
// });
const users = [];

//this is express framework approch
const app = express();

app.listen(5000, () => {
  console.log("server has started");
});

//using  middlewares.
// to make the public folder as default
app.use(express.static(path.join(path.resolve(), "public")));

//This is a by default middleware for POST and PUT req for sending the req.body to the server
app.use(express.urlencoded({ extended: true }));

//This is cookieparser middleware setup
app.use(cookieparser());
//setting up View engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { name: "prateek" });
  // res.sendFile("index");
});
app.get("/success", (req, res) => {
  res.render("success");
  // res.sendFile("index");
});
app.post("/contactsave", (req, res) => {
  users.push({ user_name: req.body.name, email: req.body.email });
  // res.render("success");
  res.redirect("/success");
  console.log(users[0].email);
});

app.get("/users", (req, res) => {
  res.json({ users });
});

// app.get("/getFile", (req, res) => {
//   //   res.sendFile("./index.html");
//   const pathloc = path.resolve();
//   res.sendFile(path.join(pathloc, "./index.html"));
//   //   const file = fs.readFileSync("./index.html");
// });

// app.get("/", (req, res) => {
// res.json({
//   name: "Prateek",
//   product: [{ Gupta: "21" }],
// });
// res.status(400).json("meri merzi");
// });

// app.get("/getFile", (req, res) => {
//   const pathlocation = path.resolve();
//   const file = fs.readFileSync(path.join(pathlocation, "./index.html"));
//   // res.send("./index.html");
//   res.sendFile(path.join(pathlocation, "./index.html"));
// });

// app.get("/", (req, res) => {
//   //   res.send("Home Page");
//   //   res.sendStatus(404);
//   res.json({
//     name: "prateek",
//     product: ["cap"],
//   });
// });
// app.get("/gettext", (req, res) => {
//   res.status(400).send("Merimerzi");
// });
//

//Mongo db uses mongoose as a client for schema
mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "backend",
  })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//to create the mongo db schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});

//to create mongodb table(called model)
const message = mongoose.model("usertables", messageSchema);

app.post("/contact", (req, res) => {
  const { name, email } = req.body;
  message
    .create({
      name: name,
      email: email,
    })
    .then(() => {
      res.send("User Data Added");
    });
});
