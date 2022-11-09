const express = require("express");
const cookies = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors")
require("dotenv").config();
// Initialize a express application
const app = express();
app.use(express.json());
app.use(cors());
// initialize session
app.use(session({
name: process.env.SESSION_NAME,
secret: process.env.SESSION_SECRET,
saveUninitialized: false,
resave: false,
cookie: {maxAge: process.env.COOKIE_EXPIRE * 24 * 24 * 60 * 1000}
}));
app.use(cookies());
app.use("/api/auth", require("./routes"));
// Initialize passport

require("./passport/local")(passport);
app.use(passport.initialize());
app.use(passport.session());
// Start the app
const PORT = process.env.PORT;
app.listen(PORT, console.log("server have been lift off 🚀"));