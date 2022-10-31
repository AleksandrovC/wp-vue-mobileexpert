<script setup lang="ts">

defineProps<{
  // totalSteps: number
  // currentStep: number
  modelValue: string
  radioBtnName: string //red
  radioGroupName: string
  // colorClasses: string

}>();

</script>

<template>
  <div class="mr-2">
    <input @change="$emit('update:modelValue', radioBtnName)" :id="radioBtnName" class="w-full peer hidden" type="radio"
      :name="radioGroupName" :value="radioBtnName" v-model="modelValue" />
    <label class="peer-checked:border-sky-500
              peer-checked:bg-sky-100  border-slate-300 border rounded-xl h-20 px-8 flex items-center"
      :for="radioBtnName">
      <slot></slot>
    </label>
    <!-- <div>
      
    </div> -->
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
