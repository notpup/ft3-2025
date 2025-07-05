import express from "express";

import communityController from "../../controllers/community.controller.js";

const router = express.Router();

router.get("/test", communityController.test)
export default router