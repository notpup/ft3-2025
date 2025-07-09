import CustomError from "../helpers/customError.js";
import db from "../models/index.js";

const CreateServer = async (body) => {
  const { ownerId, rootPrivateServerId, serverId, accessCode, rootPlaceId } =
    body;
  const data = await db.Server.create({
    ownerId,
    rootPrivateServerId,
    serverId,
    accessCode,
    rootPlaceId,
  })
    .then((created) => {
      return { success: true, status: 201, created };
    })
    .catch((err) => {
      return { success: false, status: 400, message: err.errorResponse.errmsg };
    });
  if (data.success == false) {
    throw new CustomError(data.status, data.message);
  }
  return data.created;
};

const GetServer = async (id) => {
  console.log("buscando:", id)
  const orArr = [
    { serverId: id },
    { rootPrivateServerId: id },
    { ownerId: id },
  ];
  const finded = await db.Server.findOne({ $or: orArr });
  if (finded == null) {
    throw new CustomError(404, "server not found");
  }
  return finded;
};

const UpdateServer = async (id, body) => {
  delete body.created;
  delete body.id;
  delete body.rootPrivateServerId;
  delete body.serverId;
  delete body.accessCode;
  delete body.rootPrivateServerId;
  delete body.ownerId;
  delete body.rootPlaceId;
  delete body.thirdparty;

  const orArr = [
    { serverId: id },
    { rootPrivateServerId: id },
    { ownerId: id },
  ];

  const response = await db.Server.findOneAndUpdate({ $or: orArr }, body);

  if (response == null) {
    throw new CustomError(404, "server not found");
  }

  return response;
};

const ServerService = {
  CreateServer,
  GetServer,
  UpdateServer
};

export default ServerService;
