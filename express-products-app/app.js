const express = require("express");
const bodyParser = require("body-parser");
const path = require("./utils/path");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
console.log(path.join(path.rootDir, "public"));
app.use(express.static(path.join(path.rootDir, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(productRoutes);
app.use("/admin", adminRoutes);

app.listen(3000, () => {
  console.log("server listening at port 3000");
});
