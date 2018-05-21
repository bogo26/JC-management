<template>
  <div class="home">
    <div class="sidebar">
      <SearchInput placeHolder="Search a worker"
        @onFilterChange="updateFilters"/>
      <SearchList v-bind:items="workers" v-bind:searchFilter="searchFilter"
        @onSelectItem="selectWorker"/>
    </div>
    <div class="content">
      <WorkersForm v-bind:selectedWorker="selectedWorker" v-bind:jobs="jobs"/>
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/common/SearchInput.vue';
import SearchList from '@/components/SearchList.vue';
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
    SearchList,
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
      console.log('slected worker>> ', worker);
      this.selectedWorker = worker;
    },
  },
};
</script>

<style>
.content {
  padding-left: 330px;
}
</style>

