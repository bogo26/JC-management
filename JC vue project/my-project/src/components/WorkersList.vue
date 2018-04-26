<template>
  <ul>
    <li v-for="worker in workers" :key="worker.id">
        {{ worker.name }}
    </li> 
  </ul>
</template>

<script>
export default {
  name: "workres-list",
  props: {
    workers: {
      required: true,
      type: Array
    }
  }
};
</script>
