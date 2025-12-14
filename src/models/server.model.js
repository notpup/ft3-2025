import mongoose, { mongo } from "mongoose";

const serverSchema = new mongoose.Schema({
  rootPrivateServerId: { type: String, required: true, unique: true },
  serverId: { type: String, required: true, unique: true },
  accessCode: { type: String, required: true, unique: true },
  ownerId: { type: String, required: true, unique: true },
  rootPlaceId: { type: String, required: true, unique: true },
  premium: { type: Boolean, default: false },
  workshop: [{ type: mongoose.Types.ObjectId, ref: "uploads" }],
  thirdparty: {
    maps: [
      {
        data: { type: mongoose.Types.ObjectId, ref: "uploads" },
      },
    ],
    lobbys: [
      {
        data: { type: mongoose.Types.ObjectId, ref: "uploads" },
      },
    ],
    gs: [
      {
        data: { type: mongoose.Types.ObjectId, ref: "uploads" },
      },
    ],
  },
  apis: {
    externalJoin: {
      // Creado para external joins
      enabled: { type: Boolean, default: false },
      externalJoinCode: { type: String, default: "" },
    },
    clanlabs: {
      enabled: { type: Boolean, default: false },
      setby: { type: String, default: "" },
      clanId: { type: String, default: "" },
      tokenId: { type: String, default: "" },
      actionWebhook: { type: String, default: "" },
    },
    discord: {
      enabled: { type: Boolean, default: false },
      chatlogEnabled: { type: Boolean, default: false },
      commandlogEnabled: { type: Boolean, default: false },
      webhook: { type: String, default: "" },
    },
  },
  data: {
    serverName: { type: String, default: "" },
    serverIcon: { type: String, default: "" },
    serverPrivacy: {
      type: String,
      default: "Private",
      enums: ["Private", "Public"],
    },
    profileFollow: { type: Boolean, default: true },
    playerJoinType: {
      type: String,
      default: "Direct",
      enums: ["Direct", "Pending"],
    },
    separatedLighting: { type: Boolean, default: true },
    hideAdminPanelToNoadmins: { type: Boolean, default: true },

    bubbleChat: { type: Boolean, default: true },
    bubbleChatStyle: {
      type: String,
      default: "Light",
      enums: ["Light", "Dark"],
    },
    lobbyTools: { type: Boolean, default: true },
    healthRegen: { type: Boolean, default: true },
    accesoriesHitbox: { type: Boolean, default: true },
    allowMediguns: { type: Boolean, default: true },
    allowDisplayNames: { type: Boolean, default: true },
    automatedTeams: { type: Boolean, default: false },
    
    gunsys: { type: String, default: "RCL" },
    map: { type: String, default: "Bricktops" },
    skybox: { type: String, default: "Default" },
    lobby: { type: String, default: "Default" },
    outscore: { type: Number, default: 0 },
    gamemode: { type: String, default: "None" },
    respawnTime: { type: Number, default: 5 },
    forcefieldTime: { type: Number, default: 5 },
    afterkillTolerance: { type: Number, default: 1000 },
    minAge: { type: Number, default: 0 },

    customTeams: {
      enabled: { type: Boolean, default: false },
      teams: [
        {
          name: { type: String, default: "" },
          teamcolor: { type: String, default: "" },
        },
      ],
    },
    defaultTeams: {
      red: {
        name: { type: String, default: "" },
        teamcolor: { type: String, default: "" },
      },
      blue: {
        name: { type: String, default: "" },
        teamcolor: { type: String, default: "" },
      },
      lobby: {
        name: { type: String, default: "" },
        teamcolor: { type: String, default: "" },
      },
      playing: {
        name: { type: String, default: "" },
        teamcolor: { type: String, default: "" },
      },
    },
  },
});

const Server = mongoose.model("servers", serverSchema);
export default Server;
