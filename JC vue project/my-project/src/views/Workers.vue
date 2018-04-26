<template>
  <div class="home">
    <div class="sidebar-sticky">
      <SearchInput placeHolder="Search a worker"/>
      <WorkersList v-bind:workers="workers"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchInput from "@/components/common/SearchInput.vue";
import WorkersList from "@/components/WorkersList.vue";

export default {
  data() {
    return {
      workers: [
        { id: 1, name: "boss" },
        { id: 2, name: "boss1" },
        { id: 3, name: "boss2" },
        { id: 4, name: "boss3" }
      ]
    };
  },
  name: "home",
  components: {
    SearchInput,
    WorkersList
  }
};
</script>

<style>
  .sidebar-sticky {
    width: 300px;
  }
</style>

