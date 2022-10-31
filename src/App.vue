<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import ProgressIndicator from "./components/ProgressIndicator.vue";
import FirstScreenHeader from "./components/FirstScreenHeader.vue";
import FirstScreenFooter from "./components/FirstScreenFooter.vue";
import RadioButton from "./components/RadioButton.vue"
import { ref, reactive, computed } from 'vue';
import CheckboxButton from "./components/CheckboxButton.vue";
import jsonData from './assets/mobile-expert/phone-models.json'
import { createConditionalExpression } from "@vue/compiler-core";


const allPhonesData: any = jsonData
const phoneNames = Object.keys(allPhonesData)
const currentPhoneData: any = ref({});
const currentPhoneImg = ref("");
let defaultColor : any = ""

const isPhoneModelFound = computed(() => {

  if (phoneNames.includes(fields.value.phoneModel.value)) {
    
    let currentPhoneName = fields.value.phoneModel.value
    currentPhoneData.value = allPhonesData[currentPhoneName]

    let defaultColor: any = Object.keys(currentPhoneData.value.custom_Colors)[0]
    fields.value.color.checked = defaultColor


    return true
  } else {
    currentStep.value = 0
    return false
  }

  // return phoneNames.includes(fields.value.phoneModel.value) 


})

const fields = ref({
  phoneModel: {
    label: "model telefon",
    type: "search",
    placeholder: "Introdu modelul telefonului tau - Exemplu: S7 Edge",
    value: "",
  },
  color: {
    label: "culoarea",
    type: "radio",
    checked: "",
  },
  storageCapacity: {
    label: "Capacitate",
    type: "radio",
    checked: "",
    value: "",
  },
  networkRestrictions: {
    label: "Este blocat in reatea?",
    type: "radio",
    checked: "",
    value: "",
  },
  displayState: {
    label: "Starea ecranului",
    type: "radio",
    checked: "",
    value: "",
  },
  backCaseState: {
    label: "Starea spatelui telefonului",
    type: "radio",
    checked: "",
    value: "",
  },
  lateralCaseState: {
    label: "Starea lateralelor",
    type: "radio",
    checked: "",
    value: "",
  },
  otherProblems: {
    label: "Alte probleme",
    type: "checkbox",
    checked: [""],
    value: "",
  },
  accesories: {
    label: "Accesorii disponibile",
    type: "checkbox",
    checked: [""],
    value: "",
  },
  name: {
    label: "Nume si prenume",
    type: "text",
    placeholder: "Nume si prenume",
    value: "",
  },
  email: {
    label: "Email",
    type: "email",
    placeholder: "Email",
    value: "",
  },
  phone: {
    label: "Telefon",
    type: "tel",
    placeholder: "Telefon",
    value: "",
  },
})

const steps = [
  ["phoneModel"],
  ["color", "storageCapacity", 'networkRestrictions'],
  ["displayState"],
  ["backCaseState"],
  ["lateralCaseState"],
  ["otherProblems"],
  ["accesories"],
  ["name", "email", "phone"]
]

const currentStep = ref(0)

function updateProblemsCheckbox(value: any) {
  // const value = value;
  // console.log(values)

  // if( value === "Fara probleme") {
  //   return fields.value.otherProblems.checked = ["", "Fara probleme"]
  // }

  if (fields.value.otherProblems.checked.includes(value)) {
    return fields.value.otherProblems.checked = fields.value.otherProblems.checked.filter((v: string) => v !== value);
  }

  return fields.value.otherProblems.checked = [...fields.value.otherProblems.checked, value]
}


function updateAccesoriesCheckbox(value: any) {
  // const value = value;
  // console.log(values)

  // if( value === "Fara probleme") {
  //   return fields.value.otherProblems.checked = ["", "Fara probleme"]
  // }

  if (fields.value.accesories.checked.includes(value)) {
    return fields.value.accesories.checked = fields.value.accesories.checked.filter((v: string) => v !== value);
  }

  return fields.value.accesories.checked = [...fields.value.accesories.checked, value]
}

function nextStep(values: any) {
  if (isLastStep.value) {
    console.log('Done: ', JSON.stringify(values, null, 2));
    return;
  }
  currentStep.value++;
}

function prevStep() {
  if (isFirstStep.value) {
    return;
  }
  currentStep.value--;
}

const phonePictureUrl = computed(() => {
  // getter

    // console.log("GETTER")
    console.log(currentPhoneData.value.custom_Colors[fields.value.color.checked].phoneImg)

    let selectedColor = currentPhoneData.value.custom_Colors[fields.value.color.checked].phoneImg
  return '/src/assets/img/phones-img/' + selectedColor 


  // setter
  // set(newValue) {
  //   console.log("SETTER")

  //   // let selectedColor: any = Object.values(currentPhoneData.value.custom_Colors)[0]
  //   return '/src/assets/img/phones-img/' + newValue
  //   // console.log(currentPhoneData.value.custom_Colors)
 
  // }
})

