export function formatDate(date, daysOffset = 0) {
  const d = new Date(date);
  d.setDate(d.getDate() + daysOffset);

  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
}

export function formatWorkersWagesList(wages, jobsList) {
  const formattedWages = wages.map((wage) => {
    const jobForId = (id) => {
      const foundJob = jobsList.find((job) => job.id === id);
      return foundJob ? foundJob.location : '-';
    };

    const calcDayTotal = () => {
      const dayTotal = Number.parseFloat(wage.hours, 10) * Number.parseFloat(wage.wage, 10);
      return Number.parseFloat(dayTotal).toFixed(2);
    };

    return {
      workDate: new Date(wage.workDate).toLocaleDateString(),
      primary: jobForId(wage.idJob),
      hours: wage.hours,
      wage: wage.wage,
      dayTotal: calcDayTotal(),
      details: wage.details,
      idWage: wage.idWage,
    };
  });
  formattedWages.sort((a, b) => new Date(b.workDate) - new Date(a.workDate));
  return formattedWages;
}

export function formatJobsWagesList(jobs, workersList) {
  const formattedJobs = jobs.map((wage) => {
    const workerForId = (id) => {
      const foundWorker = workersList.find((worker) => worker.id === id);
      return foundWorker ? foundWorker.name : '-';
    };

    const calcDayTotal = () => {
      const dayTotal = Number.parseFloat(wage.hours, 10) * Number.parseFloat(wage.wage, 10);
      return Number.parseFloat(dayTotal).toFixed(2);
    };

    return {
      workDate: new Date(wage.workDate).toLocaleDateString(),
      primary: workerForId(wage.idWorker),
      hours: wage.hours,
      wage: wage.wage,
      dayTotal: calcDayTotal(),
      details: wage.details,
      idWage: Number(wage.idWage),
    };
  });
  formattedJobs.sort((a, b) => new Date(b.workDate) - new Date(a.workDate));
  return formattedJobs;
}

