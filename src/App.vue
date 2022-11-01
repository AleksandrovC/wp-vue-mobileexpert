<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import ProgressIndicator from "./components/ProgressIndicator.vue";
import FirstScreenHeader from "./components/FirstScreenHeader.vue";
import FirstScreenFooter from "./components/FirstScreenFooter.vue";
import RadioButton from "./components/RadioButton.vue"
import { ref, reactive, computed, nextTick } from 'vue';
import CheckboxButton from "./components/CheckboxButton.vue";
import jsonData from './assets/mobile-expert/phone-models.json'
import { createConditionalExpression } from "@vue/compiler-core";

const currentStep = ref(0)

const allPhonesData: any = jsonData
const phoneNames = Object.keys(allPhonesData)
const currentPhoneData: any = ref({});
// const currentPhoneImg = ref("");
// let defaultColor: any = ""

const isPhoneModelFound = computed(() => {

  if (phoneNames.includes(fields.value.phoneModel.value)) {

    let currentPhoneName = fields.value.phoneModel.value
    currentPhoneData.value = allPhonesData[currentPhoneName]

    let defaultColor: any = Object.keys(currentPhoneData.value.custom_Colors)[0]
    fields.value.color.value = defaultColor


    return true
  } else {
    currentStep.value = 0
    return false
  }

  // return phoneNames.includes(fields.value.phoneModel.value) 


})

const isInvalid = computed(() => {
  return !!Object.values(invalids.value).filter((key) => key).length;

})

const invalids: any = ref({})

