<template>
  <div class="main-content">
    <div class="calendar-view">
      <CalendarHeader
        :currentMonth="currentMonth"
        :currentYear="currentYear"
        @prevMonth="changeMonth(-1)"
        @nextMonth="changeMonth(1)"
      />
      <CalendarBody :days="days" />
    </div>
    <div class="info-wraper">
      <div class="box-container">
        <ReminderForm :reminder="selectedReminder" @saved="fetchDays" />
      </div>
      <div class="box-container">
        <WeatherComponent></WeatherComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import CalendarHeader from '../components/CalendarHeader.vue';
import CalendarBody from '../components/CalendarBody.vue';
import ReminderForm from '../components/ReminderForm.vue';
import WeatherComponent from '../components/WeatherComponent.vue';
import { Day, Reminder } from '../types/CalendarTypes';
import { useCalendarStore } from '../store';

export default defineComponent({
  name: 'CalendarView',
  components: {
    CalendarHeader,
    CalendarBody,
    ReminderForm,
    WeatherComponent
  },
  setup() {
    const store = useCalendarStore();
    const currentMonth = ref(new Date().getMonth() + 1);
    const currentYear = ref(new Date().getFullYear());
    const days = ref<Day[]>([]);
    const selectedReminder = ref<Reminder | null>(null);

    const generateDays = (year: number, month: number): Day[] => {
      const date = new Date(year, month - 1, 1);
      const daysInMonth = new Date(year, month, 0).getDate();
      const firstDayOfWeek = date.getDay();

      const days: Day[] = [];
      for (let i = 0; i < firstDayOfWeek; i++) {
        days.push({ date: 0, isCurrentMonth: false });
      }

      for (let i = 1; i <= daysInMonth; i++) {
        days.push({ date: i, isCurrentMonth: true });
      }

      return days;
    };

    const fetchDays = () => {
      const year = currentYear.value;
      const month = currentMonth.value;
      days.value = generateDays(year, month);
    };

    const changeMonth = (change: number) => {
      currentMonth.value += change;
      if (currentMonth.value > 12) {
        currentMonth.value = 1;
        currentYear.value++;
      } else if (currentMonth.value < 1) {
        currentMonth.value = 12;
        currentYear.value--;
      }
      fetchDays();
    };

    const editReminder = (reminder: Reminder) => {
      selectedReminder.value = reminder;
    };

    onMounted(fetchDays);

    return {
      currentMonth,
      currentYear,
      days,
      changeMonth,
      fetchDays,
      selectedReminder,
      editReminder
    };
  }
});
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  background-color: #202124;
  height: 100vh;

  .calendar-view {
    padding: 2rem;
    width: 60%;
  }

  .info-wraper {
    width: 40%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .box-container {
    background: linear-gradient(130deg, #0278c7, transparent);
    padding: 1rem 2rem;
    margin: 10px;
    border-radius: 1rem;
    box-shadow: 0px 0px 25px 2px #0e0e0e;
  }
}
</style>
