<template>
  <div v-if="selectedJob.id">
    <div class="row">
      <span class="job-header">{{ selectedJob.id }} - {{ selectedJob.location }} </span>
    </div>
    <div class="row">
      <span class="job-wage">Hourly wage: £{{ selectedJob.income }} </span>
    </div>
  </div>
</template>

<script>
import api from '../services/dataService';
import { formatDate, formatWagesList } from '../utils/formaters';

export default {
  data() {
    return {
      startDate: formatDate(new Date(), -14),
      endDate: formatDate(new Date()),
      selectedWorker: null,
      showInsertEntry: false,
      wagesList: [],
    };
  },
  name: 'jobs-form',
  props: {
    selectedJob: {
      required: false,
      type: Object,
    },
    workers: {
      required: true,
      type: Array,
    },
  },
  methods: {
    clearFilters() {
      this.startDate = formatDate(new Date(), -14);
      this.endDate = formatDate(new Date());
      this.selectedWorker = null;
      this.showInsertEntry = false;
    },
    onGenerateList() {
      this.loadWages(
        this.selectedWorker.id,
        this.selectedJob,
        this.startDate,
        this.endDate,
      );
    },
    onShowInsertEntry() {
      this.showInsertEntry = true;
    },
    async loadWages(workerId, jobId, startDate, endDate) {
      this.loadingWages = true;
      const response = await api.wages.get(workerId, jobId, startDate, endDate);
      this.wagesList = formatWagesList(response, this.jobs);
      this.loadingWages = false;
    },
  },
};
</script>

<style>
</style>

