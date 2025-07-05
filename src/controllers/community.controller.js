//import communityService from "../services/community.service.js";

const test = (req, res, next) => {
	try {
		return res.status(200).json({
			message: "lo hiciste bien...",
			status: 200
		})
	} catch(err) {
		return res.status(500).json({
			message: "lo hiciste mal, nose como pero lo lograste hacer mal...",
			status: 500
		})
	}
}

export default {
	test
}