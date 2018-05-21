<template>
  <div class="home">
    <div class="sidebar">
      <SearchInput placeHolder="Search a job"
        @onFilterChange="updateFilters"/>
      <SearchList v-bind:items="jobs" v-bind:searchFilter="searchFilter"
        @onSelectItem="selectJob"/>
    </div>
    <div class="content">
      <JobsForm v-bind:selectedJob="selectedJob" v-bind:jobs="jobs"/>
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/common/SearchInput.vue';
import SearchList from '@/components/SearchList.vue';
import JobsForm from '@/components/JobsForm.vue';

import api from '../services/dataService';

export default {
  data() {
    return {
      workers: [],
      jobs: [],
      loading: true,
      searchFilter: '',
      selectedJob: {},
    };
  },
  name: 'jobs',
  components: {
    SearchInput,
    SearchList,
    JobsForm,
  },
  created() {
    this.loadWorkers();
    this.loadJobs();
  },
  methods: {
    async loadWorkers() {
      this.loadingWorkers = true;
      this.workers = await api.workers.get();
      this.loadingWorkers = false;
    },
    async loadJobs() {
      this.loadingJobs = true;
      this.jobs = await api.jobs.get();
      this.loadingJobs = false;
    },
    updateFilters(newFilter) {
      this.searchFilter = newFilter;
    },
    selectJob(job) {
      this.selectedJob = job;
    },
  },
};

</script>
