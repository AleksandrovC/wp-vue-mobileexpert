<script setup lang="ts">

defineProps<{
  // totalSteps: number
  // currentStep: number
  modelValue: ""
  radioBtnName: string //red
  radioGroupName: string
  // colorClasses: string

}>();

</script>




<template>
  <div class="">
    <!-- {{ modelValue }} {{ radioBtnName }} -->
    <input 
    @change="$emit('update:modelValue', radioBtnName)" 
    :id="radioBtnName" class="w-full peer hidden" type="radio" :name="radioGroupName" :value="radioBtnName"
      v-model="modelValue" />
    <label
      class="peer-checked:border-sky-500
              peer-checked:bg-sky-100 hover:bg-sky-50/60 border-slate-300 border rounded-xl min-h-[4.75rem] py-[0.25rem] px-8 flex items-center cursor-pointer"
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
