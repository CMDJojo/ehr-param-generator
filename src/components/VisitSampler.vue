<script setup lang="ts">
import VisitView from '@/components/VisitView.vue'
import { Visit } from '@/ts/visit.ts'

defineProps<{
  visit: Visit
}>()

const emit = defineEmits(['regenerate'])

function newVisit() {
  emit('regenerate')
}
</script>

<template>
  <article>
    <VisitView :visit="visit" />

    <footer>Not happy with this visit? Get a <a @click="newVisit">new one!</a></footer>
  </article>
</template>

<style scoped>
a {
  cursor: pointer;
}
</style>
