"use strict";

import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "https://village-green-backend-api.herokuapp.com/api";

const responseBody = res => res.body;

const requests = {
  get: url => superagent.get(`${API_ROOT}${url}`).then(responseBody)
};

const Notices = {
  all: page => requests.get(`/notices?limit=10`)
};

export default {
  Notices
};
