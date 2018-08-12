<template>
  <div>
    <div class="row col-12">
      <div class="col-2">
      </div>

      <!-- Select job -->
      <div class="col-3">
        <label>Select job:</label>
        <ModelSelect v-model="raportJob" :options="jobsList">
        </ModelSelect>
      </div>

      <!-- Select date -->
      <div class="form-group col-2">
        <label for="entrytDate">Date:</label>
        <input v-model="raportDate" type="date" class="form-control" id="entrytDate">
      </div>

      <!-- Generate rapot button -->
      <div class="col-2 generate-btn">
        <b-button @click="onGenerateDayRaport" variant="success">Generate raport</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ModelSelect } from 'vue-search-select';

import { formatDate } from '../utils/formaters';
import api from '../services/dataService';

export default {
  data() {
    return {
      raportJob: '',
      raportDate: formatDate(new Date()),
      jobsList: [],
      workers: [],
      raportList: [],
    }
  },
  name: 'dailyRaport',
  components: {
    ModelSelect,
  },
  created() {
    this.loadJobs();
    this.loadWorkers();
  },
  methods: {
    async onGenerateDayRaport() {
      let enteredWages = await api.wages.get(
        null,
        this.raportJob,
        this.raportDate,
        this.raportDate,
      );
    },
    async loadWorkers() {
      this.workers = await api.workers.get();
    },
    async loadJobs() {
      let jobs = await api.jobs.get();
      this.raportJobsList = jobs.map((job) => {
        return {
          value: job.id,
          text: job.location,
        };
      });
    },
  },
  computed: {
    activeWorkersOnSite() {
      return this.workers.filter(worker => worker.currentJobId === this.raportJob)
    }
  }
}
</script>

<style>
  .generate-btn {
    padding-top: 30px;
  }
</style>