const fields: any = ref({
  phoneModel: {
    label: "model telefon",
    type: "search",
    placeholder: "Introdu modelul telefonului tau - Exemplu: S7 Edge",
    value: "",
    validations: [
      {
        message: "Modelul telefonului este invalid",
        test: (value: string) => value
      }
    ]
  },
  color: {
    label: "culoarea",
    type: "radio",
    value: "",
    validations: [
      {
        message: "Alege o culoare",
        test: (value: string) => value
      }
    ]
  },
  storageCapacity: {
    label: "Capacitate",
    type: "radio",
    value: "",
    validations: [
      {
        message: "Alege o varianta - stocare",
        test: (value: string) => value
      }
    ]
  },
  networkRestrictions: {
    label: "Este blocat in reatea?",
    type: "radio",
    value: "",
    validations: [
      {
        message: "Alege o varianta - retea",
        test: (value: string) => value
      }
    ]
  },
  displayState: {
    label: "Starea ecranului",
    type: "radio",
    value: "",
    validations: [
      {
        message: "Alege o varianta - display",
        test: (value: string) => value
      }
    ]
  },
  backCaseState: {
    label: "Starea spatelui telefonului",
    type: "radio",
    value: "",
    validations: [
      {
        message: "Alege o varianta - caracasa spate",
        test: (value: string) => value
      }
    ]
  },
  lateralCaseState: {
    label: "Starea lateralelor",
    type: "radio",
    value: "",
    validations: [
      {
        message: "Alege cel putin o varianta - lateral",
        test: (value: string) => value
      }
    ]
  },
  otherProblems: {
    label: "Alte probleme",
    type: "checkbox",
    value: [],
    validations: [
      {
        message: "Alege cel putin o varianta",
        test: (value: string) => value
      }
    ]
  },
  accesories: {
    label: "Accesorii disponibile",
    type: "checkbox",
    value: [],
    validations: [
      {
        message: "Alege cel putin o varianta",
        test: (value: string) => value
      }
    ]
  },
  name: {
    label: "Nume si prenume",
    type: "text",
    placeholder: "Nume si prenume",
    value: "",
    validations: [
      {
        message: "Completeaza numele",
        test: (value: string) => value
      }
    ]
  },
  email: {
    label: "Email",
    type: "email",
    placeholder: "Email",
    value: "",
    validations: [
      {
        message: "Completeaza Email",
        test: (value: string) => value
      }
    ]
  },
  phone: {
    label: "Telefon",
    type: "tel",
    placeholder: "Telefon",
    value: "",
    validations: [
      {
        message: "Completeaza numarul de telefon",
        test: (value: string) => value
      }
    ]
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

const submitted = ref(false)


const currentFields: any = computed(() => {
  return steps[currentStep.value]
})

const phonePictureUrl = computed(() => {
  let selectedColor = currentPhoneData.value.custom_Colors[fields.value.color.value].phoneImg
  return '/src/assets/img/phones-img/' + selectedColor
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

let estimatedValue: any = ref();
let phoneReview : any = ref()

function estimateValue() {

  let phoneData = currentPhoneData.value

  const phoneModel = fields.value.phoneModel.value
  const phoneColor = fields.value.color.value
  const phoneStorage = fields.value.storageCapacity.value
  const networkRestrictions = fields.value.networkRestrictions.value
  const display = fields.value.displayState.value
  const backCase = fields.value.backCaseState.value
  const lateralCase = fields.value.lateralCaseState.value
  const otherProblems = fields.value.otherProblems.value
  const accesories = fields.value.accesories.value


  phoneReview.value = {
    ["[basePrice] " + phoneModel]: phoneData.basePrice,
    ["[color] " + phoneColor]: phoneData.custom_Colors[phoneColor].colorPriceModifier,
    ["[storage] " + phoneStorage]: phoneData.custom_StoragePriceModifiers[phoneStorage],
    ["[networkRestrictions] " + networkRestrictions]: phoneData.networkRestrictionsPriceModifiers[networkRestrictions],
    ["[displayState] " + display]: phoneData.displayPriceModifiers[display],
    ["[backCaseState] " + backCase]: phoneData.backcasePriceModifiers[backCase],
    ["[lateralCase] " + lateralCase]: phoneData.laterlsPriceModifiers[lateralCase],
  }

  //add [problem] items to priceModifiers
  otherProblems.forEach((element: any) => {
    phoneReview.value["[problem] " + element] = phoneData.otherProblemsPriceModifiers[element]
  });

  //add [accessory] items to priceModidiers
  accesories.forEach((element: any) => {
    phoneReview.value["[accesory] " + element] = phoneData.accesoriesPriceModifiers[element]
  })


  console.log(Object.values(phoneReview.value))
  console.log(Object.keys(phoneReview.value))
  console.log(Object.values(phoneReview.value).reduce((a: any, b: any) =>  a + b, 0))

  phoneReview.value["Estimated Price"] = Object.values(phoneReview.value).reduce((a: any, b: any) =>  a + b, 0)



  // console.log(fields.value.color.value)
  // console.log(currentPhoneData)
  // return currentPhoneData.value.basePrice
  return estimatedValue.value = phoneReview.value["Estimated Price"]

}


function validate() {
  invalids.value = {};
  // validates all the fields on the current page

  currentFields.value.forEach((key: number) => {
    validateField(key);
  });
}

function validateField(fieldKey: number) {
  invalids.value[fieldKey] = false;
  const field = fields.value[fieldKey];
  // run through each of the fields validation tests


  field.validations.forEach((validation: { test: (arg0: any) => any; message: any; }) => {
    if (!validation.test(field.value)) {
      invalids.value[fieldKey] = validation.message;
    }
  });
}

function submit() {
  // if form not valid don't submit
  validate()
  if (isInvalid.value) return;


  let customerData = {
    "name": fields.value.name.value,
    "telefon" : fields.value.phone.value,
    "email" : fields.value.email.value
  }
  // submit on valid form
  console.log("doing submit", phoneReview.value, customerData);
  submitted.value = true;
}

function updateProblemsCheckbox(checked: any) {
  // const value = value;

  // if( value === "Fara probleme") {
  //   return fields.value.otherProblems.value = ["", "Fara probleme"]
  // }

  if (fields.value.otherProblems.value.includes(checked)) {
    return fields.value.otherProblems.value = fields.value.otherProblems.value.filter((v: string) => v !== checked);
  }

  return fields.value.otherProblems.value = [...fields.value.otherProblems.value, checked]
}


function updateAccesoriesCheckbox(checked: any) {
  // const value = value;

  // if( value === "Fara probleme") {
  //   return fields.value.otherProblems.value = ["", "Fara probleme"]
  // }

  if (fields.value.accesories.value.includes(checked)) {
    return fields.value.accesories.value = fields.value.accesories.value.filter((v: string) => v !== checked);
  }

  return fields.value.accesories.value = [...fields.value.accesories.value, checked]
}

function nextStep(values: any) {
  // if validate

  validate();
  if (isInvalid.value) return;

  currentStep.value++;

  console.log(totalSteps.value)
  console.log(currentStep.value)

  if (isLastStep.value) {
    console.log('merge')
    estimateValue()
    // console.log('Done: ', JSON.stringify(values, null, 2));
    return;
  }
}

function prevStep() {
  if (isFirstStep.value) {
    return;
  }
  currentStep.value--;
}



</script>

<template>
  <div id="multi-step-form" class="grid w-full max-w-5xl justify-self-center">
    <form v-if="!submitted" class="p-10" @submit.prevent="">
<!-- 
      <button @click="estimateValue">compute</button>
      <pre>{{ estimatedValue }}</pre> -->

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
                <RadioButton @change="validate()" v-for="(color, key, i) in currentPhoneData.custom_Colors"
                  v-model="fields.color.value" radioGroupName="color" :radioBtnName="key.toString()">
                  <div class="rounded-full relative h-8 w-8" :style="{ backgroundColor: color.hex }">
                    <div class="rounded-full absolute h-8 w-8  bg-gradient-to-t from-black/20 via-black/10 to-black/0">
                    </div>
                    <div class="rounded-full absolute h-8 w-8 mix-blend-color-dodge"></div>
                  </div>
                </RadioButton>

              </div>
              <section v-if="invalids.color" class="font-bold">{{ invalids.color }}</section>
            </section>
            <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
              <h3 class="font-bold text-xl mb-4">Capacitate</h3>
              <div class="flex">

                <RadioButton @change="validate()" v-model="fields.storageCapacity.value"
                  radioGroupName="storageCapacity" radioBtnName="64gb">
                  <span>64GB</span>
                </RadioButton>

                <RadioButton @change="validate()" v-model="fields.storageCapacity.value"
                  radioGroupName="storageCapacity" radioBtnName="128gb">
                  <span>128GB</span>
                </RadioButton>

                <RadioButton @change="validate()" v-model="fields.storageCapacity.value"
                  radioGroupName="storageCapacity" radioBtnName="256gb">
                  <span>256GB</span>
                </RadioButton>

              </div>
              <section v-if="invalids.storageCapacity" class="font-bold">{{ invalids.storageCapacity }}</section>
            </section>
            <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
              <h3 class="font-bold text-xl mb-4">Este blocat in reatea?</h3>
              <div class="flex">

                <RadioButton @change="validate()" v-model="fields.networkRestrictions.value"
                  radioGroupName="networkRestrictions" radioBtnName="deblocat">
                  <span>Deblocat</span>
                </RadioButton>

                <RadioButton @change="validate()" v-model="fields.networkRestrictions.value"
                  radioGroupName="networkRestrictions" radioBtnName="orange">
                  <span>Orange</span>
                </RadioButton>

                <RadioButton @change="validate()" v-model="fields.networkRestrictions.value"
                  radioGroupName="networkRestrictions" radioBtnName="vodafone">
                  <span>Vodafone</span>
                </RadioButton>

                <RadioButton @change="validate()" v-model="fields.networkRestrictions.value"
                  radioGroupName="networkRestrictions" radioBtnName="operatorStrain">
                  <span>Oparator strain</span>
                </RadioButton>
              </div>
              <section v-if="invalids.networkRestrictions" class="font-bold">{{ invalids.networkRestrictions }}
              </section>

            </section>
          </div>
        </div>
      </template>

      <template v-if="currentStep === 2">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <h3 class="font-bold text-xl mb-4">Starea ecranului</h3>

          <div class="grid grid-cols-2 gap-2">

            <RadioButton v-model="fields.displayState.value" radioGroupName="displayState" radioBtnName="4/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Ca nou</span>
                <span class="text-slate-500">Stare perfecta, fara zgarieturi</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.displayState.value" radioGroupName="displayState" radioBtnName="3/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Foarte bun</span>
                <span class="text-slate-500">Câteva zgârieturi superficiale, fără fisuri</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.displayState.value" radioGroupName="displayState" radioBtnName="2/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Bun</span>
                <span class="text-slate-500">Zgârieturi evidente, folosire intensă, fără fisuri, urme</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.displayState.value" radioGroupName="displayState" radioBtnName="1/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Uzat: spart, deteriorat</span>
                <span class="text-slate-500">Fisurat, pixeli nefuncționali, zgârieturi pronunțate</span>
              </div>
            </RadioButton>

          </div>
          <section v-if="invalids.displayState" class="font-bold">{{ invalids.displayState }}
          </section>
        </section>
      </template>

      <template v-if="currentStep === 3">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <h3 class="font-bold text-xl mb-4">Starea spatelui telefonului</h3>

          <div class="grid grid-cols-2 gap-2">

            <RadioButton v-model="fields.backCaseState.value" radioGroupName="backCaseState" radioBtnName="4/4">
              <div class="flex flex-col">
                <span class="font-bold">Ca nou</span>
                <span class="text-slate-500">Stare perfectă fără defecte, zgârieturi, fisuri</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.backCaseState.value" radioGroupName="backCaseState" radioBtnName="3/4">
              <div class="flex flex-col">
                <span class="font-bold">Foarte bun</span>
                <span class="text-slate-500">Câteva zgârieturi superficiale, fără fisuri</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.backCaseState.value" radioGroupName="backCaseState" radioBtnName="2/4">
              <div class="flex flex-col">
                <span class="font-bold">Bun</span>
                <span class="text-slate-500">Zgârieturi evidente, folosire intensă, fără fisuri, urme</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.backCaseState.value" radioGroupName="backCaseState" radioBtnName="1/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Uzat: spart, deteriorat</span>
                <span class="text-slate-500">Fisurat, zgârieturi pronunțate</span>
              </div>
            </RadioButton>

          </div>
          <section v-if="invalids.backCaseState" class="font-bold">{{ invalids.backCaseState }}
          </section>
        </section>
      </template>

      <template v-if="currentStep === 4">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <h3 class="font-bold text-xl mb-4">Starea lateralelor</h3>

          <div class="grid grid-cols-2 gap-2">

            <RadioButton v-model="fields.lateralCaseState.value" radioGroupName="lateralCaseState" radioBtnName="4/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Ca nou</span>
                <span class="text-slate-500">Stare perfectă fără defecte, zgârieturi, crăpături</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.lateralCaseState.value" radioGroupName="lateralCaseState" radioBtnName="3/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Foarte bun</span>
                <span class="text-slate-500">Câteva zgârieturi superficiale, fără crăpături</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.lateralCaseState.value" radioGroupName="lateralCaseState" radioBtnName="2/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Bun</span>
                <span class="text-slate-500">Zgârieturi evidente, folosire intensă, fără crăpături</span>
              </div>
            </RadioButton>

            <RadioButton v-model="fields.lateralCaseState.value" radioGroupName="lateralCaseState" radioBtnName="1/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Uzat: spart, deteriorat</span>
                <span class="text-slate-500">Crăpat, zgârieturi pronunțate.</span>
              </div>
            </RadioButton>


          </div>
          <section v-if="invalids.lateralCaseState" class="font-bold">{{ invalids.lateralCaseState }}
          </section>
        </section>
      </template>

      <template v-if="currentStep === 5">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <h3 class="font-bold text-xl mb-4">Alte defecțiuni</h3>

          <div class="grid grid-cols-2 gap-2">

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="noProblems">
              <div class="flex flex-col">
                <span class="font-bold">Nici o problema</span>
                <span class="text-slate-500">Ca nou, stare excelenta</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="speakerProblem">
              <div class="flex flex-col">
                <span class="font-bold">Se aude încet/înfundat</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="frontCam/BackCamProblem">
              <div class="flex flex-col">
                <span class="font-bold">Probleme cameră față/spate</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="batteryProblem">
              <div class="flex flex-col">
                <span class="font-bold">Baterie uzată</span>
                <span class="text-slate-500">Se descarcă rapid. iPhone cu nivel baterie sub 80% health</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="fingerprint/FaceIdProblem">
              <div class="flex flex-col">
                <span class="font-bold">Probleme senzor amprenta/Face ID</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="wasRepairedBefore">
              <div class="flex flex-col">
                <span class="font-bold">A fost reparat în garanție/contra cost</span>
                <span class="text-slate-500">A avut o reparatie realizată, schimbat ecran, baterie, etc.
                  Dețin fișa de service</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="otherProblems">
              <div class="flex flex-col">
                <span class="font-bold">Alte probleme</span>
                <span class="text-slate-500">Nu pornește, cont iCloud blocat, butoane, porturi nefunctionale,
                  etc.</span>
              </div>
            </CheckboxButton>



          </div>

          <section v-if="invalids.otherProblems" class="font-bold">{{ invalids.otherProblems }}
          </section>
        </section>
      </template>


      <template v-if="currentStep === 6">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <h3 class="font-bold text-xl mb-4">Accesorii si documente disponibile</h3>

          <div class="grid grid-cols-2 gap-2">

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="produsNou">
              <div class="flex flex-col">
                <span class="font-bold">Produsul este nou</span>
                <span class="text-slate-500">Arata impecabil, se poate dovedi achiziția
                  în ultimele 14 zile</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="cutieOriginala">
              <div class="flex flex-col">
                <span class="font-bold">Cutie</span>
                <span class="text-slate-500">Doar cutia originala, fara alte accesorii</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="incarcatorSiCablu">
              <div class="flex flex-col">
                <span class="font-bold">Incarcator si cablu original</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="castiOriginale">
              <div class="flex flex-col">
                <span class="font-bold">Casti originale</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="factura">
              <div class="flex flex-col">
                <span class="font-bold">Factura</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="garantie">
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
            <h5 class="text-[3em] font-bold justify-self-center text-green-500 mb-6">{{ estimatedValue }}</h5>

            <label hiden for="name"></label>
            <input v-model="fields.name.value" id="name" type="text"
              class="border-slate-300 border rounded px-4 py-2 mb-3" placeholder="Nume si prenume">

            <section v-if="invalids.name" class="font-bold">{{ invalids.name }}
            </section>



            <label hiden for="email"></label>
            <input v-model="fields.email.value" id="email" type="email"
              class="border-slate-300 border rounded px-4 py-2 mb-3" placeholder="Email">

            <section v-if="invalids.email" class="font-bold">{{ invalids.email }}
            </section>


            <label hiden for="phone"></label>
            <input v-model="fields.phone.value" id="phone" type="number"
              class="border-slate-300 border rounded px-4 py-2 mb-3" placeholder="Telefon">

            <section v-if="invalids.phone" class="font-bold">{{ invalids.phone }}
            </section>

            <div class="flex justify-center">
              <button @click.prevent="submit()"
                class="bg-green-600 px-14 py-4 rounded-md text-white font-bold mt-4">Vreau sa fiu
                contactat</button>
            </div>

          </div>
        </section>
      </template>



      <footer :class="[isLastStep || isFirstStep ? 'justify-center' : 'justify-between']"
        class="flex flex-row-reverse gap-2 mt-5 w-full">
        <button v-if="!isLastStep" :disabled=!isPhoneModelFound
          class="bg-blue-100 px-12 py-3 rounded-md  text-blue-500 disabled:opacity-50 font-bold"
          @click.prevent="nextStep">
          Next &gt;
        </button>
        <button v-if="!isFirstStep" class="text-neutral-500" @click.prevent="prevStep">
          &lt; Previous
        </button>
      </footer>

      <FirstScreenFooter :isPhoneModelFound="isPhoneModelFound" v-if="isFirstStep" />

    </form>

    <section v-if="submitted" class="justify-center	text-center">
      <!-- <img src="/src/assets/img/check.png" class="w-16 mx-auto mb-16" alt=""> -->
      <h3 class="font-bold text-black text-4xl justify-self-center after:content-['🎉'] -mr-2 mb-4">Felicitări!</h3>
      <p class="text-slate-600 font-bold	text-xl justify-self-center mb-8">Ai încheiat cu succes procesul de evaluare al telefonului tău.</p>
      <p class="text-slate-400 text-lg">Vei fi contactat telefonic și prin email în cel mai scurt timp de echipa noastră.</p>
      <p class="text-slate-400 text-lg">În București poți veni în unul din <a href="https://mobileexpert.ro/contact/">📍magazinele noastre</a> pentru o evaluare pe loc.</p>
    </section>
    <!-- ⚠️db preview  -->
    <!-- <pre>❌{{ currentPhoneData }}❌</pre>
    <pre>❌{{ invalids }}❌</pre>
    <pre>current fields: {{ steps[currentStep] }} 👈</pre>
    <pre>{{ fields }}</pre> -->
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
