import axios from 'axios';
import getConfig from '../utils/constants';

const api = axios.create({
  baseURL: '/api',
});

const config = getConfig();

export default {
  workers: {
    async get() {
      const { data } = await api.get(config.API_GET_USERS);
      return data.users;
    },
  },
  jobs: {
    async get() {
      const { data } = await api.get(config.API_GET_JOBS);
      return data.jobs;
    },
  },
  wages: {
    async get(workerId, jobId, startDate, endDate) {
      if (window.jcApp.isDev) {
        const { data } = await api.get(
          `${config.API_GET_WAGES}?idWorker=${workerId}`,
        );
        return data;
      }
      const { data } = await api.get(
        `${
          config.API_GET_WAGES
        }?idWorker=${workerId}&idJob=${jobId}$startDate=${startDate}&endDate=${endDate}`,
      );
      return data.wages;
    },
  },
};
