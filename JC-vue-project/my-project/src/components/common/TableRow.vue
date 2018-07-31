<template>
  <tr>
        <td>{{ wage.workDate }}</td>
        <td>{{ wage.primary }}</td>
        <td>{{ wage.hours }}</td>
        <td>{{ wage.wage }}</td>
        <td>{{ wage.dayTotal }}</td>
        <td>{{ wage.details }}</td>
        <td class='delete' @click="deleteEntry(wage.idWage)">x</td>
  </tr>
</template>

<script>
import api from '../../services/dataService';

export default {
  data() {
    return{
      isActive: false,
    }
  },
  name: 'table-row',
  props: {
    wage: {
      required: true,
      type: Object,
    },
  },
  methods: {
    deleteEntry(id) {
      console.log(id);
      var r = confirm('Are you sure you want to delete this entry?');
      if (r === true) {
        api.wages.delete(id);
      } 
    },
  },
};
</script>
<style>
  .delete{
    color: palevioletred;
    font-weight: bold;
    cursor: pointer;
  }
</style>
