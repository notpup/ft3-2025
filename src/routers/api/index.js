import express from "express";

import communityRouter from "./community.routes.js";
//import playerRouter from "./player.routes.js";
//import serverRouter from "./server.routes.js";

const router = express.Router();

router.use("/community", communityRouter)
//router.use("/players", playerRouter)
//router.use("/servers", serverRouter)

export default router