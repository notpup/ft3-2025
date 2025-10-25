import express from "express";
import middlewares from "../../middlewares/index.js";
import db from "../../models/index.js";
import CustomError from "../../helpers/customError.js";
const router = express.Router();

router.get(
  "/:userId",
  middlewares.verifyAuthorization,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const profile = await db.Profile.findOne({ userId: userId });
      if (profile == null) {
        throw new CustomError(404, "Profile not found");
      }
    } catch (err) {
      console.log(err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json(
        err.details || {
          success: false,
          status: statusCode,
        }
      );
    }
  }
);

router.post(
  "/:userId",
  middlewares.verifyAuthorization,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const profile = await db.Profile.create({
        userId: userId,
        firstJoin: Date.now(),
      });
      return res.status(201).json({
        success: true,
        status: 201,
        response: profile,
      });
    } catch (err) {
      console.log(err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json(
        err.details || {
          success: false,
          status: statusCode,
        }
      );
    }
  }
);

router.patch(
  "/:userId",
  middlewares.verifyAuthorization,
  async (req, res, next) => {
    console.log("patch")
    try {
      const { userId } = req.params;
      const { playtime, ownedSkins, equippedSkins, data, settings } = req.body;

      const edited = await db.Profile.findOneAndUpdate(
        { userId: userId },
        { playtime, ownedSkins, equippedSkins, data, settings }
      );
      return res.status(200).json({
        success: true,
        status: 200,
        response: edited,
      });
    } catch (err) {
      console.log(err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json(
        err.details || {
          success: false,
          status: statusCode,
        }
      );
    }
  }
);

export default router;
