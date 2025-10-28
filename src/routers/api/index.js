import express from "express";
//import jwt from "jsonwebtoken";

import communityRouter from "./community.routes.js";
import profileRouter from "./profile.routes.js";
import serverRouter from "./server.routes.js";
import ipRouter from "./ip.routes.js";
//import { JWT_SECRET } from "../../config/constants.js";

const router = express.Router();

router.use("/community", communityRouter)
router.use("/profile", profileRouter)
router.use("/server", serverRouter)
router.use("/ip", ipRouter)
/*
router.get("/auth", (req, res, next) => {
	return res.status(201).json({
		token: jwt.sign({ for: "localtest", createdAt: Date.now() }, JWT_SECRET)
	})
})*/

export default router

//game:GetService("InsertService"):LoadAsset(18728818588).Parent = workspace