<template>
  <div v-if="selectedWorker.id">
    <div class="row">
      <span class="form-header">{{ selectedWorker.id }} - {{ selectedWorker.name }} </span>
      </div>
    <div class="row">
      <span class="form-sub-header">Hourly wage: £{{ selectedWorker.wage }} - {{ selectedWorkerCurrentJob }} </span>
    </div>
    <div class="row mt-3">
      <b-button class="edit-btn" @click="showEditModal" variant="success">Edit</b-button>
      <b-button class="ml-2" @click="handleDeleteWorker" variant="danger">X</b-button>
      <b-button class="ml-2" @click="showUpdateWageModal" variant="success">Update wage</b-button>
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

    <div class="row section">
      Total wage selected: {{totalSum}}
    </div> 

    <!-- table history -->
    <div class="row wages-table">
      <WagesTable v-bind:wagesList="wagesList" v-bind:isWorkerForm="true"/>
    </div>

    <!-- Modal - edit worker -->
    <b-modal
      ref="editWorkerModalRef"
      centered
      title="Edit worker"
      @ok="handleSubmitEditWorker"
      @hidden="hideEditModal">
    <div class="d-block text-center">
      <!-- Worker name -->
      <div class="form-group col-12">
        <label for="editWorkerName">Name</label>
        <input v-model="selectedWorker.name" type="text" class="form-control" id="editWorkerName">
      </div>

      <!-- Worker current job -->
      <div class="form-group col-12">
        <label>Select current site</label>
        <ModelSelect v-model="selectedWorker.currentJobId" :options="editWorkerJobsList">
        </ModelSelect>
      </div>

      <!-- Worker wage -->
      <div class="form-group col-12">
          <label for="editWorkerWage">Wage</label>
          <Money v-model="selectedWorker.wage" v-bind="money" id="editWorkerWage"/>
      </div>

    </div>
    </b-modal>

    <!-- Modal - update wage -->
    <b-modal
      ref="updateWageModalRef"
      centered
      title="Edit worker"
      @ok="handleSubmitUpdateWage">
    <div class="d-block text-center">
      <!-- Starting date -->
      <div class="form-group col-12">
        <label for="updateWageStartingDate">Starting date</label>
        <input v-model="updateWageModal.date" type="date" class="form-control" id="updateWageStartingDate">
      </div>

      <!-- Wage update -->
      <div class="form-group col-12">
          <label for="updateWageWage">Wage</label>
          <Money v-model="updateWageModal.wage" v-bind="money" id="updateWageWage"/>
      </div>

    </div>
    </b-modal>
  </div>
</template>

<script>
import InsertEntry from '@/components/InsertEntry.vue';
import WagesTable from '@/components/WagesTable.vue';
import { Money } from 'v-money';
import { ModelSelect } from 'vue-search-select';

import api from '../services/dataService';
import {
  formatDate,
  formatWorkersWagesList,
  getMoneyConfig,
} from '../utils/formaters';

export default {
  data() {
    return {
      startDate: formatDate(new Date(), -14),
      endDate: formatDate(new Date()),
      selectedJob: null,
      showInsertEntry: false,
      wagesList: [],
      totalSum: 0,
      editWorkerModel: {
        name: this.selectedWorker.name,
        wage: this.selectedWorker.wage,
      },
      money: getMoneyConfig(),
      initialWorker: {},
      updateWageModal: {
        date: formatDate(new Date()),
        wage: 0,
      },
    };
  },
  name: 'workers-form',
  components: {
    InsertEntry,
    WagesTable,
    Money,
    ModelSelect,
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
      let sum = 0;
      this.loadingWages = true;
      const response = await api.wages.get(workerId, jobId, startDate, endDate);
      this.wagesList = formatWorkersWagesList(response, this.jobs);
      this.wagesList.forEach((wage) => (sum += Number(wage.dayTotal)));
      this.totalSum = Number(sum).toFixed(2);
      this.loadingWages = false;
    },
    onInsertEntry(date, jobId, hours, wage, details) {
      this.loadingWages = true;
      api.wages
        .set(this.selectedWorker.id, jobId, date, wage, hours, details)
        .then(() => {
          this.onGenerateList();
          this.loadingWages = false;
        })
        .catch((error) => {
          // eslint-disable-next-line
          window.alert('Falied to add entry', error);
          this.loadingWages = false;
        });
    },
    // edit worker methods
    showEditModal() {
      this.initialWorker = {
        name: this.selectedWorker.name,
        wage: this.selectedWorker.wage,
        currentJobId: this.selectedWorker.currentJobId,
      };
      this.$refs.editWorkerModalRef.show();
    },
    hideEditModal() {
      // revert changes if the update was not submitted
      this.selectedWorker.name = this.initialWorker.name;
      this.selectedWorker.wage = this.initialWorker.wage;
      this.selectedWorker.currentJobId = this.initialWorker.currentJobId;
      this.$refs.editWorkerModalRef.hide();
    },
    async handleSubmitEditWorker(evt) {
      evt.preventDefault();

      if (!!this.selectedWorker.name && !!this.selectedWorker.wage) {
        try {
          await api.workers.update(
            this.selectedWorker.id,
            this.selectedWorker.name,
            this.selectedWorker.wage,
            this.selectedWorker.currentJobId,
          );
          // confirm changes after submit
          this.initialWorker.name = this.selectedWorker.name;
          this.initialWorker.wage = this.selectedWorker.wage;
          this.initialWorker.currentJobId = this.selectedWorker.currentJobId;
        } catch (err) {
          alert('Update failed', err);
          return;
        }
        this.hideEditModal();
      } else {
        alert('Missing data');
      }
    },
    async handleDeleteWorker() {
      var r = confirm('Are you sure you want to delete this worker?');
      if (r === true) {
        try {
          await api.workers.delete(this.selectedWorker.id);
        } catch (err) {
          alert('Delete failed', err);
          return;
        }
        location.reload();
      }
    },
    // Update wage methods
    showUpdateWageModal() {
      this.$refs.updateWageModalRef.show();
    },
    hideUpdateWageModal() {
      this.$refs.updateWageModalRef.hide();
    },
    async handleSubmitUpdateWage(evt) {
      evt.preventDefault();

      if (!!this.updateWageModal.date && !!this.updateWageModal.wage) {
        try {
          await api.workers.updateWage(
            this.selectedWorker.id, this.updateWageModal.date, this.updateWageModal.wage
          )
          this.onGenerateList();
        } catch (err) {
          alert('Update failed', err);
          return;
        }
        this.hideUpdateWageModal();
      } else {
        alert('Missing data');
      }
      
    },
  },
  computed: {
    selectFormatedJobsList() {
      return this.jobs.map((job) => {
        return {
          value: job.id,
          text: job.location,
        };
      });
    },
    editWorkerJobsList() {
      let list = this.jobs.map((job) => {
        return {
          value: job.id,
          text: job.location,
        };
      });
      list.unshift({value: '0', text: 'Not active'});
      return list;
    },
    selectedWorkerCurrentJob() {
      let matchedJob = this.jobs.find((job) => job.id === this.selectedWorker.currentJobId)
      return matchedJob && matchedJob.location || 'No current job';
    }
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
