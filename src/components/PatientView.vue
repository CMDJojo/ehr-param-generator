<script setup lang="ts">
import { Patient } from '@/ts/patient'
import { ifGender } from '@/ts/types'
import { ref } from 'vue'

defineProps<{ patient: Patient }>()

const displayTable = ref(true)
</script>

<template>
  <p>
    This patient, {{ patient.name }}, is a {{ patient.age }} years old
    {{ ifGender(patient.gender, 'man', 'woman') }}.
    {{ ifGender(patient.gender, 'His', 'Her') }} first visit was
    {{ patient.firstVisitDate.toDateString() }}.
  </p>

  <p>Number of visits:</p>
  <table v-if="displayTable" class="styled">
    <thead>
      <tr class="styled">
        <th class="nostyle"></th>
        <th class="styled">Physicians</th>
        <th class="styled">Nurses</th>
        <th class="styled">Assistant nurses</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="year in [2020, 2021, 2022, 2023, 2024]" :key="year">
        <th class="styled">{{ year }}</th>
        <td class="styled">{{ patient.phycVisits.getYear(year) }}</td>
        <td class="styled">{{ patient.nurseVisits.getYear(year) }}</td>
        <td class="styled">{{ patient.assistantVisits.getYear(year) }}</td>
      </tr>
      <tr class="totals-row">
        <th class="styled">Total</th>
        <th class="styled">{{ patient.phycVisits.sum() }}</th>
        <th class="styled">{{ patient.nurseVisits.sum() }}</th>
        <th class="styled">{{ patient.assistantVisits.sum() }}</th>
      </tr>
    </tbody>
  </table>
  <table v-else class="fake-table">
    <tbody>
      <tr v-for="year in [2020, 2021, 2022, 2023, 2024]" :key="year">
        <th class="year-pad">{{ year }}</th>
        <td>
          <strong>{{ patient.phycVisits.getYear(year) }}</strong> physician,
        </td>
        <td>
          <strong>{{ patient.nurseVisits.getYear(year) }}</strong> nurse,
        </td>
        <td>
          <strong>{{ patient.assistantVisits.getYear(year) }}</strong> assistant nurse visits.
        </td>
      </tr>
      <tr>
        <td><strong>Total:</strong></td>
        <td>
          <strong>{{ patient.phycVisits.sum() }}</strong> physician,
        </td>
        <td>
          <strong>{{ patient.nurseVisits.sum() }}</strong> nurse,
        </td>
        <td>
          <strong>{{ patient.assistantVisits.sum() }}</strong> assistant nurse visits.
        </td>
      </tr>
    </tbody>
  </table>

  <label>
    <input name="terms" type="checkbox" role="switch" v-model="displayTable" />
    Display as table
  </label>
</template>

<style scoped>
.year-pad {
  padding-right: 5pt;
}

.fake-table {
  width: auto;
}

th {
  font-weight: bold;
}

th,
td {
  padding: 1pt;
  border-bottom: 0px;
}

th.styled,
td.styled {
  border: 1px solid;
  padding: 3pt;
}

.nostyle {
  border: 0px;
}
</style>
