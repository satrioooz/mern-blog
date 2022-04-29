const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
// const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

require("dotenv").config();

const db = require("./api/models/");
const { config } = require("dotenv");
db.mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(`Cannot connect to the database ${err}`);
    process.exit();
  });

require("./api/routes/user.routes")(app);

app.listen(process.env.PORT, () => {
  console.log(`Starting development server http://localhost:5000`);
});
