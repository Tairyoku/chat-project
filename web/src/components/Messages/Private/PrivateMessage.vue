<template>
    <div class="message__private" @click="getTime()">
      <div class="private__data" :style="clearBottomLeftRadius()">
          <div class="private__text">
            {{ message.text }}
          </div>
          <div class="private__time">
            {{ getTime() }}
          </div>
      </div>
      <div class="private__tail" v-if="tail">
        <div class="private__lasts"></div>
        <div class="private__clean"></div>
      </div>
    </div>
</template>

<script lang="ts">
import { IMessage, IUser } from "@/store/models";
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  props: {
    message: Object,
    tail: Boolean,
  },
  data() {
    return {
    };
  },
  watch: {
    message() {
      this.getTime()
    }
  },
  methods: {
    clearBottomLeftRadius() {
      if (this.tail) return "border-bottom-left-radius: 0; border-bottom: 0";
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

<style scoped>
.message__private {
  margin: 16px;
  width: 45%;
}
.private__data {
  display: flex;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid rgb(66, 168, 241);
  box-shadow: 0px 0px 10px rgb(66, 168, 241, 0.3);
  /* width: calc(100% - 48px);
  padding-left: 16px; */
}
.private__text {
  text-align: justify;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  width: 80%;
}
.private__time {
  text-align: right;
  font-size: 12px;
}
.private__tail {
  width: 100%;
  height: 16px;
  display: flex;
}
.private__lasts {
  width: 0%;
  border-left: 1px solid rgb(66, 168, 241);
  box-shadow: 0px 0px 10px rgb(66, 168, 241, 0.3) inset;
}
.private__clean {
  width: 100%;
  background-color: white;
  border-top-left-radius: 16px;
  border-left: 1px solid rgb(66, 168, 241);
  border-top: 1px solid rgb(66, 168, 241);
  margin-right: 8px;
  z-index: -1;
}
</style>
