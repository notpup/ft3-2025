import { readFileSync } from 'node:fs';
import { Reader } from '@maxmind/geoip2-node';

import express from "express";
import middlewares from "../../middlewares/index.js";

const dbBuffer = readFileSync('./src/utils/GeoLite2-City.mmdb');
const reader = Reader.openBuffer(dbBuffer);

const router = express.Router();

//CRUD (No hay delete jeje)
router.get("/:ip", middlewares.verifyAuthorization, async (req, res, next) => {
  try {
    const { ip } = req.params;
    const response = reader.city(ip)
    const returnResponse = {
      continent: response.continent.names.en,
      country_name: response.country.names.en,
      region: response.city.names.en,
      city: response.city.names.en
    }
    return res.status(200).json({status: 200, response: returnResponse})

    

    // CODIGO VIEJO, ACTUALMENTE NO SE USA GRACIAS A DIOS (trajo muchos problemas y errores)
    /*
    const fetchRequest = await fetch(`https://ipapi.co/${ip}/json`, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
      }
    });
    const json = await fetchRequest.json()
    const response = {
      country_name: json.country_name,
      region: json.region,
      city: json.city
    }
    console.log(json)
    return res.status(200).json({status: 200, response})*/

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
