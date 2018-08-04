<template>
  <div class="home">
    <div class="sidebar">
      <SearchInput class="search-input" placeHolder="Search a worker"
        @onFilterChange="updateFilters"/>
      <SearchList v-bind:items="workers" v-bind:searchFilter="searchFilter"
        @onSelectItem="selectWorker"/>
      <b-button 
        @click="showAddModal"
        class="add-button">
        Add Worker
      </b-button>
    </div>
    <div class="content">
      <WorkersForm v-bind:selectedWorker="selectedWorker" v-bind:jobs="jobs"/>
    </div>

    <!-- Modal - add worker -->
    <b-modal
      ref="addWorkerMoadlRef"
      centered
      title="Add a new Worker"
      @ok="handleSubmitAddWorker">
    <div class="d-block text-center">
      <!-- Worker name -->
      <div class="form-group col-12">
        <label for="addWorkerName">Name</label>
        <input v-model="addWorkerModel.name" type="text" class="form-control" id="addWorkerName">
      </div>

      <!-- Worker wage -->
      <div class="form-group col-12">
          <label for="addWorkerWage">Wage</label>
          <Money v-model="addWorkerModel.wage" v-bind="money" id="addWorkerWage"/>
      </div>

    </div>
    </b-modal>
  </div>
</template>

<script>
import SearchInput from '@/components/common/SearchInput.vue';
import SearchList from '@/components/SearchList.vue';
import WorkersForm from '@/components/WorkersForm.vue';

import { Money } from 'v-money';

import api from '../services/dataService';
import { getMoneyConfig } from '../utils/formaters.js';
export default {
  data() {
    return {
      workers: [],
      jobs: [],
      loading: true,
      searchFilter: '',
      selectedWorker: {},
      addWorkerModel: {
        name: '',
        wage: 0,
      },
      money: getMoneyConfig(),
    };
  },
  name: 'workers',
  components: {
    SearchInput,
    SearchList,
    WorkersForm,
    Money,
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
    showAddModal() {
      this.$refs.addWorkerMoadlRef.show();
    },
    hideAddModal() {
      this.$refs.addWorkerMoadlRef.hide();
    },
    handleSubmitAddWorker(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!!this.addWorkerModel.name && !!this.addWorkerModel.wage) {
        api.workers
          .set(this.addWorkerModel.name, this.addWorkerModel.wage)
          .then(() => {
            this.loadWorkers();
            this.hideAddModal();
          })
          .catch((error) => {
            // eslint-disable-next-line
            window.alert('Falied to add job', error);
          });
      } else {
        alert('Missing info');
      }
    },
  },
};
</script>
