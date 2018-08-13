<template>
  <div>
    <div class="row col-12">
      <div class="col-2">
      </div>

      <!-- Select job -->
      <div class="col-3">
        <label>Select job:</label>
        <ModelSelect v-model="raportJob" :options="raportJobsList">
        </ModelSelect>
      </div>

      <!-- Select date -->
      <div class="form-group col-2">
        <label for="entrytDate">Date:</label>
        <input v-model="raportDate" type="date" class="form-control" id="entrytDate">
      </div>

      <!-- Generate rapot button -->
      <div class="col-2 generate-btn">
        <b-button @click="onGenerateDayRaport" variant="success">Generate raport</b-button>
      </div>
    </div>

    <!-- raport list -->
    <div class="day-raport-list">
      <div class="row">
        <div class="col-1">
        </div>

        <!-- worker name -->
        <div class="col-3">
          <h3>Worker name</h3>
        </div>

        <!-- worker wage -->
        <div class="col-1">
          <h3>Wage</h3>
        </div>

        <!-- worker hours -->
        <div class="col-1">
          <h3>Hours</h3>          
        </div>

        <!-- worker details -->
        <div class="col-3">
          <h3>Details</h3>
        </div>
      </div>
      <div class="row" v-for="item in raportList" v-bind:key="item.idWorker">
        <!-- is submitted -->
        <div class="col-1">
          {{ item.isSubmitted }}
        </div>

        <!-- worker name -->
        <div class="col-3">
          {{ item.idWorker }}
        </div>

        <!-- worker wage -->
        <div class="col-1">
          <Money 
            class="money-input"
            v-model="item.wage" 
            v-bind="money"
            disabled="itme.isSubmitted"/>
        </div>

        <!-- worker hours -->
        <div class="col-1">
          <input 
            v-model="item.hours"
            type="number"
            class="form-control"
            disabled="itme.isSubmitted">
        </div>

        <!-- worker details -->
        <div class="col-3">
          <input 
            v-model="item.details"
            type="text"
            class="form-control"
            disabled="itme.isSubmitted">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ModelSelect } from 'vue-search-select';
import { Money } from 'v-money';

import { formatDate, getMoneyConfig } from '../utils/formaters';
import api from '../services/dataService';

export default {
  data() {
    return {
      raportJob: '',
      raportDate: formatDate(new Date()),
      raportJobsList: [],
      workers: [],
      raportList: [],
      money: getMoneyConfig(),
    }
  },
  name: 'dailyRaport',
  components: {
    ModelSelect,
    Money,
  },
  created() {
    this.loadJobs();
    this.loadWorkers();
  },
  methods: {
    async onGenerateDayRaport() {
      let enteredWages = [];
      try {
        enteredWages = await api.wages.getDaily(
          this.raportJob,
          this.raportDate,
        );
      } catch (err) {
        alert('Something went worng fetching wages ', err);
      }

      this.workers.forEach(worker => {
        let enteredWageForWorker = enteredWages.find(wage => wage.idWorker === worker.id);
        if (enteredWageForWorker) {
          enteredWageForWorker.isSubmitted = true;
          this.raportList.push(enteredWageForWorker);
        } else {
          this.raportList.push({
            isSubmitted: false,
            idWorker: worker.id,
            wage: worker.wage,
            details: '',
            hours: 8,
          })
        }
      });

    },
    async loadWorkers() {
      this.workers = await api.workers.get();
    },
    async loadJobs() {
      let jobs = await api.jobs.get();
      this.raportJobsList = jobs.map((job) => {
        return {
          value: job.id,
          text: job.location,
        };
      });
    },
  },
  computed: {
    activeWorkersOnSite() {
      return this.workers.filter(worker => worker.currentJobId === this.raportJob)
    }
  }
}
</script>

<style>
  .generate-btn {
    padding-top: 30px;
  }
  .money-input {
    width: 100px;
  }
</style>
