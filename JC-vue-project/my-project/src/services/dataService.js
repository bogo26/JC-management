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
      let wId;
      let jId;
      if (!workerId) {
        wId = '';
      } else {
        wId = workerId;
      }

      if (!jobId) {
        jId = '';
      } else {
        jId = jobId;
      }

      if (window.jcApp.isDev) {
        let response;
        if (jId) {
          response = await api.get(
            `${config.API_GET_WAGES}?idJob=${jId}`,
          );
        } else {
          response = await api.get(
            `${config.API_GET_WAGES}?idWorker=${wId}`,
          );
        }
        return response.data;
      }
      const { data } = await api.get(
        `${
          config.API_GET_WAGES
        }?idWorker=${wId}&idJob=${jId}&startDate=${startDate}&endDate=${endDate}`,
      );
      return data.wages;
    },
    set(workerId, jobId, date, wage, hours, details) {
      return api.post(`${config.API_SET_WAGES}`, {
        idJob: jobId,
        idWorker: workerId,
        workDate: date,
        wage,
        hours,
        details,
      });
    },
  },
};
