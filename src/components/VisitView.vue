<script setup lang="ts">
import { Visit } from '@/ts/visit'

defineProps<{ visit: Visit }>()
</script>

<template>
  <details>
    <summary>
      Visit handled by <strong>{{ visit.staff.name }}</strong
      >, the {{ visit.staff.age }} year old {{ visit.staff.occupation }} on the clinic.
    </summary>
    {{ visit.staff.description }}
  </details>
  <p>
    Main diagnosis: <br />
    <strong>{{ visit.mainDiagnosis }}</strong>
  </p>
  <p v-if="visit.extraQuestionDiagnoses.length == 0 && visit.chronicDiseaseDiagnoses.length == 0">
    No extra question-diagnoses nor any chronic disease diagnoses
  </p>
  <template v-else>
    <template v-if="visit.extraQuestionDiagnoses.length">
      <strong>Extra questions</strong> led to the following diagnoses:
      <ul>
        <li v-for="diag of visit.extraQuestionDiagnoses" :key="diag">
          <strong>{{ diag }}</strong>
        </li>
      </ul>
    </template>
    <template v-if="visit.chronicDiseaseDiagnoses.length">
      This patient got the following <strong>chronic disease diagnoses:</strong>
      <ul>
        <li v-for="diag of visit.chronicDiseaseDiagnoses" :key="diag">
          <strong>{{ diag }}</strong>
        </li>
      </ul>
    </template>
  </template>
</template>

<style scoped></style>
