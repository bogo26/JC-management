<template>
  <div>
      <div class="row col-12">
        <!-- Raport Start Date -->
        <div class="form-group col-3">
          <label for="raportStartDate">Start Date:</label>
          <input v-model="raportStartDate" type="date" class="form-control" id="raportStartDate">
        </div>

        <!-- Raport End Date -->
        <div class="form-group col-3">
          <label for="raportEndDate">End Date:</label>
          <input v-model="raportEndDate" type="date" class="form-control" id="raportEndDate">
        </div>

        <!-- Select site -->
        <div class="col-3">
          <label>Select job</label>
          <ModelSelect v-model="raportSelectedJob" :options="raportJobsList">
          </ModelSelect>
        </div>

        <!-- Generate raport -->
        <div class="col-2">
          <b-button class="raport-generate-btn" @click="generateRaport" variant="success">Generate Raport</b-button>
        </div>
      </div>

      <b-table small striped hover :items="items"></b-table>
  </div>
</template>

<script>
import { ModelSelect } from 'vue-search-select';

import { formatDate } from '../utils/formaters';
import api from '../services/dataService';

export default {
  data() {
    return {
      raportStartDate: formatDate(new Date(), -14),
      raportEndDate: formatDate(new Date()),
      items: [],
      raportSelectedJob: '',
      raportJobsList: [],
    };
  },
  name: 'wages',
  components: {
    ModelSelect,
  },
  created() {
    this.loadJobs();
  },
  methods: {
    async generateRaport() {
      this.items = await api.salaryReport.get(
        this.raportStartDate,
        this.raportEndDate,
        this.raportSelectedJob,
      );
    },
    async loadJobs() {
      let jobs = await api.jobs.get();
      this.raportJobsList = jobs.map((job) => {
        return {
          value: job.id,
          text: job.location,
        };
      });
      this.raportJobsList = [{value: '0', text: 'All sites'}].concat(this.raportJobsList);
    },
  },
};
</script>

<style >
.raport-generate-btn {
  margin-top: 32px;
}
</style>
