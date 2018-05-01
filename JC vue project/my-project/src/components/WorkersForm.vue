<template>
  <div v-if="selectedWorker.id">
    <div class="row">
      <span class="worker-header">{{ selectedWorker.id }} - {{ selectedWorker.name }} </span>
    </div>
    <div class="row">
      <span class="worker-wage">Hourly wage: £{{ selectedWorker.wage }} </span>
    </div>
    <!-- generate filters -->
    <div class="row">
      <div class="row col-12 search-inputs">
        <div class="form-group col-3">
          <label for="workerStartDate">Start Date:</label>
          <input type="date" class="form-control" id="workerStartDate">
        </div>
        <div class="form-group col-3">
          <label for="workerEndDate">End Date:</label>
          <input type="date" class="form-control" id="workerEndDate">
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
          <b-button variant="success">Generate list</b-button>
        </div>
      </div>
    </div>

    <!-- insert entry -->
    <div class="row insert-entry">
      <InsertEntry v-if="showInsertEntry" v-bind:wage="parseFloat(selectedWorker.wage)"/>
      <b-button v-else @click="onShowInsertEntry" variant="success">Insert Entry</b-button>
    </div>
  </div>
</template>

<script>
import InsertEntry from '@/components/InsertEntry.vue';

export default {
  data() {
    return {
      selectedJob: null,
      showInsertEntry: false,
    };
  },
  name: 'workers-form',
  components: {
    InsertEntry,
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
  methods: {
    onShowInsertEntry() {
      this.showInsertEntry = true;
    },
  },
};
</script>

<style scoped>
.worker-header {
  padding: 30px 0px 8px 36px;
  font-size: 24px;
  font-weight: bold;
}
.worker-wage {
  padding-left: 36px;
  font-size: 16px;
}
.search-inputs {
  padding-top: 40px;
  padding-left: 18px;
}
div.row {
  margin: 0px;
}
.generate-btn {
  padding-top: 30px;
}
.insert-entry {
  padding-top: 40px;
  padding-left: 18px;
}
</style>
