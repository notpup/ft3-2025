import express from "express";
import middlewares from "../../middlewares/index.js";

const router = express.Router();

//CRUD (No hay delete jeje)
router.get("/:ip", middlewares.verifyAuthorization, async (req, res, next) => {
  try {
    const { ip } = req.params;
    const fetchRequest = await fetch(`https://ipapi.co/${ip}/json`, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
      }
    });
    const json = await fetchRequest.json()
    delete json.ip
    delete json.network
    return res.status(200).json(json)
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
});

export default router;
