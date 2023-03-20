<template>
    <div class="loading">
        <i class="el-icon-loading" :style="getStyleSize" > </i>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    props: {
        size: {
            default: 24,
            type: Number,
        }
    },
    computed: {
        getStyleSize():string {
            return `font-size: ${this.size}px;`
        }
    }
  })
  
  </script>

  <style scoped>
.loading {
    width: inherit;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;

}
  </style>
  