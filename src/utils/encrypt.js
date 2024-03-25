var crypto = require("crypto");

const encrypt = (value) => {
  return crypto.createHash("md5").update(value).digest("hex");
};

module.exports = {
  encrypt,
};
