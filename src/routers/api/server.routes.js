import express from "express";
import middlewares from "../../middlewares/index.js";

import ServerController from "../../controllers/server.controller.js";

const router = express.Router();

//CRUD (No hay delete jeje)
router.post("/", middlewares.verifyAuthorization, ServerController.CreateServer)
router.get("/:id", middlewares.verifyAuthorization, ServerController.GetServer)
router.post("/:id", middlewares.verifyAuthorization, ServerController.UpdateServer)

export default router