const express = require("express");
const router = express.Router();
const users = [];

router.get("/add-user", (req, res, next) => {
  const html = `<form action="/admin/add-user" method="POST">
          <input name="username" type="text" placeholder="Username" />
          <input type="submit" value="Add User" />
      </form>`;
  return res.send(html);
});

router.post("/add-user", (req, res, next) => {
  // will be undefined if body parser will not be used.
  users.push(req.body.username);
  res.redirect("/");
});

// Middlewares
router.use("/users", (req, res, next) => {
  const html = `
          <ul>
              ${users.map((user) => `<li>${user}</li>`).join("")}
          </ul>
          <a href="/">Back</a>
      `;
  // For text type, express automatically consider Content-Type to be text/html
  res.send(html);
});

exports.router = router;
exports.users = users;
