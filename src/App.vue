<script setup lang="ts">
import PatientSampler from './components/PatientSampler.vue'
</script>

<template>
  <main class="split">
    <div class="container split-inside">
      <PatientSampler />
    </div>
    <div class="container split-inside">
      <PatientSampler />
    </div>
  </main>
</template>

<style scoped>
.split {
  display: flex;
}

.split-inside {
  margin: 1rem;
}

header {
  line-height: 1.5;
}
</style>
