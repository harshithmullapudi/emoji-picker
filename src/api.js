const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors()); // to send CORS headers.
app.use(express.urlencoded()); // to support URL-encoded bodies.
app.use(express.json()); // to support JSON-encoded bodies.

let messages = [];
/**
 * If you haven't used Express before, it's official
 * documentation can be found here:
 *
 * https://expressjs.com/en/starter/basic-routing.html
 *
 * You'll need to add two new routes:
 *
 * 1. POST route `/messages` that accepts and store messages.
 *
 *    Use some simple data store to store the messages, so
 *    that they can be retrieved with the next route.
 *
 * 2. GET route `/messages` that returns stored messages.
 *
 * You can start the server from command line as follows:
 *
 *     $ npm run task2:start
 *
 * You will need to restart the server after making changes
 * for them to reflect.
 *
 * You can check `tests/api.test.js` to see the criteria
 * that this API should satisfy.
 *
 * You can run all tests from the command line as follows:
 *
 *     $ npm run task2:test
 */
app.post("/messages", (req, res) => {
    console.log(req.body.message);
 messages.push(req.body.message);
    res.send("success");
})



app.get("/messages", (req, res) => {
 res.send(messages);
})



app.get("/", (_req, res) =>
  res.send(`
  <span>Hello there! This is the root URL. These are the end-points that you should work on:</span>
  <ul>
    <li><a href="/messages/"><strong>GET</strong> <code>/messages</code></a></li>
    <li>
      <form action="/messages" method="post">
        <input type="hidden" name="message" value="Hello there! 😃 Does this work? 😉" />
        <button type="submit">
          <strong>POST</strong> <code>/messages (message: Hello there! 😃 Does this work? 😉)</code>
        </button>
      </form>
    </li>
  </ul>
  `)
);

module.exports = app;
