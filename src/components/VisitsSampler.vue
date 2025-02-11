<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { Prng } from '@/ts/prng.ts'
import { Visit } from '@/ts/visit.ts'
import VisitSampler from '@/components/VisitSampler.vue'

const visits: Ref<Visit[]> = ref([])

const defDeleteMsg = 'Delete all visits'
const deleteMsg = ref(defDeleteMsg)

function newVisit() {
  const prng = Prng.randomSeed()
  const visit = new Visit(prng)
  visits.value.push(visit)
}

function regenerate(index: number) {
  const prng = Prng.randomSeed()
  const visit = new Visit(prng)
  visits.value[index] = visit
}

function deleteAll() {
  if (deleteMsg.value === defDeleteMsg) {
    deleteMsg.value = 'Really delete all?'
    setTimeout(() => (deleteMsg.value = defDeleteMsg), 5000)
  } else {
    visits.value = []
  }
}
</script>

<template>
  <h2>Visits</h2>

  <article v-if="visits.length === 0">
    No visits yet. <button @click="newVisit">Add a visit!</button>
  </article>
  <template v-else>
    <VisitSampler
      v-for="(visit, idx) in visits"
      :key="idx"
      @regenerate="regenerate(idx)"
      :visit="visit"
    />
    <div class="buttons">
      <button @click="newVisit">&plus; Add visit</button>
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
