<script setup lang="ts">
defineProps<{
  totalSteps: number
  currentStep: number

}>();
</script>

<template>
  <div class="flex items-stretch gap-2">
    <div v-for="step in (totalSteps - 1)" class="h-2 w-full rounded text-blue-500" style="border: 1px solid;"
      :class="{ 'bg-blue-500 ': step <= currentStep }"></div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
