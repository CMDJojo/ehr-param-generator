<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import PatientSampler from './components/PatientSampler.vue'
import VisitsSampler from './components/VisitsSampler.vue'

import { EHR } from './ts/ehr'
import PastPatient from './components/PastPatient.vue'

const ehrs: Ref<EHR[]> = ref([EHR.randomPatient()])
const activeEhrIdx: Ref<number> = ref(0)
const activeEhr: ComputedRef<EHR> = computed({
  get: () => ehrs.value[activeEhrIdx.value],
  set: (value) => {
    ehrs.value[activeEhrIdx.value] = value
  },
})

function newEhr() {
  ehrs.value.unshift(EHR.randomPatient())
  activeEhrIdx.value = 0
}
</script>

<template>
  <main class="split">
    <div class="container split-inside">
      <h2 v-if="ehrs.length > 1">Current Patient</h2>
      <h2 v-else>Patient</h2>
      <section>
        <PatientSampler
          :patient="activeEhr.patient"
          :allowDelete="activeEhr.visits.length === 0"
          @newPatient="activeEhr.regeneratePatient()"
        />
        <button @click="newEhr">&plus; New patient</button>
      </section>
      <section v-if="ehrs.length > 1">
        <hr />
        <h4>Admitted Patients</h4>
        <template v-for="(ehr, idx) in ehrs" :key="idx">
          <PastPatient
            :patient="ehr.patient"
            :active="idx === activeEhrIdx"
            :items="ehr.visits.length"
            @click="activeEhrIdx = idx"
          />
        </template>
      </section>
    </div>
    <div class="container split-inside">
      <VisitsSampler
        :visits="activeEhr.visits"
        @regenerate="activeEhr.regenerateVisit($event)"
        @deleteAll="activeEhr.visits = []"
        @newVisit="activeEhr.addRandomVisit()"
      />
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

hr {
  border-top: 2px solid var(--pico-form-element-border-color);
  border-top-style: dashed;
}
</style>
