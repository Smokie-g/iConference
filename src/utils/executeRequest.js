import { host } from '../constants';

export const executeRequest = async ({ method, url, body, tokens }) => {
  let status;
  let result;
  let headers = {};
  if (body) {
    headers['Content-Type'] = body.contentType;
  }

  if (tokens) {
    headers['Authorization'] = 'Bearer' + ' ' + tokens.access_token;
  }

  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${host}/${url}`, {
      method,
      headers,
      body: body ? body.content : undefined
    })
      .then(res => {
        if (res.status === 200) {
          status = res.status;
          return res.json();
        }
      })
      .catch(e => console.log(e));

    switch (status) {
      case 200:
        resolve(response);
        break;
      default:
        reject(response);
        break;
    }
  });
};