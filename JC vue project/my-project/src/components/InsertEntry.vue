<template>
    <div>
      <div class="row col-12 search-inputs">
        <div class="form-group col-3">
          <label for="entrytDate">Date:</label>
          <input v-model="entryDate" type="date" class="form-control" id="entrytDate">
        </div>
        <div class="form-group col-3">
          <label for="entryHours">Hours:</label>
          <input v-model="entryHours" type="number" class="form-control" id="entryHours">
        </div>
        <div class="form-group col-2">
          <label for="entryHours">Wage:</label>
          <Money v-model="wage" v-bind="money" id="entryHours"/>
        </div>
        <div class="col-2 insert-btn">
          <b-button variant="success">Insert Entry</b-button>
        </div>
      </div>
    </div>
</template>

<script>
import { Money } from 'v-money';
// import * as formaters from '@/utils/formaters.js';
import formatDate from '../utils/formaters';

export default {
  data() {
    return {
      entryDate: formatDate(new Date()),
      entryHours: 8,
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
    wage: {
      required: true,
      type: Number,
    },
  },
};
</script>

<style scoped>
#entryHours {
  width: 100%;
}
.insert-btn {
  padding-top: 30px;
}
</style>
