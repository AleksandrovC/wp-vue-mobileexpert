<script setup lang="ts">
defineProps<{
  // modelValue: any
  isPhoneModelFound: boolean //red
}>();
</script>

<!-- import prop isModelFound -->
<!-- :class="[ isPhoneModelFound ? 'hidden' : 'block']"  -->

<template>
  <div v-cloak :class="[ isPhoneModelFound ? 'hidden' : 'block']"
  class="text-center text-neutral-400 mt-8">
  <!-- {{isPhoneModelFound}} -->
  Dacă modelul tău nu se află în listă, <a href="#">contacteaza-ne</a> pentru o evaluare.
  </div>
  <section class="flex text-center flex-col sm:flex-row gap-6 sm:gap-0 mt-20 sm:mt-40">
    <div class="flex flex-col items-center px-4"><img class="h-16" src='src/assets/img/cumparam-orice-telefon.png'>
      <h3 class="text-lg font-bold mb-2 leading-tight">Cumpărăm *orice modelel</h3>
      <p class="text-sm">Cumpărăm telefoane folosite, noi sau vechi, cu probleme sau in stare impecabila - aproape orice
        model. </p>
    </div>
    <div class="flex flex-col items-center px-4"><img class="h-16" src='src/assets/img/primesti-banii-instant.png'>
      <h3 class="text-lg font-bold mb-2 leading-tight">Primesti banii rapid în cont</h3>
      <p class="text-sm">După ce verificăm telefonul, îți trimitem oferta finală, iar tu primești banii direct în
        contul tău bancar - în cel mai scurt timp posibil.</p>
    </div>
    <div class="flex flex-col items-center px-4"><img class="h-16" src='src/assets/img/ajuti-planeta.png'>
      <h3 class="text-lg font-bold mb-2 leading-tight">Refolosind ajuti planeta</h3>
      <p class="text-sm">Ceea ce pentru tine înseamnă un telefon vechi, pentru altcineva poate fi o bucurie. În
        plus, refolosind resurse ajutam planeta.</p>
    </div>
  </section>
  <section class="mt-24">
    <h2 class=" text-center font-bold text-black text-3xl justify-self-center">Intrebari frecvente</h2>

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
