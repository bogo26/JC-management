<template>
  <div class="home">
    <div class="sidebar">
      <SearchInput class="search-input" placeHolder="Search a job"
        @onFilterChange="updateFilters"/>

      <SearchList v-bind:items="jobs" v-bind:searchFilter="searchFilter"
        @onSelectItem="selectJob"/>

      <b-button class="add-button"
        @click="showAddModal">
        Add Job
      </b-button>
    </div>

    <div class="content">
      <JobsForm v-bind:selectedJob="selectedJob" v-bind:workers="workers"/>
    </div>

    <!-- Modal de add Job -->
    <b-modal
      ref="addJobMoadlRef"
      centered
      title="Add a new Job"
      @ok="handleSubmitAdd">
    <div class="d-block text-center">
      <!-- Job name -->
      <div class="form-group col-12">
        <label for="entryDetails">Name</label>
        <input v-model="addJobModel.name" type="text" class="form-control" id="entryDetails">
      </div>

      <!-- Satrating date -->
      <div class="form-group col-12">
        <label for="addJobStartDate">Start Date:</label>
        <input v-model="addJobModel.startDate" type="date" class="form-control" id="addJobStartDate">
      </div>

      <!-- Ending date -->
      <div class="form-group col-12">
        <label for="jobEndDate">End Date:</label>
        <input v-model="addJobModel.endDate" type="date" class="form-control" id="jobEndDate">
      </div>

      <!-- Expected income -->
      <div class="form-group col-12">
          <label for="entryWage">Expected income</label>
          <Money v-model="addJobModel.expectedIncome" v-bind="money" id="entryWage"/>
      </div>

    </div>
    </b-modal>
  </div>
</template>

<script>
import SearchInput from '@/components/common/SearchInput.vue';
import SearchList from '@/components/SearchList.vue';
import JobsForm from '@/components/JobsForm.vue';

import { Money } from 'v-money';

import { formatDate } from '../utils/formaters';
import { getMoneyConfig } from '../utils/formaters.js';
import api from '../services/dataService';

export default {
  data() {
    return {
      workers: [],
      jobs: [],
      loading: true,
      searchFilter: '',
      selectedJob: {},
      addJobModel: {
        name: '',
        expectedIncome: 0,
        startDate: formatDate(new Date()),
        endDate: formatDate(new Date()),
      },
      money: getMoneyConfig(),
    };
  },
  name: 'jobs',
  components: {
    SearchInput,
    SearchList,
    JobsForm,
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
    selectJob(job) {
      this.selectedJob = job;
      this.selectedJob.income = Number(job.income);
    },
    showAddModal() {
      this.$refs.addJobMoadlRef.show();
    },
    hideAddModal() {
      this.$refs.addJobMoadlRef.hide();
    },
    handleSubmitAdd(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (
        !!this.addJobModel.name &&
        !!this.addJobModel.expectedIncome &&
        !!this.addJobModel.startDate &&
        !!this.addJobModel.endDate
      ) {
        api.jobs.set(this.addJobModel).then(()=> {
          this.loadJobs();
          this.hideAddModal();
        }).
        catch(error => {
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
