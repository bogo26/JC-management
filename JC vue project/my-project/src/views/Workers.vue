<template>
  <div class="home">
    <div class="sidebar">
      <SearchInput placeHolder="Search a worker"
        @onFilterChange="updateFilters"/>
      <WorkersList v-bind:workers="workers" v-bind:searchFilter="searchFilter"/>
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/common/SearchInput.vue';
import WorkersList from '@/components/WorkersList.vue';
import api from '../services/dataService';

export default {
  data() {
    return {
      workers: [],
      loading: true,
      searchFilter: '',
    };
  },
  name: 'home',
  components: {
    SearchInput,
    WorkersList,
  },
  created() {
    this.loadWorkers();
  },
  methods: {
    async loadWorkers() {
      this.loading = true;
      this.workers = await api.workers.get();
      this.loading = false;
    },
    updateFilters(newFilter) {
      console.log('updateFilter', newFilter);
      this.searchFilter = newFilter;
    },
  },
};
</script>

<style>
.sidebar-sticky {
  width: 300px;
}
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}
</style>

