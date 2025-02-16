<script setup lang="ts">
import { Patient } from '@/ts/patient.ts'
import { ifGender } from '@/ts/types.ts'
import PatientView from '@/components/PatientView.vue'

defineEmits(['newPatient'])
defineProps<{
  patient: Patient
  allowDelete?: boolean
}>()
</script>

<template>
  <article v-if="patient">
    <header>
      {{ patient.name }}
      &ndash;
      <strong>{{ ifGender(patient.gender, 'man', 'woman') }}</strong>
      &ndash;
      <strong>{{ patient.age }}</strong> {{ patient.age == 1 ? 'year old' : 'years old' }}
    </header>
    <PatientView :patient="patient" />
    <footer v-if="allowDelete">
      Not happy?
      <a @click="$emit('newPatient')">Delete this patient and get a new one!</a>
    </footer>
  </article>
  <article v-else>
    No patient generated yet. <button @click="$emit('newPatient')">Generate one!</button>
  </article>
</template>

<style scoped>
a {
  cursor: pointer;
}
</style>
