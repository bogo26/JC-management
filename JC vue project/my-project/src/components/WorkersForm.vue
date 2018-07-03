<template>
  <div v-if="selectedWorker.id">
    <div class="row">
      <span class="form-header">{{ selectedWorker.id }} - {{ selectedWorker.name }} </span>
    </div>
    <div class="row">
      <span class="form-sub-header">Hourly wage: £{{ selectedWorker.wage }} </span>
    </div>

    <!-- generate filters -->
    <div class="row">
      <div class="row col-12 section">
        <div class="form-group col-3">
          <label for="workerStartDate">Start Date:</label>
          <input v-model="startDate" type="date" class="form-control" id="workerStartDate">
        </div>
        <div class="form-group col-3">
          <label for="workerEndDate">End Date:</label>
          <input v-model="endDate" type="date" class="form-control" id="workerEndDate">
        </div>
        <div class="col-3">
          <label for="workerJob">Select site</label>
          <b-form-select v-model="selectedJob">
            <option v-for="job in jobs" :value="job.id" :key="job.id">
              {{ job.location }}
            </option>
          </b-form-select>
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
        v-bind:selectList="selectFormatedJobsList"
        v-bind:wage="parseFloat(selectedWorker.wage)"
        v-bind:isWorker="true"/>
      <b-button v-else
        @click="onShowInsertEntry"
        variant="success">
        Insert Entry
      </b-button>
    </div>

    <!-- table history -->
    <div class="row wages-table">
      <WagesTable v-bind:wagesList="wagesList" v-bind:isWorkerForm="true"/>
    </div>
  </div>
</template>

<script>
import InsertEntry from '@/components/InsertEntry.vue';
import WagesTable from '@/components/WagesTable.vue';
import api from '../services/dataService';
import { formatDate, formatWorkersWagesList } from '../utils/formaters';

export default {
  data() {
    return {
      startDate: formatDate(new Date(), -14),
      endDate: formatDate(new Date()),
      selectedJob: null,
      showInsertEntry: false,
      wagesList: [],
    };
  },
  name: 'workers-form',
  components: {
    InsertEntry,
    WagesTable,
  },
  props: {
    selectedWorker: {
      required: false,
      type: Object,
    },
    jobs: {
      required: true,
      type: Array,
    },
  },
  watch: {
    // eslint-disable-next-line
    selectedWorker: function() {
      this.loadWages(
        this.selectedWorker.id,
        this.selectedJob,
        this.startDate,
        this.endDate,
      );
      this.clearFilters();
    },
  },
  methods: {
    clearFilters() {
      this.startDate = formatDate(new Date(), -14);
      this.endDate = formatDate(new Date());
      this.selectedJob = null;
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
      this.wagesList = formatWorkersWagesList(response, this.jobs);
      this.loadingWages = false;
    },
    onInsertEntry(date, jobId, hours, wage, details) {
      this.loadingWages = true;
      api.wages
        .set(
          this.selectedWorker.id,
          jobId,
          date,
          wage,
          hours,
          details,
        )
        .then(() => {
          this.loadingWages = false;
        })
        .catch((error) => {
          // eslint-disable-next-line
          window.alert('Falied to add entry', error);
          this.loadingWages = false;
        });
    },
  },
  computed: {
    selectFormatedJobsList() {
      return this.jobs.map(job => {
        return {
          value: job.id,
          text: job.location,
        }
      })
    },
  },
};
</script>

<style scoped>
div.row {
  margin: 0px;
}
.insert-entry {
  padding-top: 40px;
  padding-left: 18px;
}
.wages-table {
  padding-top: 40px;
  padding-left: 18px;
  padding-right: 18px;
}
</style>
