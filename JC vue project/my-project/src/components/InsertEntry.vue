<template>
    <div>
      <div class="row col-12">
        <div class="form-group col-2">
          <label for="entrytDate">Date:</label>
          <input v-model="entryDate" type="date" class="form-control" id="entrytDate">
        </div>

        <div v-if="isWorker">
          <!-- Select site -->
          <div class="col-3">
            <label>Select site</label>
            <b-form-select v-model="entrySelectedFromList">
              <option v-for="job in selectList" :value="job.id" :key="job.id">
                {{ job.location }}
              </option>
            </b-form-select>
          </div>
        </div>

        <div v-else>
          <!-- Select worker -->
          <div class="col-3">
            <label>Select worker</label>
            <b-form-select v-model="entrySelectedFromList">
              <option v-for="worker in selectList" :value="worker.id" :key="worker.id">
                {{ worker.location }}
              </option>
            </b-form-select>
          </div>
        </div>

        <!-- Hours -->
        <div class="form-group col-1">
          <label for="entryHours">Hours:</label>
          <input v-model="entryHours" type="number" class="form-control" id="entryHours">
        </div>

        <!-- Wage -->
        <div class="form-group col-1">
          <label for="entryWage">Wage:</label>
          <Money v-model="entryWage" v-bind="money" id="entryWage"/>
        </div>

        <!-- Details -->
        <div class="form-group col-2">
          <label for="entryDetails">Details:</label>
          <input v-model="entryDetails" type="text" class="form-control" id="entryDetails">
        </div>

        <!-- Insert button -->
        <div class="col-2 insert-btn">
          <b-button @click="onInsertEntry" variant="success">Insert Entry</b-button>
        </div>
      </div>
    </div>
</template>

<script>
import { Money } from 'v-money';
// import * as formaters from '@/utils/formaters.js';
import { formatDate } from '../utils/formaters';

export default {
  data() {
    return {
      entryDate: formatDate(new Date()),
      entrySelectedFromList: '',
      entryHours: 8,
      entryWage: this.wage,
      entryDetails: '',
      money: {
        decimal: '.',
        thousands: ',',
        prefix: '£',
        suffix: '',
        precision: 2,
        masked: false,
      },
    };
  },
  name: 'insert-entry',
  components: {
    Money,
  },
  props: {
    selectList: {
      required: true,
      type: Array,
    },
    wage: {
      required: true,
      type: Number,
    },
  },
  methods: {
    onInsertEntry() {
      this.$emit(
        'onInsertEntry',
        this.entryDate,
        this.entrySelectedFromList,
        this.entryHours,
        this.wage,
        this.entryDetails,
      );
    },
  },
};
</script>

<style scoped>
#entryHours {
  width: 100%;
}
#entryWage {
  width: 70px;
}
.insert-btn {
  padding-top: 30px;
}
</style>
