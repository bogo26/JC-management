<template>
  <ul class="list-group scrollable">
    <li v-bind:class="{ active: item.isActive }" class="list-group-item"
      @click="selectItem(item)"
      v-for="item in filteredItems" :key="item.id">
      {{ item.name || item.location }}
    </li>
  </ul>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'search-list',
  props: {
    items: {
      required: true,
      type: Array,
    },
    searchFilter: {
      required: true,
      type: String,
    },
  },
  computed: {
    filteredItems() {
      debugger; // eslint-disable-line
      if (this.searchFilter) {
        return this.items.filter(
          (item) =>
            (item.location || item.name).toLowerCase().indexOf(this.searchFilter.toLowerCase()) >
            -1,
        );
      }
      return this.items;
    },
  },
  methods: {
    selectItem(item) {
      debugger; // eslint-disable-line
      if (!item.isActive) {
        this.items.forEach((el) => {
          /* eslint-disable no-param-reassign */
          Vue.set(el, 'isActive', false);
        });
        Vue.set(item, 'isActive', true);
        this.$emit('onSelectItem', item);
      }
    },
  },
};
</script>

<style scoped>
.scrollable {
  height: calc(100% - 117px);
  overflow: overlay;
}
</style>

