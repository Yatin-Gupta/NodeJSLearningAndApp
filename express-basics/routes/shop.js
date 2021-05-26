const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  const html = `<a href="/admin/users">Users</a> <a href="/admin/add-user">Add User</a>`;
  res.send(html);
});

module.exports = router;
