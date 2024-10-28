const express = require("express");
require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware");
const { connectToMongoDB } = require("./services/database.services");
const corsOptions = {
    origin: "*",
};


const app = express();
require('express-async-errors');

app.use(express.json({
  limit: "50mb"
}));

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(errorHandler);

app.use((req, res) => {
  res
    .status(404)
    .json({
      success: false,
      message: `The route '${req.method} ${req.url}' doesn't exists on the API!`
    });
});


connectToMongoDB().then(async () => {
  startServer();
});

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5887;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
  } catch (error) {
    console.error("Error while starting the server: ", error);
  }
};
