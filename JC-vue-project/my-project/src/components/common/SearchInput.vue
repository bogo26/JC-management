<template>
    <div clas="row">
        <div class="col-lg-12">
            <div class="input-group">
                <input type="search" class="form-control" :placeholder="placeHolder"
                    v-model="searchText">
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

