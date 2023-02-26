<template>
  <div id="app">
   <MainView />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MainView from '@/views/MainView.vue'

export default Vue.extend ({
  name: "app",
  components: { 
    MainView 
},

created() {
  this.$store.dispatch('getStarted')
},  
});
</script>
 
<style>
#app {
  font-family: 'Work Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #14340e;
  display: flex;
  text-overflow: ellipsis;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
}

.el-input__inner {
  height: 32px;
}

body {
  margin: 0;
  
}
</style>
