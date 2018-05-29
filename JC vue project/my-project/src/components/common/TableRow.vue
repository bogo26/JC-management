<template>
  <tr >
        <td>{{ wage.workDate }}</td>
        <td>{{ wage.primary }}</td>
        <td>{{ wage.hours }}</td>
        <td>{{ wage.wage }}</td>
        <td>{{ wage.dayTotal }}</td>
        <td>{{ wage.details }}</td>
  </tr>
</template>

<script>
export default {
  name: 'table-row',
  props: {
    wage: {
      required: true,
      type: Object,
    },
  },
};
</script>
<style>

</style>
