import { executeRequest } from "../utils";

export const getConferenceNetworkRequest = (token) => {
  return executeRequest({
    method: "GET",
    url: `api/data/getconferences`,
    tokens: { access_token: token }
  });
};

export const getSectionsNetworkRequest = (Id, token) => {
  return executeRequest({
    method: "GET",
    url: `api/data/getsections/${Id}`,
    tokens: { access_token: token }
  });
};

export const getSubSectionsNetworkRequest = (Id, token) => {
  return executeRequest({
    method: "GET",
    url: `api/data/getsubsections/${Id}`,
    tokens: { access_token: token }
  });
};