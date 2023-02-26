<template>
    <div class="user-message">
      <div class="user-message__data" :style="isRightRadius()">
<div class="user-message__text">
  {{ message.body }}
</div>        
<div class="user-message__time">
{{ getTime() }}
</div>      
</div>
      <div class="user-message__tail" v-if="tail">
        <div class="user-message__clean"></div>
        <div class="user-message__lasts"></div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    message: Object,
    tail: Boolean,
  },
  data() {
    return {
      userId: 1,
    };
  },
  components: {},
  computed: {
// userId() {
//   return store.getters['USER_ID']
// }
  },
  methods: {
    // isRightRadius() {
    //   if (this.tail) return "border-bottom-right-radius: 0; ";
    // },
    // getTime() {
    // return this.message.sentAt.toTimeString().replace(/:[0-9]{2,2} .*/, '').replace(/ .*/, '')
    //  }
  },
});
</script>

<style>

.user-message {
  margin: 16px;
  width: 45%;
  margin-left: auto;
}
.user-message__data {
  padding: 8px 16px;
  border-radius: 8px;
  background-color: rgb(66, 168, 241);
}
.user-message__text {
  text-align: justify;
}
.user-message__name {
  text-align: left;
  font-size: 12px;
}
.user-message__time {
  text-align: right;
  font-size: 12px;
}
.user-message__tail {
  width: 100%;
  height: 16px;
  display: flex;
  background-color: rgb(66, 168, 241);
}
.user-message__clean {
  width: 100%;
  background-color: white;
  border-top-right-radius: 16px;
}
.user-message__lasts {
  width: 0%;
}
</style>
