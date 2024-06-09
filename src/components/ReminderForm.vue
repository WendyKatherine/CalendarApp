<template>
  <div>
    <h2>Añadir Recordatorio</h2>
    <form @submit.prevent="submitForm">
      <div class="form-box">
        <label for="date">Introduce Fecha:</label> <br />
        <input type="datetime-local" v-model="form.date" required />
      </div>
      <div class="form-box">
        <label for="text">Recordatorio:</label><br />
        <input type="text" v-model="form.text" maxlength="30" required />
      </div>
      <div class="form-box">
        <label for="city">Ciudad:</label><br />
        <input type="text" v-model="form.city" required />
      </div>
      <div class="form-box">
        <label for="color">Color:</label><br />
        <input type="color" v-model="form.color" required />
      </div>
      <button type="submit">Guardar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCalendarStore } from '../store';
import { Reminder } from '../types/CalendarTypes';

export default defineComponent({
  name: 'ReminderForm',
  props: {
    reminder: Object as () => Reminder | null
  },
  setup(props) {
    const store = useCalendarStore();
    const form = ref({
      id: props.reminder?.id ?? Date.now(),
      date: props.reminder?.date
        ? new Date(props.reminder.date).toISOString().slice(0, 16)
        : '', // Convertir a cadena
      text: props.reminder?.text ?? '',
      city: props.reminder?.city ?? '',
      color: props.reminder?.color ?? '#000000'
    });

    const submitForm = () => {
      const reminder: Reminder = {
        ...form.value,
        date: new Date(form.value.date)
      };
      if (props.reminder) {
        store.editReminder(reminder);
      } else {
        store.addReminder(reminder);
      }
    };

    return {
      form,
      submitForm
    };
  }
});
</script>

<style>
.form-box {
  width: 50%;
}
</style>
