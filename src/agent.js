import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "http://localhost:3001/api";
// const API_ROOT = "https://village-green-backend-api.herokuapp.com/api";

const responseBody = (res) => res.body;

let token = null;

const tokenPlugin = (req) => {
  if (token) {
    req.set("authorization", `Token ${token}`);
  }
};

const Address = {
  get: (query) =>
    superagent
      .get(`https://api.ideal-postcodes.co.uk/v1/postcodes/ID11QD`)
      .query({
        api_key: "ak_k9foifvbjpGu6cmc1wObmNz2MOi3w"
      })
      .then((res) => res.body.result)
};

const requests = {
  del: (url) =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
};

const Profile = {
  get: (username) => requests.get(`/profiles/${username}`),
};

const Notices = {
  create: (notice) => requests.post(`/notices/`, { notice }),
  all: (coords) => requests.get(`/notices?limit=50&coords=${coords}`),
  byAuthor: (author) =>
    requests.get(`/notices?author=${encodeURIComponent(author)}&limit=10`),
  pinned: (author) =>
    requests.get(`/notices?pinned=${encodeURIComponent(author)}&limit=10`),
  get: (slug) => requests.get(`/notices/${slug}`),
  del: (slug) => requests.del(`/notices/${slug}`),
  edit: (slug, notice) => requests.put(`/notices/${slug}`, { notice }),
  childNotices: (slug) => requests.get(`/notices/${slug}/children`),
};

const Pinned = {
  pinNotice: (slug) => requests.post(`/notices/${slug}/pin`),
  unPinNotice: (slug) => requests.del(`/notices/${slug}/pin`),
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/notices/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/notices/${slug}/comments/${commentId}`),
  forNotice: (slug) => requests.get(`/notices/${slug}/comments`),
};

const Auth = {
  current: () => requests.get("/user"),
  login: (email, password) =>
    requests.post("/users/login", { user: { email, password } }),
  register: (username, email, password, address = null, image) =>
    requests.post("/users", {
      user: { username, email, password, address, image },
    }),
  save: (user) => requests.put("/user", { user }),
};

export default {
  Notices,
  Auth,
  Comments,
  Address,
  Profile,
  Pinned,
  setToken: (_token) => {
    token = _token;
  },
};
