import { executeRequest } from "../utils";

export const getReportsNetworkRequest = (id, token) => {
  return executeRequest({
    method: "GET",
    url: `api/data/getReports/${id}`,
    tokens:{ access_token: token }
  });
};