<script setup lang="ts">

defineProps<{
  // modelValue: any
  radioBtnName: string //red
}>();

</script>

<template>
  <div class="mr-2 grid grid-cols-2 grid-rows-1 relative">
    <input @change="$emit('updateCheckboxInput', radioBtnName)" :id="radioBtnName" class="col-span-1 col-start-1 row-start-1 peer z-10 ml-3 justify-self-start" type="checkbox"
      :name="radioBtnName" :value="radioBtnName"  />
    <label class="peer-checked:border-sky-500
              peer-checked:bg-sky-100 col-span-2 row-start-1 col-start-1 border-slate-300 border rounded-xl h-20 px-9 flex items-center"
      :for="radioBtnName">
      <slot></slot>
    </label>
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
