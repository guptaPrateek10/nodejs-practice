import http from "http";
import path from "path";
import express from "express";
import fs from "fs";
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

//this is express framework approch
const app = express();

app.get("/getFile", (req, res) => {
  //   res.sendFile("./index.html");
  const pathloc = path.resolve();
  res.sendFile(path.join(pathloc, "./index.html"));
  //   const file = fs.readFileSync("./index.html");
});

app.listen(5000, () => {
  console.log("server has started");
});

//using middlewares.
app.use(express.static(path.join(path.resolve(), "public")));

//setting up View engine
app.set("view engine", "ejs");
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
