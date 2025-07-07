import ServerService from "../services/server.service.js";

const CreateServer = async (req, res) => {
  try {
    const created = await ServerService.CreateServer(req.body);
    return res.status(201).json({
      success: true,
      status: 201,
      response: created,
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
};

const GetServer = async (req, res) => {
  try {
    const { id } = req.params
    const finded = await ServerService.GetServer(id)
    return res.status(200).json({
      success: true,
      status: 200,
      response: finded,
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
};

const UpdateServer = async (req, res) => {
  try {
    const { id } = req.params
    const updated = await ServerService.UpdateServer(id, req.body)
    return res.status(200).json({
      success: true,
      status: 200,
      response: updated,
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
};

const ServerController = {
  CreateServer,
  GetServer,
  UpdateServer,
};

export default ServerController;
