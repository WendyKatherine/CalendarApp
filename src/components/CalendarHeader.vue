<template>
  <div class="main-title">
    <h1>Calendario</h1>
  </div>
  <div class="calendar-header">
    <button @click="$emit('prevMonth')">Anterior</button>
    <span> Mes {{ currentMonth }} / Año {{ currentYear }}</span>
    <button @click="$emit('nextMonth')">Siguiente</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CalendarHeader',
  props: {
    currentMonth: {
      type: Number,
      required: true
    },
    currentYear: {
      type: Number,
      required: true
    }
  }
});
</script>

<style scoped>
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.main-title {
  text-align: center;
}

h1 {
  margin-bottom: 0rem;
  margin-top: 0rem;
}
</style>
