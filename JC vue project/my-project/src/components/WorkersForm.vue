<template>
  <div v-if="selectedWorker">
    <div class="row">
      <span class="worker-header">{{ selectedWorker.id }} - {{ selectedWorker.name }} </span>
    </div>
    <div class="row">
      <span class="worker-wage">Hourly wage: £{{ selectedWorker.wage }} </span>
    </div>
    <div class="row">
      <div class="row search-inputs">
        <div class="form-group col-3">
          <label for="workerStartDate">Start Date:</label>
          <input type="date" class="form-control" id="workerStartDate">
        </div>
        <div class="form-group col-3">
          <label for="workerEndDate">End Date:</label>
          <input type="date" class="form-control" id="workerEndDate">
        </div>
        <div class="col-3">
          <b-dropdown id="ddown1" text="Select site" class="m-md-2">
            <b-dropdown-item v-for="job in jobs" :key="job.id">{{job.location}}</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'workers-form',
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
</style>
