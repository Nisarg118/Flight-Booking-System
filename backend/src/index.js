const express = require("express");
const { ServerConfig } = require("./config/index");

const apiRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, (req, res) => {
  console.log("app started");
});
