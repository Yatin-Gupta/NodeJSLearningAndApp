const express = require("express");
const path = require("./utils/path");
const app = express();

app.use(express.static(path.join(path.rootDir, "public")));
// Note here we provide pug directly in view engine. Its not same with all view engines. Because
// pug is supported out of box by express and auto registered with it, thus it works here.
app.set("view engine", "pug");
// This is required if views directory is not in root of your nodejs application
app.set("views", "views");

app.get("/", (req, res) => {
  const users = [{ name: "Ajay" }, { name: "Pawan" }];
  // No need to provide full name or path
  res.render("shop", { users, pageTitle: "My Shop", path: "/" });
});

app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
