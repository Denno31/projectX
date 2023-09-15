const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

const handlebars = require("express-handlebars");

const dotenv = require("dotenv");
const User = require("./models/User");
const router = require("./routes/userRoutes");

dotenv.config();

const port = 3000;

app.set("view engine", "handlebars");

app.engine(
  "handlebars",
  handlebars.engine({
    layoutsDir: __dirname + "/views/layouts",
  })
);

app.use(express.static("public"));
app.use(express.json());

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

app.use("/", router);

app.listen(port, () => console.log("App listening on port " + port));
