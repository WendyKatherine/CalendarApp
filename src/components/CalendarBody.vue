<template>
  <div class="calendar-body">
    <div v-for="week in weeks" :key="week.id" class="week">
      <div v-for="day in week.days" :key="day.date" class="day">
        {{ day.date }}
        <div
          v-for="reminder in getReminders(day)"
          :key="reminder.id"
          :style="{ backgroundColor: reminder.color }"
        >
          {{ reminder.text }} ({{ reminder.city }})
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { Day, Week } from '../types/CalendarTypes';
import { useCalendarStore } from '../store';

export default defineComponent({
  name: 'CalendarBody',
  props: {
    days: {
      type: Array as PropType<Day[]>,
      required: true
    }
  },
  setup(props) {
    const store = useCalendarStore();

    const weeks = computed<Week[]>(() => {
      const weeks: Week[] = [];
      let week: Day[] = [];

      props.days.forEach((day, index) => {
        week.push(day);
        if ((index + 1) % 7 === 0) {
          weeks.push({ id: index / 7, days: week });
          week = [];
        }
      });

      if (week.length > 0) {
        weeks.push({ id: Math.floor(props.days.length / 7), days: week });
      }

      return weeks;
    });

    const getReminders = (day: Day) => {
      return store.reminders.filter((reminder) => {
        const reminderDate = new Date(reminder.date);
        return (
          reminderDate.getDate() === day.date &&
          reminderDate.getMonth() === new Date().getMonth() && // Ajusta esto según tu lógica de mes actual
          reminderDate.getFullYear() === new Date().getFullYear() // Ajusta esto según tu lógica de año actual
        );
      });
    };

    return {
      weeks,
      getReminders
    };
  }
});
</script>

<style scoped>
.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.week {
  display: contents;
}

.day {
  text-align: center;
  height: 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #082f49;
  border-radius: 5px;
  border-left: 8px solid #38abf8;
  margin: 2px;
  color: white;
  font-weight: 200;
  font-size: 1.5rem;
}

.day div {
  margin-top: 5px;
  padding: 2px 5px;
  border-radius: 3px;
  color: white;
  font-size: 0.4em;
}
</style>
