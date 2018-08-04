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
    async set(name, wage) {
      return api.post(`${config.API_SET_WORKER}`, {
        name,
        wage,
      });
    },
    delete(id) {
      return api.post(`${config.API_DELETE_WORKER}`, {
        id,
      });
    },
    update(id, name, wage) {
      return api.post(`${config.API_UPDATE_WORKER}`, {
        id, name, wage,
      });
    },
  },
  jobs: {
    async get() {
      const { data } = await api.get(config.API_GET_JOBS);
      return data.jobs;
    },
    set(data) {
      return api.post(`${config.API_SET_JOB}`, {
        location: data.name,
        income: String(data.expectedIncome),
        startDate: data.startDate,
        endDate: data.endDate,
      });
    },
    delete(id) {
      return api.post(`${config.API_DELETE_JOB}`, {
        id,
      });
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
    delete(id) {
      return api.post(`${config.API_DELETE_WAGES}`, {
        id,
      });
    },
  },
  salaryReport: {
    async get(startDate, endDate, jobId) {
      const { data } = await api.get(
        `${
          config.API_GET_SALARY_REPORT
        }?startDate=${startDate}&endDate=${endDate}&jobId=${jobId}`,
      );
      return data.results;
    },
  },
};
