<template>
  <div>
    <h2>Información del Clima</h2>
    <div v-if="weather.main">
      <p>Ciudad: {{ city }}</p>
      <p>Temperatura: {{ weather.main.temp }}°C</p>
      <p>Clima: {{ weather.weather[0].description }}</p>
    </div>
    <div v-else>
      <p>No hay información del clima disponible.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WeatherInfo',
  data() {
    return {
      api_key: 'bcc2a052aa10870d5c5af5b65c7d075c',
      url_base: 'http://api.openweathermap.org/data/2.5/',
      city: 'Bogotá', // Asigna una ciudad por defecto o permite al usuario ingresar una ciudad
      weather: {}
    };
  },
  methods: {
    fetchWeather() {
      fetch(
        `${this.url_base}weather?q=${this.city}&units=metric&APPID=${this.api_key}`
      )
        .then((res) => res.json())
        .then(this.setResults)
        .catch((error) => console.error('Error fetching weather data:', error));
    },
    setResults(results: any) {
      this.weather = results;
    }
  },
  mounted() {
    this.fetchWeather(); // Llama al método fetchWeather cuando el componente se monte
  }
});
</script>
