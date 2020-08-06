import { executeRequest } from "../utils";

export const getProfileNetworkRequest = (Id, token) => {
  return executeRequest({
    method: "GET",
    url: `api/data/getProfile/${Id}`,
    tokens: { access_token: token }
  });
};