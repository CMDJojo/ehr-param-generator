<script setup lang="ts">
import { ref } from 'vue'
import { Visit } from '@/ts/visit.ts'
import VisitSampler from '@/components/VisitSampler.vue'

defineProps<{
  visits: Visit[]
}>()

const defDeleteMsg = 'Delete all visits'
const deleteMsg = ref(defDeleteMsg)

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
    No visits yet. <button @click="$emit('newVisit')">Add a visit!</button>
  </article>
  <template v-else>
    <VisitSampler
      v-for="(visit, idx) in visits"
      :key="idx"
      :visit="visit"
      @regenerate="$emit('regenerate', idx)"
    />
    <div class="buttons">
      <button @click="$emit('newVisit')">&plus; Add visit</button>
      <button @click="deleteAll" class="secondary">&minus; {{ deleteMsg }}</button>
    </div>
  </template>
</template>

<style scoped>
.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
