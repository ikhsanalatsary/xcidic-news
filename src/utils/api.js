import axios from 'axios';
import qs from 'querystringify';
import { BASE_API_URL, API_KEY } from './config'

function create (baseUr = BASE_API_URL, options = {}) {
  const api = axios.create({
    baseURL: baseUr,
    headers: {
      'X-Api-Key': API_KEY,
    },
    // 10 second timeout...
    timeout: 10000,
    ...options
  });

  const getTopHeadline = (params, headers = {}) => {
    const query = qs.stringify(params)
    const endpoint = '/v2/top-headlines'
    let uri = query ? `${endpoint}?${query}` : endpoint
    return api.get(uri, null, { headers })
  }
  const getEverything = (params, headers = {}) => {
    const query = qs.stringify(params)
    const endpoint = '/v2/everything'
    let uri = query ? `${endpoint}?${query}` : endpoint
    return api.get(uri, null, { headers })
  }
  const getArticles = (params, headers = {}) => {
    const query = qs.stringify(params)
    const endpoint = '/v1/articles'
    let uri = query ? `${endpoint}?${query}` : endpoint
    return api.get(uri, null, { headers })
  }
  const getSources = (params, headers = {}) => {
    const query = qs.stringify(params)
    const endpoint = '/v2/sources'
    let uri = query ? `${endpoint}?${query}` : endpoint
    return api.get(uri, null, { headers })
  }

  return {
    getTopHeadline,
    getEverything,
    getArticles,
    getSources
  };
}

export default {
  create
};