const totalSteps = computed(() => {
  return steps.length;
})

const isFirstStep = computed(() => {
  return currentStep.value === 0
});

const isLastStep = computed(() => {
  return currentStep.value === totalSteps.value - 1;
});


</script>

<template>
  <div id="multi-step-form" class="grid w-full max-w-5xl justify-self-center">
    <form class="p-10" @submit.prevent="">

      <div v-show="!isFirstStep" class="mb-2">
        <h1 class="text-neutral-500">Oferta Buy-back</h1>
        <!-- <h2 class="text-[2em] font-bold">Samsung S7Edge</h2> fields.phoneModel.value -->
        <h2 class="text-[2em] font-bold">{{ fields.phoneModel.value }}</h2>

      </div>

      <ProgressIndicator v-if="!isFirstStep" :total-steps="totalSteps" :current-step="currentStep" class="mb-12" />

      <!-- <div v-for="(fieldKeys, step) in steps">
        <div v-if="currentStep === step">
          <div v-for="field in fieldKeys" class="relative">
            <div class="form-control">
              <label class="label">
                {{ fields[field].label }}
                <input class="w-full border border-slate-300" :type="fields[field].type" v-model="fields[field].value" />
              </label>
            </div>
          </div>
        </div>
      </div> -->

      <template v-if="isFirstStep">
        <FirstScreenHeader />

        <span color="text-red-400">{{ isPhoneModelFound }}</span>
        <input class="w-full border rounded-full border-blue-400 px-6 py-2 bg-blue-50"
          placeholder="Introdu modelul telefonului tau - Exemplu: S7 Edge" type="search"
          v-model="fields.phoneModel.value" list="data" />

        <datalist v-if="!isPhoneModelFound" id="data">
          <option v-for="phoneName in phoneNames" :value="phoneName"></option>
        </datalist>
        <!-- <p v-show="!isPhoneModelFound"> Daca telefonul tau nu se gaseste in lista - ne poti contacta aici.</p> -->
      </template>

      <template v-if="currentStep === 1">
        <div class="flex flex-col md:flex-row">
          <div class="mr-10">
            <img :src="phonePictureUrl" class="h-60" alt="">
          </div>
          <div>
            <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
              <h3 class="font-bold text-xl mb-4">Culoarea telefonului tau</h3>

              <div class="flex">
                <!-- currentPhoneData -->
                <RadioButton v-for="(color, key, i) in currentPhoneData.custom_Colors" v-model="fields.color.checked" 
                  radioGroupName="color" :radioBtnName="key.toString()"
                  >
                  <div class="rounded-full relative h-8 w-8" :style="{ backgroundColor: color.hex }">
                    <div class="rounded-full absolute h-8 w-8  bg-gradient-to-t from-black/20 via-black/10 to-black/0">
                    </div>
                    <div class="rounded-full absolute h-8 w-8 mix-blend-color-dodge"></div>
                  </div>
                </RadioButton>

                <!-- {{ currentPhoneData.custom_Colors }} -->


                <!-- <RadioButton v-model="fields.color.checked" radioGroupName="color" radioBtnName="red"
                  :colorClasses="'from-red-500 to-red-800'">
                  <div class="rounded-full h-8 w-8 bg-gradient-to-b from-red-500 to-red-800"></div>
                </RadioButton>


                <RadioButton v-model="fields.color.checked" radioGroupName="color" radioBtnName="blue">
                  <div class="rounded-full h-8 w-8 bg-gradient-to-b from-blue-500 to-blue-800"></div>
                </RadioButton>

                <RadioButton v-model="fields.color.checked" radioGroupName="color" radioBtnName="green">
                  <div class="rounded-full h-8 w-8 bg-gradient-to-b from-green-300 to-green-500"></div>
                </RadioButton> -->

              </div>
            </section>
            <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
              <h3 class="font-bold text-xl mb-4">Capacitate</h3>
              <div class="flex">

                <RadioButton v-model="fields.storageCapacity.checked" radioGroupName="storageCapacity"
                  radioBtnName="64gb">
                  <span>64GB</span>
                </RadioButton>

                <RadioButton v-model="fields.storageCapacity.checked" radioGroupName="storageCapacity"
                  radioBtnName="128gb">
                  <span>128GB</span>
                </RadioButton>

                <RadioButton v-model="fields.storageCapacity.checked" radioGroupName="storageCapacity"
                  radioBtnName="256gb">
                  <span>256GB</span>
                </RadioButton>

              </div>
            </section>
            <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
              <h3 class="font-bold text-xl mb-4">Este blocat in reatea?</h3>
              <div class="flex">

                <RadioButton v-model="fields.networkRestrictions.checked" radioGroupName="networkRestrictions"
                  radioBtnName="deblocat">
                  <span>Deblocat</span>
                </RadioButton>

                <RadioButton v-model="fields.networkRestrictions.checked" radioGroupName="networkRestrictions"
                  radioBtnName="orange">
                  <span>Orange</span>
                </RadioButton>

                <RadioButton v-model="fields.networkRestrictions.checked" radioGroupName="networkRestrictions"
                  radioBtnName="vodafone">
                  <span>Vodafone</span>
                </RadioButton>

                <RadioButton v-model="fields.networkRestrictions.checked" radioGroupName="networkRestrictions"
                  radioBtnName="operatorStrain">
                  <span>Oparator strain</span>
                </RadioButton>
              </div>
            </section>
          </div>
        </div>
      </template>

      <template v-if="currentStep === 2">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <h3 class="font-bold text-xl mb-4">Starea ecranului</h3>

          <div class="grid grid-cols-2 gap-2">

            <RadioButton v-model="fields.displayState.checked" radioGroupName="displayState" radioBtnName="4/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Ca nou</span>
                <span class="text-slate-500">Stare perfecta, fara zgarieturi</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.displayState.checked" radioGroupName="displayState" radioBtnName="3/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Foarte bun</span>
                <span class="text-slate-500">Câteva zgârieturi superficiale, fără fisuri</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.displayState.checked" radioGroupName="displayState" radioBtnName="2/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Bun</span>
                <span class="text-slate-500">Zgârieturi evidente, folosire intensă, fără fisuri, urme</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.displayState.checked" radioGroupName="displayState" radioBtnName="1/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Uzat: spart, deteriorat</span>
                <span class="text-slate-500">Fisurat, pixeli nefuncționali, zgârieturi pronunțate</span>
              </div>
            </RadioButton>

            <!-- <RadioButton v-model="fields.displayState.checked" radioGroupName="displayState" radioBtnName="1/5"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Uzat: spart, ingalbenit</span>
                <span class="text-slate-500">Ecran spart sau fisurat. Display ingalbenit sau cu urme.</span>
              </div>
            </RadioButton> -->

          </div>
        </section>
      </template>

      <template v-if="currentStep === 3">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <h3 class="font-bold text-xl mb-4">Starea spatelui telefonului</h3>

          <div class="grid grid-cols-2 gap-2">

            <RadioButton v-model="fields.backCaseState.checked" radioGroupName="backCaseState" radioBtnName="4/4">
              <div class="flex flex-col">
                <span class="font-bold">Ca nou</span>
                <span class="text-slate-500">Stare perfectă fără defecte, zgârieturi, fisuri</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.backCaseState.checked" radioGroupName="backCaseState" radioBtnName="3/4">
              <div class="flex flex-col">
                <span class="font-bold">Foarte bun</span>
                <span class="text-slate-500">Câteva zgârieturi superficiale, fără fisuri</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.backCaseState.checked" radioGroupName="backCaseState" radioBtnName="2/4">
              <div class="flex flex-col">
                <span class="font-bold">Bun</span>
                <span class="text-slate-500">Zgârieturi evidente, folosire intensă, fără fisuri, urme</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.backCaseState.checked" radioGroupName="backCaseState" radioBtnName="1/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Uzat: spart, deteriorat</span>
                <span class="text-slate-500">Fisurat, zgârieturi pronunțate</span>
              </div>
            </RadioButton>

          </div>
        </section>
      </template>

      <template v-if="currentStep === 4">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <h3 class="font-bold text-xl mb-4">Starea lateralelor</h3>

          <div class="grid grid-cols-2 gap-2">

            <RadioButton v-model="fields.lateralCaseState.checked" radioGroupName="lateralCaseState" radioBtnName="4/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Ca nou</span>
                <span class="text-slate-500">Stare perfectă fără defecte, zgârieturi, crăpături</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.lateralCaseState.checked" radioGroupName="lateralCaseState" radioBtnName="3/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Foarte bun</span>
                <span class="text-slate-500">Câteva zgârieturi superficiale, fără crăpături</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.lateralCaseState.checked" radioGroupName="lateralCaseState" radioBtnName="2/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Bun</span>
                <span class="text-slate-500">Zgârieturi evidente, folosire intensă, fără crăpături</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.lateralCaseState.checked" radioGroupName="lateralCaseState" radioBtnName="1/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Uzat: spart, deteriorat</span>
                <span class="text-slate-500">Crăpat, zgârieturi pronunțate.</span>
              </div>
            </RadioButton>


          </div>
        </section>
      </template>

      <template v-if="currentStep === 5">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <h3 class="font-bold text-xl mb-4">Alte defecțiuni</h3>

          <div class="grid grid-cols-2 gap-2">

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="Fara probleme">
              <div class="flex flex-col">
                <span class="font-bold">Nici o problema</span>
                <span class="text-slate-500">Ca nou, stare excelenta</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="Probleme display">
              <div class="flex flex-col">
                <span class="font-bold">Probleme Display/Touchscreen</span>
                <span class="text-slate-500">Display spart, pixeli nefuncționali, burn-in</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="Probleme difuzor">
              <div class="flex flex-col">
                <span class="font-bold">Se aude încet/înfundat</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox"
              radioBtnName="Probleme camera fata/spate">
              <div class="flex flex-col">
                <span class="font-bold">Probleme cameră față/spate</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="Probleme baterie">
              <div class="flex flex-col">
                <span class="font-bold">Baterie uzată</span>
                <span class="text-slate-500">Se descarcă rapid. iPhone cu nivel baterie sub 80% health</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="Probleme senzor amprenta/Face ID">
              <div class="flex flex-col">
                <span class="font-bold">Probleme senzor amprenta/Face ID</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="A mai fost reparat">
              <div class="flex flex-col">
                <span class="font-bold">A fost reparat în garanție/contra cost</span>
                <span class="text-slate-500">A avut o reparatie realizată, schimbat ecran, baterie, etc.
