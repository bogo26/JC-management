<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Workers</router-link> |
      <router-link to="/jobs">Jobs</router-link> |
      <router-link to="/wages">Wages</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
// set work env
window.jcApp = {
  isDev: true,
};
export default {};
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 15px 15px 15px 330px;
  border-bottom: 2px solid rgb(180, 180, 180);
  a {
    font-size: 22px;
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.content {
  padding-left: 330px;
}
.sidebar {
  width: 330px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}
.form-header {
  padding: 30px 0px 8px 36px;
  font-size: 24px;
  font-weight: bold;
}
.form-sub-header {
  padding-left: 36px;
  font-size: 16px;
}
.section {
  padding-top: 40px;
  padding-left: 18px;
}
.generate-btn {
  padding-top: 30px;
}
div.row {
  margin: 0px;
}
.insert-entry {
  padding-top: 40px;
  padding-left: 18px;
}
.wages-table {
  padding-top: 40px;
  padding-left: 18px;
  padding-right: 18px;
}

.search-input{
  padding-top: 15px;
  padding-bottom: 12px;
}

.add-button{
  width: 100%;
  height: 50px;
}
</style>
