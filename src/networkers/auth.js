import { executeRequest } from "../utils";

export const logInNetworkRequest = async userId => {
  let login = {
    "Id": userId
  };
  return executeRequest({
    method: "POST",
    url: "api/auth/participant",
    body: {
      content: JSON.stringify(login),
      contentType: "application/json"
    }
  });
};