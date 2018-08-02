<template>
  <b-modal 
    ref="addModalRef"
    centered
    title="Add"
    @ok="handleOk">
      <div class="d-block text-center">
        
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
    </b-modal>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      wage: 0,
    }
  },
  methods: {
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.name) {
        alert('Please enter your name');
      } else {
        this.handleSubmit();
      }
    },
  }
}
</script>

<style>

</style>
