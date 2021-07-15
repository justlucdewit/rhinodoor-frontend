<template>
  <div id="about">
    <WhatsApp
        background="#F54747"
        phone-number="0646898375"
    />

    <!-- banner image -->
    <img class="banner-image" src="@/assets/doors/door4.png" alt="banner image">
    <WaveEdge color="transparent" orientation="bottom" height="-36" amplitude="30"/>

    <!-- half grid -->
    <div class="half-grid">
      <!-- rhino doors -->
      <div class="grid-item">
        <div class="grid-item-title">Rhino doors</div>
        <div class="grid-item-content">
          <p>
            Bij Rhino Garagedeuren in Veghel treft u een jong, fris en vooruitstrevend bedrijf dat u graag helpt met het bepalen van de juiste keuze en wensen voor het vinden van de perfecte garagedeur voor uw situatie. Onze garagedeuren zijn duurzaam, van zeer hoogwaardige kwaliteit, worden volledig naar uw wens samengesteld en zijn vrijwel leverbaar in elke gewenste kleur, model en afmeting. Wij werken uitsluitend met Nederlands fabricaat. Door deze hoogwaardige kwaliteit te combineren met ons vakmanschap kunnen wij u 10 jaar garantie bieden op onze garagedeuren, tot 5 jaar garantie op de accessoires en 1 jaar volledige garantie op de eventuele montage.
          </p>

          <p>
            Door het combineren van vaste maten, maatwerk met zeer aantrekkelijke prijzen is er voor iedereen een geschikte garagedeur te vinden. Mede door de gebruiksvriendelijkheid en het gebruik van de diverse montagehandleidingen en/ of montagevideo´s is het zeer makkelijk om eventueel de gewenste garagedeur in eigen beheer te monteren, maar indien gewenst, monteren wij deze uiteraard voor u. Bent u nieuwsgierig geworden kijk dan even op onze hoofdpagina bij downloads (link naar documentatie/handleidingen/video’s) Onze garagedeuren worden altijd geleverd als complete sets in een makkelijk te vervoeren verpakking.
          </p>

          <p>
            Ons klantenbestand is snel groeiende, bent u geïnteresseerd en enthousiast geworden bekijk dan onze modellen en vraag een uiteraard vrijblijvende offerte aan met behulp van de unieke garagedeur calculator. Mocht u er nou niet helemaal uitkomen met onze calculator aarzel dan niet en neem gerust contact met ons op, wij staan u graag te woord.
          </p>

          <p>
            Kortom, met Rhino Garagedeuren heeft u een uitstekende partner gevonden voor het leveren en monteren van gebruiksvriendelijke, prijsgunstige en kwaliteit garagedeuren uit Nederland.
          </p>

          <p style="font-weight: bold; font-size: x-large;">
            “Your (w)hole solution”
          </p>
        </div>
      </div>

      <div class="grid-item">
        <div class="grid-item-content">
          <img src="@/assets/doors/door7.png" alt="door image" class="framed-image" style="transform: rotate(3deg)" />
          <img src="@/assets/doors/door8.png" alt="door image" class="framed-image" style="left: 80px;bottom: 30px;transform: rotate(-10deg)" />
        </div>
      </div>
    </div>

      <!-- another piece of text -->

    <!-- garage deuren -->

    <!-- projecten -->
  </div>
</template>

<script>
import WaveEdge from "@/components/WaveEdge";
import WhatsApp from "@/components/whatsapp";

export default {
  components: {
    WaveEdge: WaveEdge,
    WhatsApp: WhatsApp
  }
}
</script>

<style scoped lang="scss">
#about {
  .banner-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    object-position: bottom;
    filter: opacity(0.6);
  }
}
</style>