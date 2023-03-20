<template>
    <div class="message__date">
      {{ getDate }}
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    message: Object,
  },
  methods: {
    getMonth(month: number):string {
    switch (month) {
        case 0: return "Січня"
        case 1: return "Лютого"
        case 2: return "Березня"
        case 3: return "Квітня"
        case 4: return "Травня"
        case 5: return "Червня"
        case 6: return "Липня"
        case 7: return "Серпня"
        case 8: return "Вересня"
        case 9: return "Жовтня"
        case 10: return "Листопада"
        case 11: return "Грудня"
      }
      return ""
    },
  },
    computed: {
    getDate():string {
      let date = new Date(Date.parse(this.message.sent_at));
      return `${date.getDate()}  ${this.getMonth(date.getMonth())}`
    }
  },
  
});
</script>

<style>
.message__date {
  margin: -10px auto;
  padding: 8px 24px;
  cursor: default;
  border: 2px solid #eeff25;
  color: #929224;
  background-color: #fbff8580;
  border-radius: 16px;
  width: fit-content;
}
</style>
