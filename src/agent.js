import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "http://localhost:3000/api";
// const API_ROOT = "https://village-green-backend-api.herokuapp.com/api";

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
        app_id: "yiHAq4dpgi8IolLODQhZ",
        app_code: "ZoP4eVfs_w8jCGMGu9dw_g",
        query: query,
        maxresults: 1
      })
      .then(res => JSON.parse(res.text).suggestions[0])
};

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody)
};

const Profile = {
  get: username => requests.get(`/profiles/${username}`),
};

const Notices = {
  create: (notice) =>
  requests.post(`/notices/`, { notice }),
  all: (coords) => requests.get(`/notices?limit=7&coords=${coords}`),
  byAuthor: (author) =>
    requests.get(`/notices?author=${encodeURIComponent(author)}&limit=5`),
  favoritedBy: (author) =>
    requests.get(`/notices?favorited=${encodeURIComponent(author)}&limit=5`),
  get: slug => requests.get(`/notices/${slug}`),
  del: slug => requests.del(`/notices/${slug}`)
};

const Pinned = {
  pinNotice: (slug) =>
  requests.post(`/notices/${slug}/pin`),
  unPinNotice: (slug) =>
  requests.del(`/notices/${slug}/pin`)
}

const Comments = {
  create: (slug, comment) =>
    requests.post(`/notices/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/notices/${slug}/comments/${commentId}`),
  forNotice: slug => requests.get(`/notices/${slug}/comments`)
};

const Auth = {
  current: () => requests.get("/user"),
  login: (email, password) =>
    requests.post("/users/login", { user: { email, password } }),
  register: (username, email, password, address = null) =>
    requests.post("/users", { user: { username, email, password, address } }),
  save: user => requests.put("/user", { user })
};

export default {
  Notices,
  Auth,
  Comments,
  Address,
  Profile,
  Pinned,
  setToken: _token => {
    token = _token;
  }
};
