<template>
    <div clas="row">
        <div class="col-lg-12">
            <div class="input-group">
                <input type="text" class="form-control" :placeholder="placeHolder"
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
    onInputChange() {},
  },
};
</script>
