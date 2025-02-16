<script setup lang="ts">
import { Patient } from '@/ts/patient'
import { ifGender } from '@/ts/types'

defineEmits<{
  (e: 'click'): void
}>()

defineProps<{
  patient: Patient
  active: boolean
  items: number
}>()
</script>

<template>
  <article :class="{ 'not-active': !active }">
    {{ patient.name }} &ndash;
    <strong>
      {{ ifGender(patient.gender, 'Man', 'Woman') }}
    </strong>
    &ndash;
    <strong>{{ patient.age }}</strong>
    &ndash;
    <template v-if="items === 1">
      <strong>{{ items }}</strong> visit stored &ndash;
    </template>
    <template v-else>
      <strong>{{ items }}</strong> visits stored &ndash;
    </template>

    <span v-if="active">Current</span>
    <a @click="$emit('click')" v-else>Show</a>
  </article>
</template>

<style scoped>
a {
  cursor: pointer;
}

article {
  transition:
    color 0.3s,
    opacity 0.3s;
}

article.not-active:not(:hover) {
  color: var(--pico-muted-color);
  opacity: 0.7;
}
</style>
