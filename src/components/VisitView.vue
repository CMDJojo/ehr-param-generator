<script setup lang="ts">
import { Visit } from '@/ts/visit'

defineProps<{ visit: Visit }>()
</script>

<template>
  Reason for visit: <strong>{{ visit.cause }}</strong>
  <br />
  <br />
  <details>
    <summary>
      Handled by <strong>{{ visit.staff.name }}</strong
      >, the {{ visit.staff.age }} year old {{ visit.staff.occupation }} on the clinic.
    </summary>
    {{ visit.staff.description }}
  </details>
</template>

<style scoped></style>
