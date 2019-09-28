import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "https://village-green-backend-api.herokuapp.com/api";

const responseBody = res => res.body;

let token = null;

const tokenPlugin = req => {
  if (token) {
    req.set("authorization", `Token ${token}`);
  }
};

const Address = {
  get: query =>
    superagent
      .get(`https://autocomplete.geocoder.api.here.com/6.2/suggest.json`)
      .query({
        app_id: 'yiHAq4dpgi8IolLODQhZ',
        app_code: 'ZoP4eVfs_w8jCGMGu9dw_g',
        query: query,
        maxresults: 1
      })
      .then(res => console.log(JSON.parse(res.text).suggestions[0]))
};

const requests = {
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody)
};

const Notices = {
  all: page => requests.get(`/notices?limit=10`)
};

const Auth = {
  current: () => requests.get("/user"),
  login: (email, password) =>
    requests.post("/users/login", { user: { email, password } }),
  register: (username, email, password, address = null) =>
    requests.post("/users", { user: { username, email, password, address } })
};

export default {
  Notices,
  Auth,
  Address,
  setToken: _token => {
    token = _token;
  }
};
