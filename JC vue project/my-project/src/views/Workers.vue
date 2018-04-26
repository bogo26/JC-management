<template>
  <div class="home">
    <div class="sidebar-sticky">
      <SearchInput placeHolder="Search a worker"/>
      <WorkersList v-bind:workers="workers"/>
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
    };
  },
  name: 'home',
  components: {
    SearchInput,
    WorkersList,
  },
  created() {
    console.log('created');
    this.loadWorkers();
  },
  methods: {
    async loadWorkers() {
      this.loading = true;
      this.workers = await api.workers.get();
      console.log('workers set', this.workers);
      this.loading = false;
    },
  },
};
</script>

<style>
.sidebar-sticky {
  width: 300px;
}
</style>

