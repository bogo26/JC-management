<template>
  <div v-if="selectedJob.id">
    <div class="row">
      <span class="form-header">{{ selectedJob.id }} - {{ selectedJob.location }} </span>
    </div>
    <div class="row">
      <span class="form-sub-header">Expected income: £{{ selectedJob.income }} </span>
    </div>

    <!-- generate filters -->
    <div class="row">
      <div class="row col-12 section">
        <div class="form-group col-3">
          <label for="jobStartDate">Start Date:</label>
          <input v-model="startDate" type="date" class="form-control" id="jobStartDate">
        </div>
        <div class="form-group col-3">
          <label for="jobEndDate">End Date:</label>
          <input v-model="endDate" type="date" class="form-control" id="jobEndDate">
        </div>
        <div class="col-3">
          <label >Select worker</label>
          <ModelSelect v-model="selectedWorker" :options="selectFormatedWorkersList">
          </ModelSelect>
        </div>
        <div class="col-2 generate-btn">
          <b-button @click="onGenerateList" variant="success">Generate list</b-button>
        </div>
      </div>
    </div>

    <!-- Insert entry -->
    <div class="row section">
      <InsertEntry v-if="showInsertEntry"
        @onInsertEntry="onInsertEntry"
        v-bind:selectList="selectFormatedWorkersList"
        v-bind:wage="0"
        v-bind:isWorker="false"/>
      <b-button v-else
        @click="onShowInsertEntry"
        variant="success">
        Insert Entry
      </b-button>
    </div>

  </div>
</template>

<script>
import InsertEntry from '@/components/InsertEntry.vue';
import WagesTable from '@/components/WagesTable.vue';
import { ModelSelect } from 'vue-search-select'

import api from '../services/dataService';
import { formatDate, formatWagesList } from '../utils/formaters';

export default {
  data() {
    return {
      startDate: formatDate(new Date(), -14),
      endDate: formatDate(new Date()),
      selectedWorker: null,
      showInsertEntry: false,
      wagesList: [],
    };
  },
  name: 'jobs-form',
  components: {
    InsertEntry,
    WagesTable,
    ModelSelect,
  },
  props: {
    selectedJob: {
      required: false,
      type: Object,
    },
    workers: {
      required: true,
      type: Array,
    },
  },
  methods: {
    clearFilters() {
      this.startDate = formatDate(new Date(), -14);
      this.endDate = formatDate(new Date());
      this.selectedWorker = null;
      this.showInsertEntry = false;
    },
    onGenerateList() {
      this.loadWages(
        this.selectedWorker.id,
        this.selectedJob,
        this.startDate,
        this.endDate,
      );
    },
    onShowInsertEntry() {
      this.showInsertEntry = true;
    },
    async loadWages(workerId, jobId, startDate, endDate) {
      this.loadingWages = true;
      const response = await api.wages.get(workerId, jobId, startDate, endDate);
      this.wagesList = formatWagesList(response, this.jobs);
      this.loadingWages = false;
    },
    onInsertEntry() {
      return null;
    },
  },
  computed: {
    selectFormatedWorkersList () {
      return this.workers.map(worker => {
        return {
          value: worker.id,
          text: worker.name,
        }
      })
    }
  }
};
</script>

<style>

</style>

