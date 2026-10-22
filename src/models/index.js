import Profile from "./profile.model.js";
import Server from "./server.model.js";
import Upload from "./upload.model.js";
import OfficialPlaytime from "./official.playtime.model.js";
import CustomPlaytime from "./custom.playtime.model.js";

const db = {
	Profile,
	Server,
	Upload,
	OfficialPlaytime,
	CustomPlaytime
}

export default db