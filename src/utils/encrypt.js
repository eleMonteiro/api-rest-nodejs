import crypto from "crypto";

export const encrypt = (value) => {
  return crypto.createHash("md5").update(value).digest("hex");
};