Dețin fișa de service</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="Alte probleme">
              <div class="flex flex-col">
                <span class="font-bold">Alte probleme</span>
                <span class="text-slate-500">Nu pornește, cont iCloud blocat, butoane, porturi nefunctionale, etc.</span>
              </div>
            </CheckboxButton>



          </div>
        </section>
      </template>


      <template v-if="currentStep === 6">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <h3 class="font-bold text-xl mb-4">Accesorii si documente disponibile</h3>

          <div class="grid grid-cols-2 gap-2">

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="Produs nou">
              <div class="flex flex-col">
                <span class="font-bold">Produsul este nou</span>
                <span class="text-slate-500">Arata impecabil, se poate dovedi achiziția
                  în ultimele 14 zile</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="Cutie originala">
              <div class="flex flex-col">
                <span class="font-bold">Cutie</span>
                <span class="text-slate-500">Doar cutia originala, fara alte accesorii</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox"
              radioBtnName="Incarcator si cablu original">
              <div class="flex flex-col">
                <span class="font-bold">Incarcator si cablu original</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="Casti originale">
              <div class="flex flex-col">
                <span class="font-bold">Casti originale</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="Factura">
              <div class="flex flex-col">
                <span class="font-bold">Factura</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="Garantie">
              <div class="flex flex-col">
                <span class="font-bold">Garantie</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>



          </div>
        </section>
      </template>

      <template v-if="currentStep === 7">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <!-- <h3 class="font-bold text-xl mb-4">Accesorii disponibile</h3> -->

          <div class="grid">

            <h4 class="text-xl font-bold justify-self-center">Valoare estimata</h4>
            <h5 class="text-[3em] font-bold justify-self-center text-green-500 mb-6">1135 lei</h5>

            <label hiden for="name"></label>
            <input id="name" type="text" class="border-slate-300 border rounded px-4 py-2 mb-3"
              placeholder="Nume si prenume">



            <label hiden for="email"></label>
            <input id="name" type="text" class="border-slate-300 border rounded px-4 py-2 mb-3" placeholder="Email">


            <label hiden for="phone"></label>
            <input id="name" type="text" class="border-slate-300 border rounded px-4 py-2 mb-3" placeholder="Telefon">

            <div class="flex justify-center">
              <button class="bg-green-600 px-14 py-4 rounded-md text-white font-bold mt-4">Vreau sa fiu
                contactat</button>
            </div>

          </div>
        </section>
      </template>



      <footer :class="[isLastStep || isFirstStep ? 'justify-center' : 'justify-between']"
        class="flex flex-row-reverse gap-2 mt-5 w-full">
        <button v-if="!isLastStep" :disabled=!isPhoneModelFound
          class="bg-blue-100 px-12 py-3 rounded-md  text-blue-500 disabled:opacity-50 font-bold" @click="nextStep">
          Next &gt;
        </button>
        <button v-if="!isFirstStep" class="text-neutral-500" @click.prevent="prevStep">
          &lt; Previous
        </button>
      </footer>

      <FirstScreenFooter :isPhoneModelFound="isPhoneModelFound" v-if="isFirstStep" />

    </form>
    <!-- ⚠️db preview  -->
    <pre>{{ fields }}</pre>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
