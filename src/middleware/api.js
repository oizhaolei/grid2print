// middleware： 简化fetch处理， 并且加上token
function callApi(endpoint, init, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  init.headers = new Headers(headers);

  return fetch(endpoint, init)
    .then(res => res.json().then((json) => {
      if (!res.ok) {
        throw new Error(`error:${res.code}`);
      } else if (!json.success) {
        throw json.msg;
      }

      return json;
    }));
}

export const CALL_API = Symbol('Call API');

export default store => next => (action) => {
  const callAPI = action[CALL_API];

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const {
    endpoint, init = {}, types,
  } = callAPI;
  const token = localStorage.getItem('g_xgh_encrypt2');

  const [requestType, successType, errorType] = types;
  next({ type: requestType });

  return callApi(endpoint, init, token).then(
    res => next({
      res,
      type: successType,
    }),
    error => next({
      error: error.message || error || 'There was an error.',
      type: errorType,
    }),
  ).catch(e => next({
    error: `错误:${e}`,
    type: errorType,
  }));
};
