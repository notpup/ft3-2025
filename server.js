// Gracias no country... me enseñaste mas que la UTN.

import { PORT } from "./src/config/constants.js";
import connectDatabase from "./src/config/mongoose.js";
import morganConfig from "./src/config/logger.js";
import apiRouter from "./src/routers/api/index.js";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(cors());
app.use(morgan(morganConfig));
app.use("/api", apiRouter)

//mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`FT3 running on port: ${PORT}`);
    console.log(`Local URL: http://localhost:${PORT}/`);
  });
//});

connectDatabase();
