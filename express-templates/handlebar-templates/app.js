const express = require("express");
const expressHandlers = require("express-handlebars");
const path = require("./utils/path");
const app = express();

app.use(express.static(path.join(path.rootDir, "public")));

// Note we don't need to predefine engine for pug, but we require for handlebar as handlebar template engine
// is not supported by default by express.
const engineName = "hbs";
const fileExtensionName = "hbs";
app.engine(
  engineName,
  expressHandlers({
    layoutsDir: "views/layouts",
    defaultLayout: "main_layout",
    extname: fileExtensionName,
  })
);

app.set("view engine", engineName);
app.set("views", "views");

app.get("/", (req, res) => {
  let users = [{ name: "Amit" }, { name: "Shah" }, { name: "Modi" }];
  res.render("shop", {
    users,
    hasUsers: users.length > 0,
    pageTitle: "Users Shop",
    activeGuestShop: true,
    mainCSS: true,
  });
});

app.get("/without-default-layout", (req, res) => {
  let users = [{ name: "Amit" }, { name: "Shah" }, { name: "Modi" }];
  res.render("shop", {
    users,
    hasUsers: users.length > 0,
    pageTitle: "Users Shop",
    // Magic property, setting which false default layout will not be applied
    layout: false,
  });
});

app.listen(3000, () => {
  console.log("Server listening at port 3000.");
});
