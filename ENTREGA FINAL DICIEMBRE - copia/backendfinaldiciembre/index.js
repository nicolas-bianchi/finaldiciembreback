const express = require("express");

const morgan = require("morgan");

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const cors = require("cors");

require("dotenv").config();


const pokemonsRoutes = require("./routes/pokemones");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get("/error", (req, res) => {
    res.status(400).json({ error: "Recurso no encontrado" });
  });
  
  app.use("/api", pokemonsRoutes);

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
