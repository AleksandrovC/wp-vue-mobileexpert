<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import ProgressIndicator from "./components/ProgressIndicator.vue";
import FirstScreenHeader from "./components/FirstScreenHeader.vue";
import FirstScreenFooter from "./components/FirstScreenFooter.vue";
import RadioButton from "./components/RadioButton.vue"
import { ref, reactive, computed, nextTick, onBeforeMount, onMounted } from 'vue';
import CheckboxButton from "./components/CheckboxButton.vue";


let allPhonesData: any = ref()
const phoneNames = ref()
const isMobileResolution = ref(false)
const fetchMessageResult = ref({ "message": "", "status": "" })
const fetchMessageError = ref()
const h2title = ref<HTMLElement | null>(null)


onBeforeMount(async () => {
  let jsonAddress = ""


  //on DEV json path points to /public/json, on PROD to /dist/json
  if (import.meta.env.PROD) {
    // jsonAddress = "/buy-back/json/phone-models.json"
    jsonAddress = "/wp-content/plugins/wp-vue-customBuyBackModule/json/phone-models.json"
  } else if (import.meta.env.DEV) {
    jsonAddress = "/json/phone-models.json"
  }
  const response = await fetch(jsonAddress)
  allPhonesData.value = await response.json()


  phoneNames.value = Object.keys(allPhonesData.value)
});
if (window.innerWidth < 600) {
  isMobileResolution.value = true
}

const currentStep = ref(0)

const currentPhoneData: any = ref({});
const customerData: any = ref({})


const isPhoneModelFound = computed(() => {

  if (!allPhonesData.value) {

    return false

  } else {
    if (phoneNames.value.includes(fields.value.phoneModel.value)) {

      let currentPhoneName = fields.value.phoneModel.value
      currentPhoneData.value = allPhonesData.value[currentPhoneName]

      let defaultColor: any = Object.keys(currentPhoneData.value.custom_Colors)[0]
      fields.value.color.value = defaultColor


      return true
    } else {
      currentStep.value = 0
      return false
    }
  }

  // return phoneNames.includes(fields.value.phoneModel.value) 


})

const isInvalid = computed(() => {
  return !!Object.values(invalids.value).filter((key) => key).length;

})

const mainInputPlaceholder = computed(() => {
  if (isMobileResolution.value == false) {
    return 'Introdu modelul telefonului tau - Exemplu: Samsung S22'
  } else if (isMobileResolution.value) {
    return 'Introdu modelul telefonului'
  }
})

const invalids: any = ref({})

