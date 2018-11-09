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
    update(id, name, wage, currentJobId) {
      return api.post(`${config.API_UPDATE_WORKER}`, {
        id, name, wage, currentJobId,
      });
    },
    updateWage(idWorker, startDate, wage) {
      return api.post(`${config.API_UPDATE_WAGE_WORKER}`, {
        idWorker, startDate, wage,
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
    update(id, location, income, startDate, endDate) {
      return api.post(`${config.API_UPDATE_JOB}`, {
        id, location, income, startDate, endDate,
      });
    },
  },
  wages: {
    async getDaily(jobId, date) {
      if (window.jcApp.isDev) {
        const { data } = await api.get(
          `${config.API_GET_DAILY}`,
        );
        return data;
      }
      const { data } = await api.get(
        `${config.API_GET_DAILY}?idJob=${jobId}&date=${date}`,
      );

      return data.daily;
    },
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
          config.API_GET_SALARY_RAPORT
        }?startDate=${startDate}&endDate=${endDate}&jobId=${jobId}`,
      );
      return data.results;
    },
  },
};
