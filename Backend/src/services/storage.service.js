let ImageKit = require("imagekit");
const ApiError = require("../utils/apiError");

let storageInstance = new ImageKit({
  publicKey: process.env.IK_PUB_KEY,
  privateKey: process.env.IK_PRI_KEY,
  urlEndpoint: process.env.IK_URL,
});

let sendToIK = async (file, fileName) => {
  try {
    let options = {
      file,
      fileName,
      folder:'Instagram'
    };

    return await storageInstance.upload(options);
  } catch (error) {
    console.log("error in upload function", error);
    throw new ApiError(400, error.message);
  }
};

module.exports = sendToIK;