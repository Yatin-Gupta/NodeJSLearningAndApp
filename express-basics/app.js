const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const path = require("./utils/path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();
app.use(express.static(path.join(path.rootDir, "public")));
// With deprecated bodyParser you need to pass extended explicitly. Passing it explicitly will not make it deprecated.
app.use(bodyParser.urlencoded({ extended: false }));

// All the routes will be prefixed with /admin now
app.use("/admin", adminRoutes.router);

app.use(shopRoutes);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(path.rootDir, "views", "404.html"));
});

const server = http.createServer(app);
server.listen(3000, () => {
  console.log("Server open at port 3000");
});

// app.listen(3000, () => {
//   // server declaration in line 17 and server listen can be replaced by app.listen.
//     console.log("Server open at port 3000");
// });
