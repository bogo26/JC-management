<template>
    <div>
      <div class="row col-12">
        <div class="form-group col-2">
          <label for="entrytDate">Date:</label>
          <input v-model="entryDate" type="date" class="form-control" id="entrytDate">
        </div>

        <!-- Select site -->
        <div class="col-3">
          <label>Select {{workerOrJob}}</label>
          <ModelSelect v-model="entrySelectedFromList" :options="selectList">
          </ModelSelect>
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
import { ModelSelect } from 'vue-search-select';
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
    ModelSelect,
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
    isWorker: {
      required: true,
      type: Boolean,
    },
  },
  methods: {
    onInsertEntry() {
      this.$emit(
        'onInsertEntry',
        this.entryDate,
        this.entrySelectedFromList,
        this.entryHours,
        this.entryWage,
        this.entryDetails,
      );
    },
  },
  watch: {
    entrySelectedFromList() {
      let wage;
      if (!this.isWorker) {
        wage = this.selectList.find((worker) => worker.value === this.entrySelectedFromList)
        if (wage) {
          this.entryWage = wage.wage;
        }
      }
    },
  },
  computed: {
    workerOrJob() {
      return this.isWorker ? 'job' : 'worker';
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
