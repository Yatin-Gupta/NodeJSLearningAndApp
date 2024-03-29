const http = require("http");
const router = require("./router");

const server = http.createServer(router.handler);
server.listen(3000, () => {
  console.log("Registered ", router.routeDisplayName);
  console.log("Server listening at 3000 port");
});
