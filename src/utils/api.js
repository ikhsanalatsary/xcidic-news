import axios from "axios";
import qs from "querystringify";
import { BASE_API_URL } from "./config";

const CancelToken = axios.CancelToken;

function create(baseURL = BASE_API_URL, options = {}) {
  const api = axios.create({
    baseURL,
    headers: {
      "X-Api-Key": process.env.REACT_APP_NEWS_API_KEY
    },
    // 10 second timeout...
    timeout: 10000,
    ...options
  });

  const getTopHeadline = (params, config = {}) => {
    const query = qs.stringify(params);
    const endpoint = "/v2/top-headlines";
    let uri = query ? `${endpoint}?${query}` : endpoint;
    return api.get(uri, config);
  };
  const getEverything = (params, config = {}) => {
    const query = qs.stringify(params);
    const endpoint = "/v2/everything";
    let uri = query ? `${endpoint}?${query}` : endpoint;
    return api.get(uri, config);
  };
  const getArticles = (params, config = {}) => {
    const query = qs.stringify(params);
    const endpoint = "/v1/articles";
    let uri = query ? `${endpoint}?${query}` : endpoint;
    return api.get(uri, config);
  };
  const getSources = (params, config = {}) => {
    const query = qs.stringify(params);
    const endpoint = "/v2/sources";
    let uri = query ? `${endpoint}?${query}` : endpoint;
    return api.get(uri, config);
  };

  return {
    getTopHeadline,
    getEverything,
    getArticles,
    getSources
  };
}

export default {
  create,
  CancelToken
};
