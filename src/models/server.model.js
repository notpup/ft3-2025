import mongoose, { mongo } from "mongoose";

const color3Schema = new mongoose.Schema(
  {
    r: { type: Number, required: true, min: 0, max: 255, default: 0 },
    g: { type: Number, required: true, min: 0, max: 255, default: 0 },
    b: { type: Number, required: true, min: 0, max: 255, default: 0 },
  },
  { _id: false },
);

const serverSchema = new mongoose.Schema(
  {
    rootPrivateServerId: { type: String, required: true, unique: true },
    serverId: { type: String, required: true, unique: true },
    accessCode: { type: String, required: true, unique: true },
    ownerId: { type: String, required: true, unique: true },
    // ownerSerealizedString y ownerSerealizedId se añadieron debido a esto:
    // https://devforum.roblox.com/t/update-on-safety-privacy-introducing-scoped-user-identifiers/4677155
    ownerSerializedString: { type: String, required: true, unique: true },
    ownerSerializedId: { type: String, required: true, unique: true },
    rootPlaceId: { type: String, required: true, unique: true },
    premium: { type: Boolean, default: false },
    workshop: [{ type: mongoose.Types.ObjectId, ref: "uploads" }],
    visits: { type: Number, default: 0 },
    // la option del mongoose.Schema() (timestamps) ya añade esto.
    //createdAt: { type: Date, immutable: true },
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
    lighting: {
      _save: { type: Boolean, default: false, required: false },
      ambient: {
        type: color3Schema,
        required: false,
        default: { r: 128, g: 128, b: 128 },
      },
      brightness: { type: Number, required: false, default: 1 },
      colorShiftBottom: {
        type: color3Schema,
        required: false,
        default: { r: 0, g: 0, b: 0 },
      },
      colorShiftTop: {
        type: color3Schema,
        required: false,
        default: { r: 0, g: 0, b: 0 },
      },
      environmentDiffuseScale: { type: Number, required: false, default: 1 },
      environmentSpecularScale: { type: Number, required: false, default: 1 },
      shadows: { type: Boolean, default: false, required: false },
      outdoorAmbient: {
        type: color3Schema,
        required: false,
        default: { r: 128, g: 128, b: 128 },
      },
      timeOfDay: { type: String, default: "14:30:00", required: false },
      exposureCompensation: { type: Number, required: false, default: 0 },
    },
    data: {
      currentGame: { type: Number, default: "" },
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
      savePlayerStats: { type: Boolean, default: true },

      bubbleChat: { type: Boolean, default: true },
      bubbleChatStyle: {
        type: String,
        default: "Light",
        enums: ["Light", "Dark"],
      },

      adminType: {
        type: String,
        default: "Kohl Legacy",
        required: false,
        enums: ["Kohl Legacy", "Kohl Lastest"],
      },

      teamEsp: { type: Number, default: 1 },
      killfeed: { type: Number, default: 1 },

      lobbyTools: { type: Boolean, default: true },
      healthRegen: { type: Boolean, default: true },
      accesoriesHitbox: { type: Boolean, default: true },
      allowMediguns: { type: Boolean, default: true },
      allowDisplayNames: { type: Boolean, default: true },
      automatedTeams: { type: Boolean, default: false },
      customChat: { type: Boolean, default: true },
      saveStats: { type: Boolean, default: true },
      specSystem: { type: Boolean, default: true },
      useDefaultTeamColors: { type: Boolean, default: true },
      useDefaultTeamNames: { type: Boolean, default: true },

      gunsys: { type: String, default: "RCL" },
      map: { type: String, default: "Bricktops" },
      skybox: { type: String, default: "Default" },
      lobby: { type: String, default: "Default" },
      maxPlayers: { type: Number, default: 700 },
      outscore: { type: Number, default: 0 },
      gamemode: { type: String, default: "None" },
      respawnTime: { type: Number, default: 5 },
      forcefieldTime: { type: Number, default: 5 },
      afterkillTolerance: { type: Number, default: 1000 },
      minAge: { type: Number, default: 0 },

      mapChange: { type: Number, default: 1 },
      weaponChange: { type: Number, default: 1 },
      gamemodeChange: { type: Number, default: 1 },
      lobbyChange: { type: Number, default: 1 },

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
  },
  {
    timestamps: true,
  },
);

const Server = mongoose.model("servers", serverSchema);
export default Server;
