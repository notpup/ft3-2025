import express from "express";

import communityRouter from "./community.routes.js";
//import playerRouter from "./player.routes.js";
import serverRouter from "./server.routes.js";
import ipRouter from "./ip.routes.js";

const router = express.Router();

router.use("/community", communityRouter)
//router.use("/players", playerRouter)
router.use("/server", serverRouter)
router.use("/ip", ipRouter)

export default router

//game:GetService("InsertService"):LoadAsset(18728818588).Parent = workspace