const fields: any = ref({
  phoneModel: {
    label: "model telefon",
    type: "search",
    placeholder: "Introdu modelul telefonului tau - Exemplu: Samsung S22",
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
    label: "Este blocat în reațea?",
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
      },
      {
        message: "Adresa email invalida",
        test: (value: string) => (/^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))

      },
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

const isSubmitted = ref(false)


const currentFields: any = computed(() => {
  return steps[currentStep.value]
})

const phonePictureUrl = computed(() => {
  let selectedColor = currentPhoneData.value.custom_Colors[fields.value.color.value].phoneImg
  if (import.meta.env.PROD) {
    return new URL('/wp-content/plugins/wp-vue-customBuyBackModule/phones-img/' + selectedColor, import.meta.url).href

  }

  if (import.meta.env.DEV) {
    return new URL(`/src/assets/img/phones-img/${selectedColor}`, import.meta.url).href
  }
  // return new URL(`../public/assets/phones-img/${selectedColor}`, import.meta.url).href

  // '/src/assets/img/phones-img/' + selectedColor
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

const estimatedValue: any = ref();
const phoneReview: any = ref()

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


  phoneReview.value["Estimated Price"] = Object.values(phoneReview.value).reduce((a: any, b: any) => a + b, 0)



  return estimatedValue.value = phoneReview.value["Estimated Price"]

}


function validate() {
  invalids.value = {};
  // validates all the fields on the current page

  currentFields.value.forEach((key: number) => {
    validateField(key);
  });
}

function validateField(fieldKey: any) {
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


  customerData.value = {
    "name": fields.value.name.value,
    "telefon": fields.value.phone.value,
    "email": fields.value.email.value
  }


  let phoneReviewParsed: any = JSON
    .stringify(phoneReview.value, null, "\t")
    .replaceAll(
      "],\n\t\"",
      "],\n\n\t\""
    );


  // let phoneReviewParsed :any =  JSON.stringify( phoneReview.value, null, '&nbsp;' ).split( '\n' ).join( '<br>' );


  var formdata = new FormData();
  formdata.append("your-name", fields.value.name.value);
  formdata.append("your-phone", fields.value.phone.value)
  formdata.append("your-email", fields.value.email.value);
  formdata.append("your-subject", fields.value.phoneModel.value);

  formdata.append("your-message", phoneReviewParsed)

  let requestOptions: any = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("https://mobileexpert.ro/wp-json/contact-form-7/v1/contact-forms/17895/feedback", requestOptions)
    .then(response => response.text())
    .then(result => fetchMessageResult.value = JSON.parse(result))
    .catch(error => fetchMessageError.value = JSON.parse(error))
    .finally(() => {
      if (fetchMessageResult.value.status == "mail_sent") {
        isSubmitted.value = true
      }
    })
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

  if (fields.value.accesories.value.includes(checked)) {
    return fields.value.accesories.value = fields.value.accesories.value.filter((v: string) => v !== checked);
  }

  return fields.value.accesories.value = [...fields.value.accesories.value, checked]
}

function flushQueue() {
 return new Promise((resolve) => setTimeout(resolve, 100));
}

async function nextStep(values: any) {
  // if validate

  validate();
  if (isInvalid.value) return;

  currentStep.value++;

  if (isLastStep.value) {
    estimateValue()
    return;
  }
  await flushQueue()
  if (h2title.value) {
    // await nextTick()
    h2title.value.scrollIntoView({ behavior: "smooth", block: "start" })

  }
}

async function prevStep() {
  if (isFirstStep.value) {
    return;
  }
  currentStep.value--;

  await flushQueue()
  if (h2title.value) {
    // console.log(h2title.value)
    h2title.value?.scrollIntoView({ behavior: "smooth", block: "start" })

  }
}



</script>

<template>
  <div id="multi-step-form" class="grid w-full max-w-5xl justify-self-center">
    <form v-if="!isSubmitted" class="sm:p-10" @submit.prevent="">


      <div v-show="!isFirstStep" class="mb-2">
        <h1 class="text-neutral-500">Oferta Buy-back</h1>
        <h2 ref="h2title" class="text-[2em] font-bold">{{ fields.phoneModel.value }}</h2>

      </div>

      <ProgressIndicator v-if="!isFirstStep" :total-steps="totalSteps" :current-step="currentStep" class="mb-12" />


      <template v-if="isFirstStep">
        <FirstScreenHeader />

        <input style="font-size: 1rem; border-color: rgb(96 165 250) !important; color: black !important;"
          class="w-full border rounded-full border-blue-400 px-6 py-2 bg-blue-50"
          :class="{ 'font-bold': isPhoneModelFound }" :placeholder="mainInputPlaceholder" type="search"
          v-model="fields.phoneModel.value" list="data" />

        <datalist v-if="!isPhoneModelFound" id="data">
          <option v-for="phoneName in phoneNames" :value="phoneName"></option>
        </datalist>
        <div v-cloak :class="[isPhoneModelFound ? 'opacity-0	pointer-events-none' : 'opacity-100 pointer-events-auto']"
          class="text-center text-slate-400 mt-2 text-sm">
          Dacă modelul tău <b>nu</b> se află în listă, <a style="color: #3b82f6" href="/contact">contacteaza-ne</a>
          pentru o evaluare.
        </div>
      </template>

      <template v-if="currentStep === 1">
        <div class="flex flex-col md:flex-row">
          <div class="mr-10 flex justify-center min-w-[15rem] min-h-[15rem]">
            <img :src="phonePictureUrl" class="h-60 max-w-fit" alt="">
          </div>
          <div>
            <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
              <h3 class="font-bold text-xl mb-4">Culoarea telefonului tau</h3>

              <div class="flex flex-wrap gap-2">
                <RadioButton v-for="(color, key, i) in currentPhoneData.custom_Colors" v-model="fields.color.value"
                  radioGroupName="color" :radioBtnName="key.toString()" @change="validateField('color')">
                  <section class="grid items-center justify-center">
                    <div class="rounded-full mt-2 relative h-8 w-8" :style="{ backgroundColor: color.hex }">
                      <div
                        class="rounded-full absolute h-8 w-8  bg-gradient-to-t from-black/20 via-black/10 to-black/0">
                      </div>
                      <div class="rounded-full absolute h-8 w-8 mix-blend-color-dodge"></div>
                    </div>
                    <h4 class=" !mb-[0rem] -mx-8 mt-1 text-slate-600 !text-[0.75rem] !font-[400] text-center">{{ key }}
                    </h4>
                  </section>
                </RadioButton>

              </div>
              <section v-if="invalids.color" class="text-red-500 text-sm">{{ invalids.color }}</section>
            </section>
            <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
              <h3 class="inline-flex font-bold text-xl mb-4">Capacitate</h3>
              <div
                class="bg-blue-100 group ml-2 relative inline-flex text-sm  rounded-full text-blue-500 h-6 w-6 items-center justify-center cursor-pointer">
                ?
                <span style="border-color:rgb(191 219 254) !important; font-size: 0.875rem !important;"
                  class="invisible group-hover:visible absolute bg-white text-blue-500 border border-blue-200 text-sm px-2 py-2 rounded-xl z-10 w-72 sm:w-96 sm:-left-12 -left-28 ">iPhone:
                  Setari
                  &gt; General &gt; Informatii <br> <br>
                  Samsung, Huawei sau Xiaomi: Setari &gt; Despre telefon</span>
              </div>
              <div class="flex flex-wrap gap-2">


                <RadioButton v-for="(storage, key, i) in currentPhoneData.custom_StoragePriceModifiers"
                  @change="validateField('storageCapacity')" v-model="fields.storageCapacity.value"
                  radioGroupName="storageCapacity" :radioBtnName="key.toString()">
                  <span class="uppercase">{{ key.toString() }}</span>
                </RadioButton>

              </div>
              <section v-if="invalids.storageCapacity" class="text-red-500 text-sm">{{ invalids.storageCapacity }}
              </section>
            </section>
            <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
              <h3 class="font-bold inline-flex text-xl mb-4">Este blocat în rețea?</h3>
              <div
                class="bg-blue-100 group ml-2 relative inline-flex text-sm  rounded-full text-blue-500 h-6 w-6 items-center justify-center cursor-pointer">
                ?
                <span style="border-color:rgb(191 219 254) !important; font-size: 0.875rem !important;"
                  class="invisible group-hover:visible absolute bg-white text-blue-500 border border-blue-200 text-sm px-2 py-2 rounded-xl z-10 w-72 sm:w-96 -top-32 sm:-top-16 -right-14 sm:-left-12 ">
                  <p class="mb-1">Orange
                    și Vodafone, blochează unele telefoane în rețeaua operatorului. </p>
                  <p class="mb-1"> Daca l-ai achiziționat din
                    magazin: Altex, iStyle EvoMag, eMag , etc. - atunci este deblocat.</p>
                  <p class="mb-1">Telekom sau Digi nu blochează
                    telefoanele.</p>
                </span>
              </div>
              <div class="flex flex-wrap gap-2">



                <RadioButton v-for="(restrictions, key, i)  in currentPhoneData.networkRestrictionsPriceModifiers"
                  @change="validateField('networkRestrictions')" v-model="fields.networkRestrictions.value"
                  radioGroupName="networkRestrictions" :radioBtnName="key.toString()">
                  <span class="capitalize">{{ key.toString() }}</span>
                </RadioButton>

              </div>
              <section v-if="invalids.networkRestrictions" class="text-red-500 text-sm">{{ invalids.networkRestrictions
              }}
              </section>

            </section>
          </div>
        </div>
      </template>

      <template v-if="currentStep === 2">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <h3 class="font-bold text-xl mb-4">Starea ecranului</h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">

            <RadioButton v-model="fields.displayState.value" radioGroupName="displayState" radioBtnName="4/4"
              :colorClasses="'from-red-500 to-red-800'">
              <div class="flex flex-col">
                <span class="font-bold">Ca nou</span>
                <span class="text-slate-500">Stare perfectă fără defecte, zgârieturi, fisuri</span>
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
          <section v-if="invalids.displayState" class="text-red-500 text-sm">{{ invalids.displayState }}
          </section>
        </section>
      </template>

      <template v-if="currentStep === 3">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <h3 class="font-bold text-xl mb-4">Starea spatelui telefonului</h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">

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
          <section v-if="invalids.backCaseState" class="text-red-500 text-sm">{{ invalids.backCaseState }}
          </section>
        </section>
      </template>

      <template v-if="currentStep === 4">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <h3 class="font-bold text-xl mb-4">Starea lateralelor</h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">

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
          <section v-if="invalids.lateralCaseState" class="text-red-500 text-sm">{{ invalids.lateralCaseState }}
          </section>
        </section>
      </template>

      <template v-if="currentStep === 5">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <h3 class="font-bold text-xl mb-4">Alte defecțiuni</h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="noProblems"
              :checkedState="fields.otherProblems.value.includes('noProblems')">
              <div class="flex flex-col">
                <span class="font-bold">Nicio problema</span>
                <span class="text-slate-500">Ca nou, stare excelenta</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="speakerProblem"
              :checkedState="fields.otherProblems.value.includes('speakerProblem')">
              <div class="flex flex-col">
                <span class="font-bold">Se aude încet/înfundat</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="frontCam/BackCamProblem"
              :checkedState="fields.otherProblems.value.includes('frontCam/BackCamProblem')">
              <div class="flex flex-col">
                <span class="font-bold">Probleme cameră față/spate</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="batteryProblem"
              :checkedState="fields.otherProblems.value.includes('batteryProblem')">
              <div class="flex flex-col">
                <span class="font-bold">Baterie uzată</span>
                <span class="text-slate-500">Se descarcă rapid. iPhone cu nivel baterie sub 80% health</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="fingerprint/FaceIdProblem"
              :checkedState="fields.otherProblems.value.includes('fingerprint/FaceIdProblem')">
              <div class="flex flex-col">
                <span class="font-bold">Probleme senzor amprenta/Face ID</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="wasRepairedBefore"
              :checkedState="fields.otherProblems.value.includes('wasRepairedBefore')">
              <div class="flex flex-col">
                <span class="font-bold">A fost reparat în garanție/contra cost</span>
                <span class="text-slate-500">A avut o reparatie realizată, schimbat ecran, baterie, etc.
                  Dețin fișa de service</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateProblemsCheckbox" radioBtnName="otherProblems"
              :checkedState="fields.otherProblems.value.includes('otherProblems')">
              <div class="flex flex-col">
                <span class="font-bold">Alte probleme</span>
                <span class="text-slate-500">Nu pornește, cont iCloud blocat, butoane, porturi nefunctionale,
                  etc.</span>
              </div>
            </CheckboxButton>



          </div>

          <section v-if="invalids.otherProblems" class="text-red-500 text-sm">{{ invalids.otherProblems }}
          </section>
        </section>
      </template>


      <template v-if="currentStep === 6">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">
          <h3 class="font-bold text-xl mb-4">Accesorii si documente disponibile</h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="produsNou"
              :checkedState="fields.accesories.value.includes('produsNou')">
              <div class="flex flex-col">
                <span class="font-bold">Produsul este nou</span>
                <span class="text-slate-500">Arata impecabil, se poate dovedi achiziția
                  în ultimele 14 zile</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="cutieOriginala"
              :checkedState="fields.accesories.value.includes('cutieOriginala')">
              <div class="flex flex-col">
                <span class="font-bold">Cutie</span>
                <span class="text-slate-500">Doar cutia originala, fara alte accesorii</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="toateAcesoriile"
              :checkedState="fields.accesories.value.includes('toateAcesoriile')">
              <div class="flex flex-col">
                <span class="font-bold">Toate acesoriile originale oferite de producător</span>
                <span class="text-slate-500">Încărcător, cablu, căști, ghid utilizare, adaptoare</span>
              </div>
            </CheckboxButton>

            <!-- <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="incarcatorSiCablu"
              :checkedState="fields.accesories.value.includes('incarcatorSiCablu')">
              <div class="flex flex-col">
                <span class="font-bold">Încărcător și cablu original</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton> -->

            <!-- <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="castiOriginale"
              :checkedState="fields.accesories.value.includes('castiOriginale')">
              <div class="flex flex-col">
                <span class="font-bold">Căști originale</span>
                <span class="text-slate-500"></span>
              </div>
            </CheckboxButton> -->

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="factura"
              :checkedState="fields.accesories.value.includes('factura')">
              <div class="flex flex-col">
                <span class="font-bold">Factură</span>
                <span class="text-slate-500">În format printat sau digital transmisibil, pdf,, etc.</span>
              </div>
            </CheckboxButton>

            <CheckboxButton @update-checkbox-input="updateAccesoriesCheckbox" radioBtnName="garantie"
              :checkedState="fields.accesories.value.includes('garantie')">
              <div class="flex flex-col">
                <span class="font-bold">Garanție</span>
                <span class="text-slate-500">În format printat sau digital transmisibil, pdf, etc.</span>
              </div>
            </CheckboxButton>



          </div>
        </section>
      </template>

      <template v-if="currentStep === 7">
        <section class="mb-10 pt-6 pb-10 border-b border-slate-400">

          <div class="grid">

            <h4 class="text-xl font-bold justify-self-center">Valoare estimată</h4>
            <h5 class="text-[3em] font-bold justify-self-center text-green-500 mb-6">{{ estimatedValue }} <span
                class="text-xl">LEI</span></h5>
            <p class="text-center my-2  font-bold text-slate-500">Completează formularul și vei fi contactat pentru a
              finaliza procesul de buy-back.</p>
            <label hiden for="name"></label>
            <section v-if="invalids.name" class="text-red-500 text-sm">{{ invalids.name }}
            </section>
            <input v-model="fields.name.value" id="name" type="text" 
              class="!border-slate-300 !border !px-4 !py-2 !mb-3 !rounded-[0.375rem] !h-[3rem] !text-[1rem]"
              placeholder="Nume si prenume">




            <label hiden for="email"></label>
            <section v-if="invalids.email" class="text-red-500 text-sm">{{ invalids.email }}
            </section>
            <input v-model="fields.email.value" id="email" type="email"
              class="border-slate-300 border  px-4 py-2 mb-3 !rounded-[0.375rem] !h-[3rem] !text-[1rem]" placeholder="Email">




            <label hiden for="phone"></label>
            <section v-if="invalids.phone" class="text-red-500 text-sm">{{ invalids.phone }}
            </section>
            <input v-model="fields.phone.value" id="phone" type="number"
              class="border-slate-300 border px-4 py-2 mb-3 !rounded-[0.375rem] !h-[3rem] !text-[1rem]"
              placeholder="Telefon">
            <p class="text-sm text-center text-slate-500 mb-10">Prin transmiterea datelor personale esti de acord cu <a
                href="/politica-de-confidentialitate/" target="_blank">Politica de Confidențialitate</a> și <a
                href="/termeni-si-conditii/" target="_blank">Termenii și
                Condițiile</a> site-ului.</p>



            <div class="flex flex-col justify-center items-center">
              <!-- {{phoneReview}} -->
              <button @click.prevent="submit()" style="border-color:none !important; padding: 1rem 3.5rem !important;"
                class="bg-green-600 whitespace-nowrap rounded-md text-white font-bold mt-4">Vreau sa fiu
                contactat</button>
              <span class="text-red-500"> {{ fetchMessageResult.message }}</span>
              <!-- {{ fetchMessageResult.status }}
              {{ fetchMessageResult }}
              {{ isSubmitted }} -->
            </div>

          </div>
        </section>
      </template>



      <footer :class="[isLastStep || isFirstStep ? 'justify-center' : 'justify-between']"
        class="flex flex-row-reverse gap-2 mt-5  w-full">

        <button v-if="!isLastStep" :disabled=!isPhoneModelFound
          class="bg-blue-100 px-12 py-[0.75rem] rounded-md border-[#e5e7eb]  text-blue-500 disabled:opacity-50 font-bold"
          @click.prevent="nextStep">
          Continua &gt;
        </button>
        <button v-if="!isFirstStep" class="text-neutral-500 border-[#fff]" @click.prevent="prevStep">
          &lt; Inapoi
        </button>
      </footer>

      <FirstScreenFooter :isPhoneModelFound="isPhoneModelFound" v-if="isFirstStep" />

    </form>

    <section v-if="isSubmitted" class="justify-center	text-center relative">
      <h3 class="font-bold text-black text-4xl justify-self-center after:content-['🎉'] -mr-2 mb-4 mt-[6rem]">
        Felicitări!</h3>
      <!-- {{ fetchMessageResult }}
      {{ fetchMessageError }} -->


      <p class="text-slate-600 font-bold	text-xl justify-self-center mb-8">Ai încheiat cu succes procesul de evaluare al
        telefonului tău.</p>
      <p class="text-slate-400 text-lg mb-0">Vei fi contactat telefonic și prin email în cel mai scurt timp de echipa
        noastră.</p>
      <p class="text-slate-400 text-lg mb-0">În București poți veni în unul din <a
          href="https://mobileexpert.ro/contact/">📍magazinele noastre</a> pentru o evaluare pe loc.</p>

    </section>
    <div v-if="isSubmitted" class="flex flex-col justify-start items-center mt-20">
      <a href="/buy-back" class="px-14 py-4 rounded-md bg-blue-100 text-center text-md">Evalueaza încă un telefon ⟳</a>
    </div>

    <!-- <pre>{{ fields }}</pre> -->

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
