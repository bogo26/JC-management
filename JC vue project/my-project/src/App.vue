<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Workers</router-link> |
      <router-link to="/jobs">Jobs</router-link>
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
</style>
