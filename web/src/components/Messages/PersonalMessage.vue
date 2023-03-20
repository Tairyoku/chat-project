<template>
    <div class="message__personal">
      <div class="personal__data" :style="isBottomRightRadiusEnable()">
        <div class="personal__text">
          {{ message.text }}
        </div>
        <div class="personal__time">
          {{ getTime() }}
        </div>
      </div>
      <div class="personal__tail" v-if="tail">
        <div class="personal__clean"></div>
        <div class="personal__lasts"></div>
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
  methods: {
    isBottomRightRadiusEnable() {
      if (this.tail) return "border-bottom-right-radius: 0; ";
    },
    getTime() {
      let date = new Date( Date.parse(this.message.sent_at) )
      return date
        .toTimeString()
        .replace(/:[0-9]{2,2} .*/, "")
    },
  },
});
</script>

<style>
.message__personal {
  margin: 16px;
  width: 45%;
  margin-left: auto;
  cursor: default;
}
.personal__data {
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #aeeb4d7a;;
}
.personal__text {
  text-align: justify;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  font-size: 18px;
  width: 80%;
}
.personal__time {
  text-align: right;
  font-size: 12px;
}
.personal__tail {
  width: 100%;
  height: 16px;
  display: flex;
  background-color: #aeeb4d7a;
}
.personal__clean {
  width: 100%;
  background-color: #f2e8c2;
  border-top-right-radius: 16px;
}
.personal__lasts {
  width: 0%;
}
</style>
