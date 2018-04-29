<template>
  <ul class="list-group scrollable">
    <li v-bind:class="{ active: worker.isActive }" class="list-group-item"
      @click="selectWorker(worker)"
      v-for="worker in filteredWorkers" :key="worker.id">
      {{ worker.name }}
    </li>
  </ul>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'workres-list',
  props: {
    workers: {
      required: true,
      type: Array,
    },
    searchFilter: {
      required: true,
      type: String,
    },
  },
  computed: {
    filteredWorkers() {
      if (this.searchFilter) {
        return this.workers.filter(
          (worker) =>
            worker.name.toLowerCase().indexOf(this.searchFilter.toLowerCase()) >
            -1,
        );
      }
      return this.workers;
    },
  },
  methods: {
    selectWorker(worker) {
      this.workers.forEach((el) => {
        /* eslint-disable no-param-reassign */
        Vue.set(el, 'isActive', false);
      });
      Vue.set(worker, 'isActive', !worker.isActive);
      // this.$emit('onFilterChange', this.searchText);
    },
  },
};
</script>

<style scoped>
.scrollable {
  height: 100%;
  overflow: overlay;
}
</style>

