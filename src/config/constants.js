import dotenv from "dotenv"
import { __dirname } from "./path.js";

dotenv.config({ path: __dirname+"/env/.env.test" })

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const JWT_SECRET = process.env.JWT_SECRET

export { PORT, MONGO_URI, JWT_SECRET }