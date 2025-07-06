import verifyAuthorization from "./authorization.middleware.js";
import errorHandler from "./errorHandler.js";

const middlewares = {
	verifyAuthorization,
	errorHandler
}

export default middlewares