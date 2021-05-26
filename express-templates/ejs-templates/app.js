const express = require("express");
const path = require("./utils/path");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(path.rootDir, "public")));

app.use((req, res) => {
  res.render("404", {
    title: "404 Page",
    showErrorPrefix: false,
    items: [
      { title: "Vivo", active: true },
      { title: "Asus", active: false },
      { title: "Motrola", active: false },
      { title: "Redmi", active: true },
    ],
  });
});

app.listen(3000, () => {
  console.log("Server listening at port: ", 3000);
});
