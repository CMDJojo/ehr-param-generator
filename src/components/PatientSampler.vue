<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { Prng } from '@/ts/prng.ts'
import { Patient } from '@/ts/patient.ts'
import { ifGender } from '@/ts/types.ts'
import PatientView from '@/components/PatientView.vue'

const patient: Ref<Patient | undefined> = ref()

function newPatient() {
  const prng = Prng.randomSeed()
  patient.value = new Patient(prng)
}
</script>

<template>
  <h2>Patient</h2>
  <article v-if="patient">
    <header>
      {{ patient.name }}
      &ndash;
      <strong>{{ ifGender(patient.gender, 'man', 'woman') }}</strong>
      &ndash;
      <strong>{{ patient.age }}</strong> {{ patient.age == 1 ? 'year old' : 'years old' }}
    </header>
    <PatientView :patient="patient" />
    <footer>Done? Get a <a @click="newPatient">new one!</a></footer>
  </article>
  <article v-else>
    No patient generated yet. <button @click="newPatient">Generate one!</button>
  </article>
</template>

<style scoped>
a {
  cursor: pointer;
}
</style>
