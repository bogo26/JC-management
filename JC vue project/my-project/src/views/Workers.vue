<template>
  <div class="home">
    <div class="sidebar">
      <SearchInput placeHolder="Search a worker"
        @onFilterChange="updateFilters"/>
      <WorkersList v-bind:workers="workers" v-bind:searchFilter="searchFilter"
        @onSelectWorker="selectWorker"/>
    </div>
    <div class="content">
      <WorkersForm v-bind:selectedWorker="selectedWorker" v-bind:jobs="jobs"/>
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/common/SearchInput.vue';
import WorkersList from '@/components/WorkersList.vue';
import WorkersForm from '@/components/WorkersForm.vue';
import api from '../services/dataService';

export default {
  data() {
    return {
      workers: [],
      jobs: [],
      loading: true,
      searchFilter: '',
      selectedWorker: {},
    };
  },
  name: 'workers',
  components: {
    SearchInput,
    WorkersList,
    WorkersForm,
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
    selectWorker(worker) {
      this.selectedWorker = worker;
    },
  },
};
</script>

<style>
.sidebar {
  width: 330px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}
.content {
  padding-left: 330px;
}
</style>

