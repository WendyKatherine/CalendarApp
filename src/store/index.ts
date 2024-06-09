import { defineStore } from 'pinia';

interface Reminder {
  id: number;
  date: Date;
  text: string;
  city: string;
  color: string;
}

interface State {
  reminders: Reminder[];
}

export const useCalendarStore = defineStore('calendar', {
  state: (): State => ({
    reminders: []
  }),
  actions: {
    addReminder(reminder: Reminder) {
      this.reminders.push(reminder);
    },
    editReminder(updatedReminder: Reminder) {
      const index = this.reminders.findIndex(
        (r) => r.id === updatedReminder.id
      );
      if (index !== -1) {
        this.reminders.splice(index, 1, updatedReminder);
      }
    },
    deleteReminder(id: number) {
      this.reminders = this.reminders.filter((reminder) => reminder.id !== id);
    }
  }
});
