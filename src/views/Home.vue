<template>
    <div class="page">
        <Whatsapp
          background="#F54747"
          phone-number="0646898375"
        />

        <h1 class="title">
            Top kwaliteits garagedeuren
        </h1>

        <h3 class="subtitle">
            Bestel nu makkelijk online
        </h3>

        <div class="products">
            <DoorType
                v-for="door in doors"
                :key="door.id"
                :name="door.doorName"
                :price="915"
                :image="door.doorName + ' deur foto'"
                link="./#/order?door=London"
            />
        </div>

        <WaveEdge  amplitude="15"/>
        <div class="wide-banner">
          <div style="max-width: 500px">
            <h3>Een garagedeur met een persoonlijke signatuur</h3>
            <p>
              Is Uw huis prachtig maar mist hij wellicht de finishing touch van een fraaie en praktische
              garagedeur?
            </p>

            <p>
              Zoekt U een betrouwbaar en duurzaam product, dat eenvoudig en veilig
              kan worden bediend?
            </p>

            <p>
              Maar vooral ook een garagedeur die gemaakt is op basis van
              uw persoonlijke wensen en volledig in harmonie is met uw woning?
            </p>

            <p>
              Wij hebben de deur voor U!
            </p>
          </div>
          <div>
            <img src="@/assets/doors/door1.png" alt="door 1" style="left: -10px; transform: rotate(5deg);" />
            <img src="@/assets/doors/door2.png" alt="door 2" style="top: -28px; left: 41px; transform: rotate(-10deg);" />
          </div>
        </div>
      <WaveEdge orientation="bottom" amplitude="15"/>

        <div class="half-grid">
          <div class="grid-item">
            <div class="grid-item-title">Vingerklembeveiliging</div>
            <div class="grid-item-content">
              Alle deuren in ons programma
              hebben standaard vingerklem-
              beveiliging. Een wettelijk verplichte
              beveiliging, die voorkomt dat uw
              vingers bij het openen
              en sluiten van de deur, beklemd
              kunnen raken tussen de panelen.
            </div>
          </div>

          <div class="grid-item">
            <div class="grid-item-title">Veerbreukbeveiliging</div>
            <div class="grid-item-content">
              Onze deuren zijn standaard uitgerust met de wettelijk
              verplichte veerbreukbeveiliging. Deze zorgt ervoor dat de
              deur zich in onvoorziene situaties niet plotseling sluit,
              waardoor onveilige situaties en schade zouden kunnen
              optreden.
            </div>
          </div>

          <div class="grid-item">
            <div class="grid-item-title">Inbraakbeveiliging</div>
            <div class="grid-item-content">
              Woninginbraak is helaas aan de orde van de dag.
              Het is dus belangrijk dat uw garagedeur goed beveiligd
              is. De afsluitingen op onze garagedeuren kunnen,
              als optie worden geleverd met een SKG keurmerk.
              Het SKG-keurmerk is een belangrijk beveiligings-
              onderdeel van het Politiekeurmerk Veilig Wonen®.
            </div>
          </div>

          <div class="grid-item">
            <div class="grid-item-title">Optilbeveiliging</div>
            <div class="grid-item-content">
              Indien uw garagedeur wordt voorzien van een bediening
              met elektrische motor, beschikt u automatisch over een
              optilbeveiliging. De motor beschermt uw deur tegen
              optillen door tegendruk op te bouwen wanneer iemand
              de deur met de hand wil openen.
            </div>
          </div>

          <div class="grid-item">
            <div class="grid-item-title">Onderloop- en obstakelbeveiliging</div>
            <div class="grid-item-content">
              Onze elektrisch bediende garagedeuren beschikken
              standaard over een krachtbegrenzing. Deze zorgt dat de
              deur bij geringe tegendruk, van bijvoorbeeld uw kind of
              uw auto, direct automatisch weer omhoog gaat.
            </div>
          </div>
        </div>

      <WaveEdge  amplitude="15" />
      <div class="wide-banner" style="margin-bottom: -20px; padding-bottom: 50px">
        <div class="banner-title" style="max-width: 500px">Rhino doors<hr /></div>
        <span></span>

        <div style="max-width: 500px">
          <div class="checkmark-item"><span class="checkmark-circle"></span>Uitstekende kwaliteit</div>
          <div class="checkmark-item"><span class="checkmark-circle"></span>Jong, fris en innovatief bedrijf</div>
          <div class="checkmark-item"><span class="checkmark-circle"></span>Maatwerk mogelijk, wij denken graag met u mee!</div>
        </div>

        <img src="@/assets/doors/door3.png" alt="door" style="top: -75px; left: 20px">
      </div>
    </div>
</template>

<script>
// Import components
import DoorType from "../components/DoorType.vue"; 
import Whatsapp from "../components/whatsapp.vue";
import London from "../assets/doors/london.jpg";
import WaveEdge from "@/components/WaveEdge";

// Import services
import apiService from "../services/api.service"

export default {
    components: {
        DoorType: DoorType,
        Whatsapp: Whatsapp,
        WaveEdge: WaveEdge
    },

    data() {
        return {
            images: {
                London: London
            },

            doors: []
        };
    },

    async mounted() {
      // Retrieve all of the doors
      const doors = await apiService.getAllDoors();
      const doorsBody = JSON.parse(await doors.text());

      console.log(doorsBody)

      // Save them in the state
      this.doors = doorsBody;
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/color-sceme.scss";
@import "../styles/styles.scss";

.page {
    min-height: calc(100vh - 215px);
    color: black;

    .title {
      margin-top: 150px;
    }

    .subtitle {
      margin-bottom: 150px;
    }

    .products {
        margin-top: 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 50px;
    }

    .wide-banner {
      background: $very-light-color;
      padding: 20px 80px;

      display: grid;
      grid-template-columns: 2fr 1fr;
      column-gap: 50px;
      padding-top: 100px;
      text-align: left;

      .banner-title {
        font-size: 20px;
        font-weight: bold;
        color: $main-color;
      }

      h3 {
        color: $main-color;
        border-bottom: 2px solid $main-color;
      }

      img {
        border: 10px solid white;
        border-radius: 10px;
        position: relative;
        box-shadow: 0 0 17px 10px #686868AB;

        width: 300px;
      }
    }
}
</style>