import { executeRequest } from "../utils";

export const getNewsNetworkRequest = (token) => {
  return executeRequest({
    method: "GET",
    url: `api/data/getNews`,
    tokens: {
      access_token: token 
    }
  });
};