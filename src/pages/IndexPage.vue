<template>
  <q-page style="max-width: 1200px; margin: 0 auto" padding>
    <div class="bg-yellow-9 text-white shadow-2 q-mb-xs">
      <q-toolbar>
        <q-toolbar-title class="white"> Weather App </q-toolbar-title>
        <q-btn
          flat
          round
          icon="search"
          @click="visibleSearch = !visibleSearch"
        />
      </q-toolbar>

      <q-toolbar class="add-city" :class="{ active: visibleSearch }">
        <q-input
          dense
          color="grey-3"
          label-color="white"
          label="Enter city"
          v-model="city"
          @keydown.enter="add"
        />

        <q-btn
          @click="add"
          class="q-ml-xl q-mt-sm"
          dense
          flat
          icon="add"
          color="brown-1"
          >Add</q-btn
        >
      </q-toolbar>
    </div>

    <div class="weather-cards">
      <div
        class="weather-cards__col col-lg-6"
        v-for="ct in cities"
        :key="ct.name"
      >
        <q-card class="weather-card">
          <q-card-section class="text-h6 row justify-between">
            <div class="column">
              <div>
                <span>{{ ct.month }}</span> <span>{{ ct.day }}</span>
              </div>

              <div>
                <span>{{ ct.name }}</span
                >,
                <span>{{ ct.country }}</span>
              </div>
            </div>
            <q-card-actions>
              <q-btn @click="deleteCityCard(ct)" flat style="color: #ff0080"
                >Remove</q-btn
              >
            </q-card-actions>
          </q-card-section>
          <q-card-section class="row items-center justify-between">
            <div class="column text-subtitle2">
              <img class="weather-card__img q-mb-md" src="../assets/sun.png" />
              <span>{{ ct.clouds }}</span>
            </div>

            <div class="column text-h6">
              <div>
                <span>{{ ct.temp }}</span>
                <span> C</span>
              </div>
              <div>
                <span class="text-subtitle2">Feels like: </span>
                <span>{{ ct.feelTemp }}</span
                ><span> C</span>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="row items-center">
            <img
              class="q-mr-md"
              width="20"
              height="20"
              src="../assets/navigation.svg"
              alt=""
              :style="{ transform: 'rotate(' + ct.deg + 'deg)' }"
            />
            <div class="text-h6">{{ ct.wind }} m/s {{ ct.directWind }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const visibleSearch = ref(false);
    let city = ref("");
    let cities = reactive([
      {
        day: 11,
        month: "Apr",
        name: "London",
        country: "GB",
        temp: 24,
        feelTemp: 22,
        clouds: "Overcast clouds",
        wind: 10.3,
        directWind: "E",
        deg: 180,
      },
      {
        day: 11,
        month: "Apr",
        name: "Paris",
        country: "FR",
        temp: 12,
        feelTemp: 10,
        clouds: "Clear",
        wind: 8.5,
        directWind: "W",
        deg: 50,
      },
    ]);

    function add() {
      const newCity = {
        day: 11,
        month: "Apr",
        name: city.value,
        country: "RF",
        temp: 20,
        feelTemp: 19,
        clouds: "Clear",
        wind: 2,
        directWind: "W",
        deg: 160,
      };

      cities.push(newCity);
      city.value = "";
    }

    function deleteCityCard(ct) {
      let idx = cities.indexOf(ct);
      cities.splice(idx, 1);
    }

    return {
      visibleSearch,
      city,
      cities,
      add,
      deleteCityCard,
    };
  },
});
</script>

<style lang="scss">
.add-city {
  max-height: 0;
  opacity: 0;
  transition: all 0.5s;
  padding: 0;

  &.active {
    max-height: 100px;
    opacity: 1;
    padding: 20px 0 5px 20px;
  }
}
.weather-cards {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 -10px;

  &__col {
    flex: 1 1 25%;
    max-width: 25%;
    padding: 10px;
  }
}

.weather-card {
  &__top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__img {
    width: 80px;
    height: auto;
  }
}
</style>
