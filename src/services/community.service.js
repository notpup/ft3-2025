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

const GetUserUploads = async ({ userId, page, limit }) => {
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

const GetUploadsByType = async ({ q, page, limit }) => {
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

const GetUploadsByName = async ({ q, t, page, limit }) => {
  if (q == null) {
    throw new CustomError(400, "'q' is required", {
      message: "q is required to search uploads...",
    });
  }
  if (t == null) {
    throw new CustomError(400, "'t' is required", {
      message: "'t' is required to search by uploadType",
    });
  }
  const results = await db.Upload.paginate(
    {
      name: { $regex: q, $options: 'i' },
      uploadType: t,
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
  GetUploadsByName
};

export default CommunityService;
