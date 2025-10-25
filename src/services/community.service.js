import mongoose from "mongoose";
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

const GetUploadsByType = async ({ q, page, limit, sort }) => {
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

const GetUploadsByType2 = async ({ q = "", page, limit, sort, type, sortby }) => {
  const results = await db.Upload.aggregate([
    {
      $match: {
        uploadType: type,
        active: true,
        public: true,
        name: { $regex: q, $options: "i" },
      },
    },
    {
      $lookup: {
        from: "servers",
        localField: "_id",
        foreignField: "workshop",
        as: "usedInServers",
      },
    },
    {
      $addFields: {
        serverCount: { $size: "$usedInServers" },
      },
    },
    {
      $project: {
        [sortby]: 0,
      },
    },
    {
      $sort: { serverCount: Number(sort) },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
  ]);
  //console.log(results);
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
      name: { $regex: q, $options: "i" },
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

const CreateUpload = async ({
  uploadedBy,
  assetId,
  version,
  imageId,
  name,
  parts,
  unions,
  uploadType,
}) => {
  if (uploadedBy == null) {
    throw new CustomError(400, "'uploadedBy' is required", {
      message: "uploadedBy is required to create upload",
    });
  }
  if (assetId == null) {
    throw new CustomError(400, "'assetId' is required", {
      message: "assetId is required to create upload",
    });
  }
  if (version == null) {
    throw new CustomError(400, "'version' is required", {
      message: "version is required to create upload",
    });
  }
  if (imageId == null) {
    throw new CustomError(400, "'imageId' is required", {
      message: "imageId is required to create upload",
    });
  }
  if (name == null) {
    throw new CustomError(400, "'name' is required", {
      message: "name is required to create upload",
    });
  }
  if (parts == null) {
    throw new CustomError(400, "'parts' is required", {
      message: "parts is required to create upload",
    });
  }
  if (unions == null) {
    throw new CustomError(400, "'unions' is required", {
      message: "unions is required to create upload",
    });
  }
  if (uploadType == null) {
    throw new CustomError(400, "'uploadType' is required", {
      message: "uploadType is required to create upload",
    });
  }
  // fua amigo tanta repeticion al pepe, debo arreglar esto mas tarde

  const dt = Date.now();

  const data = await db.Upload.create({
    uploadedBy,
    assetId,
    version,
    imageId,
    name,
    parts,
    unions,
    created: dt,
    lastUpdated: dt,
    uploadType,
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

const UpdateUpload = async (id, body) => {
  const { imageId, version, name, parts, unions, isactive, ispublic } = body;
  const updated = await db.Upload.findByIdAndUpdate(id, {
    imageId,
    version,
    name,
    parts,
    unions,
    active: isactive,
    public: ispublic,
    lastUpdated: Date.now(),
  });

  return updated;
};

const AddPlaytimeUpload = async (id, add) => {
  const toAdd = Number(add);
  if (toAdd == NaN) {
    throw new CustomError(400, "Second url param must be a number");
  }

  const updated = await db.Upload.findByIdAndUpdate(id, {
    $inc: { playTime: toAdd },
  });
  return updated;
};

const DeleteUpload = async (id) => {
  const deleted = await db.Upload.findByIdAndDelete(id);
  if (deleted == null) {
    throw new CustomError(404, "Upload not found");
  }
  return deleted;
};

const BulkGetUploads = async (ids, serverOwner) => {
  if (!ids) {
    throw new CustomError(400, "'ids' param is required");
  }
  if (!serverOwner) {
    throw new CustomError(400, "'serverOwner' param is required");
  }
  const arrayIds = ids.split(",").map((id) => id.trim());
  const validIds = arrayIds.filter((id) => mongoose.Types.ObjectId.isValid(id));
  if (validIds.length === 0) {
    throw new CustomError(400, "no valid ids");
  }
  const query = {
    _id: { $in: validIds },
    active: true,
    $or: [{ public: true }, { uploadedBy: Number(serverOwner) }],
  };
  const finded = await db.Upload.find(query);
  return finded;
};

const CommunityService = {
  CreateUpload,

  GetUpload,
  GetUserUploads,
  GetUploadsByType: GetUploadsByType2,
  GetUploadsByName,
  BulkGetUploads,

  UpdateUpload,
  AddPlaytimeUpload,

  DeleteUpload,
};

export default CommunityService;
