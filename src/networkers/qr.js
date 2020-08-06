import { executeRequest } from "../utils";

export const PresenceCheckNetworkRequest = (value, token) => {
  let check = {
    "code": value
  };
  return executeRequest({
    method: "POST",
    url: "api/auth/qr",
    body: {
      content: JSON.stringify(check),
      contentType: "application/json"
    },
    tokens: { access_token: token }
  });
};