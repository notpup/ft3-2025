import express from "express";

import communityController from "../../controllers/community.controller.js";
import middlewares from "../../middlewares/index.js";

const router = express.Router();

router.get("/upload/:id", middlewares.verifyAuthorization, communityController.GetUpload)
router.get("/upload/u/:userId", middlewares.verifyAuthorization, communityController.GetUserUploads) 
router.get("/upload/t/:type", middlewares.verifyAuthorization, communityController.GetUploadsByType) 
router.get("/upload", middlewares.verifyAuthorization, communityController.GetUploadsByName)

router.post("/upload", middlewares.verifyAuthorization, communityController.CreateUpload)

export default router