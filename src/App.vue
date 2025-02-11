<script setup lang="ts">
import PatientSampler from './components/PatientSampler.vue'
import VisitsSampler from './components/VisitsSampler.vue'
</script>

<template>
  <main class="split">
    <div class="container split-inside">
      <PatientSampler />
    </div>
    <div class="container split-inside">
      <VisitsSampler />
    </div>
  </main>
</template>

<style scoped>
@media only screen and (min-width: 700px) {
  .split {
    display: flex;
  }

  .split-inside {
    margin: 1rem;
  }
}
</style>
