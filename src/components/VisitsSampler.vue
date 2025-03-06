<script setup lang="ts">
import { computed, ref } from 'vue'
import { Visit } from '@/ts/visit.ts'
import VisitSampler from '@/components/VisitSampler.vue'

import { fileDistributions, loadFiles } from '@/ts/fileDistributions'

defineProps<{
  visits: Visit[]
}>()

const defDeleteMsg = 'Delete all visits'
const deleteMsg = ref(defDeleteMsg)
const disableNew = computed(() => fileDistributions.value.status !== 'success')
const loadError = computed(() =>
  fileDistributions.value.status === 'error' ? fileDistributions.value.error : undefined,
)

const emit = defineEmits<{
  (e: 'regenerate', index: number): void
  (e: 'deleteAll'): void
  (e: 'newVisit'): void
}>()

function deleteAll() {
  if (deleteMsg.value === defDeleteMsg) {
    deleteMsg.value = 'Really delete all?'
    setTimeout(() => (deleteMsg.value = defDeleteMsg), 5000)
  } else {
    emit('deleteAll')
    deleteMsg.value = defDeleteMsg
  }
}
</script>

<template>
  <h2>Initial Visits</h2>

  <article v-if="visits.length === 0">
    No visits yet.
    <button @click="$emit('newVisit')" :disabled="disableNew">Add a visit!</button>
  </article>
  <template v-else>
    <VisitSampler
      v-for="(visit, idx) in visits"
      :key="idx"
      :visit="visit"
      @regenerate="$emit('regenerate', idx)"
    />
    <div class="buttons">
      <button @click="$emit('newVisit')" :disabled="disableNew">&plus; Add visit</button>
      <button @click="deleteAll" class="secondary">&minus; {{ deleteMsg }}</button>
    </div>
  </template>
  <article v-if="loadError" class="error">
    <p><strong>Error loading underlying distribution data:</strong></p>
    <p>{{ loadError }}</p>
    <button @click="loadFiles" class="secondary">Try again</button>
  </article>
  <article v-if="fileDistributions.status === 'not started'">
    No data loaded. Please <a @click="loadFiles">load the required files</a> to continue.
  </article>
</template>

<style scoped>
.buttons {
  display: flex;
  justify-content: space-between;
}

.error,
.error p {
  background-color: darkred;
  color: white;
}

a {
  cursor: pointer;
}
</style>
