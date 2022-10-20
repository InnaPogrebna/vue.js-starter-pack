require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
})

app.post("/autorization", (req, res) => {
  const USERNAME = 'duck_admin';
  const PASSWORD = 'Tfw54dv7H';
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    const user = {
      id: 1,
      name: USERNAME,
      username: PASSWORD,
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    res.json({
      token,
      user,
    });
  } else {
    res.status(403);
    res.json({
      message: "wrong",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});