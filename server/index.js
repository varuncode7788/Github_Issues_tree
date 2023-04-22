import express, { json, text, urlencoded } from "express";
import cors from "cors";
// import  from "body-parser";
// import FormData from "form-data";
import fetch from "node-fetch";
// const { client_id, redirect_uri, client_secret } = require("./config");

// const config = require("./config");

const app = express();
app.use(json());
app.use(json({ type: "text/*" }));
app.use(urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);
// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/authenticate", async (req, res) => {
  const { code, client_id, client_secret, redirect_uri } = req.body;

  const data = {
    client_id: "374561dbf0ad6b3a1b28",
    client_secret: "8b51312e58cc54800ffefc298d64a61a8196489a",
    code: code,
    redirect_uri: "http://localhost:3000/Home",
  };
  console.log(data);
  // Request to exchange code for an access token
  const response = await fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const resdata = await response.text();
  console.log(resdata);
  res.json(resdata);
});
app.post("/logout", (req, res) => {
  // Perform logout logic here, e.g. clear session, delete cookies, etc.

  // Send a response to the client indicating successful logout
  res.json({ message: "Successfully logged out" });
});

app.get("/getUserRepo", async function (req, res) {
  req.get("Authorization");
  await fetch("https://api.github.com/user/repos", {
    method: "Get",
    headers: {
      Authorization: req.get("Authorization"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});
const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
