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

export function formatWagesList(wages, jobsList) {
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
      site: jobForId(wage.idJob),
      hours: wage.hours,
      wage: wage.wage,
      dayTotal: calcDayTotal(),
      details: wage.details,
    };
  });
  return formattedWages;
}

