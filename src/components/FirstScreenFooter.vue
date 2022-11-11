<script setup lang="ts">
import { ref } from 'vue';
defineProps<{
  // modelValue: any
  isPhoneModelFound: boolean //red
}>();

const questions = ref([
  {
    "title": "De aș alege programul Buy-back MobileExpert?",
    "expanded": false,
    "description": "Dacă telefonul tău se numără printre modelele pe care le căutăm în acel moment, ai tras lozul câștigător. Ți-l cumpărăm pe loc, iar tu scapi de chinul postării anunțurilor și conversațiilor inutile. Pe scurt, scapi de toate bătăile de cap și câștigi timp și bani."
  }, {
    "title": "Cum calculati prețul?",
    "expanded": false,
    "description": "Îți garantăm o evaluare corectă a telefonului tău. Ținem cont de valoarea reală a telefonului și de starea produsului din momentul vânzării. Cu cât îți înlocuiești mai repede telefonul, cu atât ai mai multe șanse să recuperezi mai mulți bani din investiția inițială."
  }, {
    "title": "Ce se întamplă dacă MobileExpert refuză telefonul?",
    "expanded": false,
    "description": "Dacă evaluarea ta nu se potrivește cu a noastră, nu pierzi nimic. Primești telefonul înapoi, fără nicio întrebare. În plus, la prima ofertă refuzată, noi plătim atât evaluarea telefonului, cât și transportul coletului dus-întors."
  }, {
    "title": "Colectați și telefone foarte vechi?",
    "expanded": false,
    "description": "Dacă te afli în posesia unui telefon depășit din toate punctele de vedere, tot poți să câștigi ceva important. Îți colectăm telefonul, indiferent de model sau an, și ne asigurăm că este reciclat corespunzător. Tu câștigi spațiu în sertar, o sumă simbolică, dar mai ales titlul de membru responsabil al societății noastre."
  }
])

const imgPath = ref('')

if(import.meta.env.PROD){
  imgPath.value = '/wp-content/plugins/wp-vue-customBuyBackModule/'
} else if (import.meta.env.DEV) {
  imgPath.value = '/src/assets/img/'
}


</script>

<!-- import prop isModelFound -->
<!-- :class="[ isPhoneModelFound ? 'hidden' : 'block']"  -->

<template>
  <!-- <div v-cloak :class="[isPhoneModelFound ? 'hidden' : 'block']" class="text-center text-neutral-400 mt-8">
    Dacă modelul tău <b>nu</b> se află în listă, <a style="color: #3b82f6" href="/contact">contacteaza-ne</a> pentru o evaluare.
  </div> -->
  <section class="flex text-center flex-col sm:flex-row gap-6 sm:gap-0 mt-20 sm:mt-40">
    <div class="flex flex-col items-center px-4 flex-1"><img class="h-16" :src="imgPath + 'cumparam-orice-telefon.png'">
      <h3 class="text-lg font-bold mb-2 leading-tight">Cumpărăm orice* model</h3>
      <p class="text-sm">Cumpărăm telefoane folosite, noi sau vechi, cu probleme sau in stare impecabila - aproape orice
        model. </p>
    </div>
    <div class="flex flex-col items-center px-4 flex-1"><img class="h-16" :src="imgPath + 'primesti-banii-instant.png'">
      <h3 class="text-lg font-bold mb-2 leading-tight">Primesti banii rapid în cont</h3>
      <p class="text-sm">După ce verificăm telefonul, îți trimitem oferta finală, iar tu primești banii direct în
        contul tău bancar - în cel mai scurt timp posibil.</p>
    </div>
    <div class="flex flex-col items-center px-4 flex-1"><img class="h-16" :src="imgPath + 'ajuti-planeta.png'">
      <h3 class="text-lg font-bold mb-2 leading-tight">Refolosind ajuti planeta</h3>
      <p class="text-sm">Ceea ce pentru tine înseamnă un telefon vechi, pentru altcineva poate fi o bucurie. În
        plus, refolosind resurse ajutam planeta.</p>
    </div>
  </section>
  <section class="mt-32 mb-32">
    <h2 class=" text-center font-bold text-black text-3xl justify-self-center mb-16">Intrebări frecvente</h2>

    <div v-for="(question, index)  of questions" :key="question.title">
      <div class="title flex justify-between border border-slate-200 text-lg border-1 px-4 py-3"
        :class="{ 'rounded-t-xl': index == 0, 'rounded-b-xl': (index == questions.length - 1) && !question.expanded }"
        @click="question.expanded = !question.expanded">
        <div>
          <b>{{ question.title }}</b>
        </div>
        <div class="flex items-center" :class="{ 'rotate-180': question.expanded }">
          <svg class="h-3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
            id="Layer_1" x="0px" y="0px" viewBox="0 0 407.436 407.436"
            style="enable-background:new 0 0 407.436 407.436;" xml:space="preserve">
            <polygon
              points="203.718,91.567 0,294.621 21.179,315.869 203.718,133.924 386.258,315.869 407.436,294.621 " />
          </svg>
        </div>
      </div>
      <div class="description px-4 pt-4 pb-6 bg-blue-50 border-x	border-slate-200" :class="{ 'rounded-b-xl' : (index == questions.length - 1)}" v-if="question.expanded">
        {{ question.description }}
      </div>
    </div>



    <!-- <details>
      <summary class="border border-neutral-300 p-4 rounded-xl">
        <h2 class="inline font-bold">De ce as alege programul Buy-back Mobile expert</h2>
      </summary>
      <div>
        <p>For starters, you might like to add a background color to your summary element, and then a border of the same
          color around the entirety of everything else. This ties the contents together, visually.</p>
        <p>In order to get a border around the entirety of your non-summary content, put it all in a div (or some other
          containing element you deem appropriate):</p>

        <pre><code>&lt;details&gt;
  &lt;summary&gt;
    &lt;h3&gt;Here is your summary content&lt;/h3&gt;
  &lt;/summary&gt;
  &lt;div&gt;
    &lt;p&gt;We've put all our other content in a containing div.&lt;/p&gt;
    &lt;p&gt;This way, we can put a border around (or otherwise style) this container.&lt;/p&gt;
  &lt;/div&gt;
&lt;/details&gt;</code></pre>

      </div>
    </details> -->

  </section>
</template>

<style scoped>

</style>
