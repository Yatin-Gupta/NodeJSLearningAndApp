const fs = require("fs");

const header = `<html>
<head>
    <title>Users</title>
</head>
<body>`;
const footer = `</body></html>`;

const routeHandler = (request, response) => {
  const url = request.url;
  const method = request.method.toLowerCase();
  response.setHeader("Content-Type", "text/html");
  if (url === "/") {
    response.write(header);
    response.write(`
        <h3>Hello Guys, Please provide user details</h3>
        <form action="/create-user" method="POST">
            <div>
                <label for="username">Enter Username</label>
                <input id="username" name="username" />
            </div>
            <div>
                <input type="submit" value="Add User" />
            </div>
        </form>
    `);
    response.write(footer);
    console.log("Root executed");
    return response.end();
  } else if (url === "/create-user" && method === "post") {
    const formDataChunks = [];
    request.on("data", (chunk) => {
      formDataChunks.push(chunk);
    });
    request.on("end", () => {
      const parsedBody = Buffer.concat(formDataChunks).toString();
      fs.writeFile("users.txt", parsedBody.split("=")[1], (err) => {
        response.statusCode = 302;
        response.setHeader("Location", "/");
        return response.end();
      });
    });
  } else if (url === "/users") {
    const dummyUsers = ["user1", "user2"];
    response.write(header);
    response.write(`
        <ul>
            ${dummyUsers.map((user) => `<li>${user}</li>`).join("")}
        </ul>
    `);
    response.write(footer);
    return response.end();
  } else {
    response.write("404 Page");
    response.end();
  }
};

module.exports = {
  handler: routeHandler,
  routeDisplayName: "UserRoutes",
};
