export default function getConfig() {
  if (window.jcApp.isDev) {
    return {
      API_HOME: 'http://localhost:3000',
      API_GET_USERS: '/getusers',
      API_GET_JOBS: '/getjobs',
      API_GET_WAGES: '/wages',
    };
  }
  return {
    API_HOME: 'http://jcdrylining.co.uk',
    API_GET_USERS: '/db.php',
    API_GET_JOBS: '/getJobs.php',
    API_GET_WAGES: '/getWagesForWorkerWithDate.php',
  };
}
