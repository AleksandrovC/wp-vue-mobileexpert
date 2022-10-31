<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
// import HelloWorld from "./components/HelloWorld.vue";
// import FirstStepHeader from "./components/FirstStepHeader.vue"
// import FirstStepFooter from "./components/FirstStepFooter"

// import { Form, Field, ErrorMessage } from 'vee-validate';
// import * as yup from 'yup';
import { ref, reactive, computed } from 'vue';


const currentStep = ref(0);


// // Each step should have its own validation schema
// const schemas = [
//   yup.object({
//     phoneChoice: yup.string().required(),
//   }),
//   yup.object({
//     color: yup.string().required(),
//     // password: yup.string().required().min(6),
//     // confirmPassword: yup
//     //   .string()
//     //   .required()
//     //   .min(6)
//     //   .oneOf([yup.ref('password')], 'Passwords must match'),
//   }),
//   yup.object({
//     address: yup.string().required(),
//     postalCode: yup
//       .string()
//       .required()
//       .matches(/^[0-9]+$/, 'Must be numeric'),
//   }),
//   yup.object({
//     terms: yup.bool().required().equals([true]),
//     name: yup.string().required(),
//     email: yup.string().required().email(),
//   }),
// ];

const fields = {
    name: {
      label: "Name",
      value: "",
    },
    email: {
      label: "Email",
      value: "",
    },
  }

  const steps = {
    steps: [
    ["name", "email"],
    ["address", "city", "state", "zip"],
    ["donationAmount"]
  ]
  }

// const currentSchema = computed(() => {
//   return schemas[currentStep.value];
//   // console.log(currentStep.value);
// });

// function nextStep(values: any) {
//   if (currentStep.value === 3) {
//     console.log('Done: ', JSON.stringify(values, null, 2));
//     return;
//   }
//   console.log(currentStep)
//   currentStep.value++;
// }

// function prevStep() {
//   if (currentStep.value <= 0) {
//     return;
//   }

//   currentStep.value--;
// }
</script>

<template>
  <div class="grid max-w-5xl">
    <Form  v-slot="{ handleSubmit, values }">
      <template v-if="currentStep === 0">

        <section class="flex flex-col items-center">
          <h1 class="text-slate-600	text-2xl justify-self-center">Buy-Back Program</h1>
          <h2 class="font-bold text-4xl justify-self-center">Află instant cât valorează telefonul tău</h2>
          <p class="text-slate-400 text-lg">
            Introdu modelul telefonului și completează informațiile despre starea lui.
          </p>
          <p class="text-slate-400 text-lg">
            Iți vom afișa ⚡ instant prețul de vânzare!
          </p>
        </section>

        <!-- <section class="flex flex-col items-center my-20"> -->
        <label hidden for="phoneChoice">Choose a flavor:</label>
        <Field list="phone-models" placeholder="Introdu modelul telefonului tau - Exemplu: S7 Edge" id="phoneChoice"
          name="phoneChoice" class="px-6 border border-slate-500 rounded-full py-3 min-w-[75%]" />
        <datalist id="phone-models">
          <option value="iPhone XR" />
          <option value="iPhone SE 2022" />
          <option value="iPhone SE 2018" />
          <option value="Strawberry" />
          <option value="Vanilla" />
          <option value="iPhone XR" />
          <option value="iPhone SE 2022" />
          <option value="iPhone SE 2018" />
          <option value="Strawberry" />
          <option value="Vanilla" />
          <option value="iPhone XR" />
          <option value="iPhone SE 2022" />
          <option value="iPhone SE 2018" />
          <option value="Strawberry" />
          <option value="Vanilla" />
        </datalist>
        <ErrorMessage name="phoneChoice" />
        <!-- </section> -->

        <section class="flex text-center">
          <div class="flex flex-col items-center px-4"><img class="h-16"
              src='src/assets/img/cumparam-orice-telefon.png'>
            <h3 class="text-lg font-bold mb-2">Cumpărăm majoritatea modelelor</h3>
            <p class="text-sm">Cumpărăm telefoane folosite, noi sau vechi, cu probleme sau in stare impecabila, de la o
              gamă variată de
              branduri. </p>
          </div>
          <div class="flex flex-col items-center px-4"><img class="h-16"
              src='src/assets/img/primesti-banii-instant.png'>
            <h3 class="text-lg font-bold mb-2">Primesti banii rapid în cont</h3>
            <p class="text-sm">După ce verificăm telefonul, îți trimitem oferta finală, iar tu primești banii direct în
              contul tău bancar - în cel mai scurt timp posibil.</p>
          </div>
          <div class="flex flex-col items-center px-4"><img class="h-16" src='src/assets/img/ajuti-planeta.png'>
            <h3 class="text-lg font-bold mb-2">Refolosind ajuti planeta</h3>
            <p class="text-sm">Ceea ce pentru tine înseamnă un telefon vechi, pentru altcineva poate fi o bucurie. În
              plus, refolosind resurse ajutam planeta.</p>
          </div>
        </section>
      </template>

      <template v-if="currentStep === 1">
        <!-- <label for="password">Password</label>
        <Field name="password" type="password" id="password" />
        <ErrorMessage name="password" /> -->

        <!-- <Field name="color" type="radio" value="" /> Rosu -->

        <Field v-slot="{ field }" name="color" type="radio" value="rosu">
          <label>
            <input type="radio" name="color" v-bind="field" value="rosu" />
            Rosu
          </label>
        </Field>
        <Field name="color" type="radio" value="Tea" /> Verde
        <Field name="color" type="radio" value="Coffee" /> Albastru

        <ErrorMessage name="color" />
      </template>

      <template v-if="currentStep === 2">
        <label for="address">Address</label>
        <Field as="textarea" name="address" id="address" />
        <ErrorMessage name="address" />

        <label for="postalCode">Postal Code</label>
        <Field name="postalCode" id="postalCode" />
        <ErrorMessage name="postalCode" />
      </template>

      <template v-if="currentStep === 3">
        <label for="terms">Agree to terms and conditions</label>
        <Field name="terms" type="checkbox" id="terms" :value="true" />
        <ErrorMessage name="terms" />

        <label for="name">Name</label>
        <Field name="name" id="name" />
        <ErrorMessage name="name" />

        <label for="email">Email</label>
        <Field name="email" id="email" type="email" />
        <ErrorMessage name="email" />
      </template>

      <button v-if="currentStep !== 0" type="button" @click="prevStep">
        Previous
      </button>

      <button v-if="currentStep !== 3" type="submit">Next</button>

      <button v-if="currentStep === 3" type="submit">Finish</button>

      <pre>{{ values }}</pre>
      <pre>{{ currentStep }}</pre>
    </Form>
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
