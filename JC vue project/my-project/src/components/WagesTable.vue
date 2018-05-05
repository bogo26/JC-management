<template>
  <table class="table table-sm table-hover">
    <thead class="thead-dark">
      <tr>
        <th scope="col-2">Date</th>
        <th scope="col-3">Site</th>
        <th scope="col-1">Hours</th>
        <th scope="col-1">Wage</th>
        <th scope="col-1">Day Total</th>
        <th scope="col-4">Details</th>
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
