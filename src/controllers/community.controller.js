import CustomError from "../helpers/customError.js";
import CommunityService from "../services/community.service.js";

const GetUpload = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await CommunityService.GetUpload({ id: id });
    return res.status(200).json({
      success: true,
      status: 200,
      response: result,
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

const GetUserUploads = async (req, res, next) => {
  try {
    const { page = 1, limit = 25, offset = 0 } = req.query;
    const { userId } = req.params;
    const uploads = await CommunityService.GetUserUploads({
      userId,
      page,
      limit,
      offset,
    });
    return res.status(200).json({
      success: true,
      status: 200,
      response: uploads,
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

const GetUploadsByType = async (req, res, next) => {
  try {
    let { page = 1, limit = 25, offset = 0, sort = 1, q } = req.query;
    page = Number(page)
    sort = Number(sort)
    limit = Number(limit)
    const { type } = req.params;
    const uploads = await CommunityService.GetUploadsByType({
      type,
      page,
      limit,
      offset,
      sort,
      q
    });
    return res.status(200).json({
      success: true,
      status: 200,
      response: uploads,
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

const GetUploadsByName = async (req, res, next) => {
  try {
    const { q, t, page = 1, limit = 25, offset = 0 } = req.query;
    const uploads = await CommunityService.GetUploadsByName({
      q,
      t,
      page,
      limit,
      offset,
    });
    return res.status(200).json({
      success: true,
      status: 200,
      response: uploads,
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

const CreateUpload = async (req, res, next) => {
  try {
    const body = req.body;
    const created = await CommunityService.CreateUpload(body);
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
const UpdateUpload = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updated = await CommunityService.UpdateUpload(id, body);
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

const AddPlaytimeUpload = async (req, res, next) => {
  try {
    const { id, add } = req.params;
    const updated = await CommunityService.AddPlaytimeUpload(id, add);
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

const DeleteUpload = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await CommunityService.DeleteUpload(id);
    return res.status(200).json({
      success: true,
      status: 200,
      response: deleted,
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

const BulkGetUploads = async (req, res, next) => {
  try {
    const { ids, serverOwner } = req.query;
    const results = await CommunityService.BulkGetUploads(ids, serverOwner);
    return res.status(200).json({
      success: true,
      status: 200,
      response: results,
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

const CommunityController = {
  CreateUpload,

  GetUpload,
  GetUserUploads,
  GetUploadsByType,
  GetUploadsByName,
  BulkGetUploads,

  UpdateUpload,
  AddPlaytimeUpload,

  DeleteUpload,
};

export default CommunityController;
