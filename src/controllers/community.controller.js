import CustomError from "../helpers/customError.js";
import CommunityService from "../services/community.service.js";

const test = (req, res, next) => {
  try {
    return res.status(200).json({
      message: "lo hiciste bien...",
      status: 200,
    });
  } catch (err) {
    return res.status(500).json({
      message: "lo hiciste mal, nose como pero lo lograste hacer mal...",
      status: 500,
    });
  }
};

const GetUpload = async (req, res, next) => {
  try {
    const { q } = req.query
    const result = await CommunityService.GetUpload({ id: q })
    return res.status(200).json({
      success: true,
      status: 200,
      response: result
    });
  } catch (err) {
    console.log(err)
    const statusCode = err.statusCode||500
    return res.status(statusCode).json(err.details || {
      success: false,
      status: statusCode
    })
  }
};

const GetUserUploads = async (req, res, next) => {
  try {
    const { page = 1, limit = 25, offset = 0 } = req.query
    const { userId } = req.params
    const uploads = await CommunityService.GetUserUploads({ userId, page, limit, offset })
    return res.status(200).json({
      success: true,
      status: 200,
      response: uploads
    })
  } catch (err) {
    console.log(err)
    const statusCode = err.statusCode||500
    return res.status(statusCode).json(err.details || {
      success: false,
      status: statusCode
    })
  }
}

const GetUploadsByType = async (req, res, next) => {
try {
    const { page = 1, limit = 25, offset = 0 } = req.query
    const { type } = req.params
    const uploads = await CommunityService.GetUploadsByType({ type, page, limit, offset })
    return res.status(200).json({
      success: true,
      status: 200,
      response: uploads
    })
  } catch (err) {
    console.log(err)
    const statusCode = err.statusCode||500
    return res.status(statusCode).json(err.details || {
      success: false,
      status: statusCode
    })
  }
}

const CreateUpload = (req, res, next) => {};

const CommunityController = {
  GetUpload,
  GetUserUploads,
  GetUploadsByType,
  CreateUpload,
  test,
};

export default CommunityController;
