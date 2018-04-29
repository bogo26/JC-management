<template>
    <div clas="row">
        <div class="col-lg-12">
            <div class="input-group">
                <input type="search" class="form-control" :placeholder="placeHolder"
                    v-model="searchText">
                <span class="input-group-btn">
                    <button class="btn btn-default"
                        type="button"
                        v-on:click="onInputChange">
                    GoGo!</button>
                </span>
            </div><!-- /input-group -->
        </div><!-- /.col-lg-12 -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
    };
  },
  name: 'SearchInput',
  props: {
    placeHolder: String,
    searchFunc: Function,
  },
  methods: {
    onInputChange() {
      console.log('scrie');
      this.$emit('onFilterChange', this.searchText);
    },
  },
  watch: {
    searchText(newText) {
      this.$emit('onFilterChange', newText);
    },
  },
};
</script>

<style scoped>
input[type='search']::-webkit-search-cancel-button {
  -webkit-appearance: searchfield-cancel-button;
}
</style>

