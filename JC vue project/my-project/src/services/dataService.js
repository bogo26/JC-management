import axios from 'axios';
import * as constants from '../utils/constants';

const api = axios.create({
  baseURL: '/api',
});

export default {
  workers: {
    async get() {
      const { data } = await api.get(constants.API_GET_USERS);
      return data.users;
    },
  },
  jobs: {
    async get() {
      const {
        jobs,
      } = await api.get(constants.API_GET_JOBS);
      return jobs;
    },
  },
};
