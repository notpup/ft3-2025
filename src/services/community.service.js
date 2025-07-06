import CustomError from "../helpers/customError.js";
import db from "../models/index.js";

const GetUpload = async ({ id }) => {
  const result = await db.Upload.findById(id);
  if (result == null) {
    throw new CustomError(404, "Not found", {
      message: id + " not found in our db",
    });
  }
  return result;
};

const GetUserUploads = async ({ userId, page, limit, offset }) => {
  if (userId == null) {
    throw new CustomError(400, "'userId' is required", {
      message: "userId is required in params...",
    });
  }

  console.log(userId);
  const results = await db.Upload.paginate(
    {
      uploadedBy: Number(userId),
    },
    {
      page,
      limit,
      sort: { created: -1 },
    }
  );
  return results;
};

const GetUploadsByType = async ({ type, page, limit, offset }) => {
  const results = await db.Upload.paginate(
    {
      uploadType: type,
    },
    {
      page,
      limit,
      sort: { playTime: -1 },
    }
  );
  return results;
};

const CommunityService = {
  GetUpload,
  GetUserUploads,
  GetUploadsByType,
};

export default CommunityService;
