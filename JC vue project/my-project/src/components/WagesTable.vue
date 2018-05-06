<template>
  <table class="table table-sm table-hover">
    <thead class="thead-dark">
      <tr>
        <th style="width: 100px">Date</th>
        <th style="width: 400px">Site</th>
        <th style="width: 100px">Hours</th>
        <th style="width: 100px">Wage</th>
        <th style="width: 100px">Day Total</th>
        <th >Details</th>
      </tr>
    </thead>
    <tbody>
      <TableRow v-for="wageEntry in wagesList" :key="wageEntry.idWage" v-bind:wage="wageEntry"/>
    </tbody>
  </table>
</template>

<script>
import TableRow from '../components/common/TableRow.vue';

export default {
  name: 'wages-table',
  components: {
    TableRow,
  },
  props: {
    wagesList: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style>

</style>
