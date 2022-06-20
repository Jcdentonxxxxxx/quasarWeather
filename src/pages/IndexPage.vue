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
        <q-tooltip
          class="bg-deep-orange-6"
          self="top left"
          no-parent-event
          v-model="showTooltip"
        >
          <div style="font-size: 16px">Please enter a valid city</div>
        </q-tooltip>
        <q-tooltip
          class="bg-orange-8"
          self="top left"
          no-parent-event
          v-model="showTooltipDuble"
        >
          <div style="font-size: 16px">This city already exists.</div>
        </q-tooltip>
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
        v-for="ct in filteredCities"
        :key="ct.name"
      >
        <q-card class="weather-card" spinner-color="deep-orange-6">
          <q-card-section
            class="weather-card__header text-h6 row justify-between"
          >
            <div class="column">
              <div>
                <span>{{ ct.month }}</span> <span>{{ ct.day }}</span>
              </div>

              <div class="weather-card__city">
                <span>{{ ct.name }}</span
                >,
                <span>{{ ct.country }}</span>
              </div>
            </div>

            <q-btn
              class="btn-remove"
              @click="deleteCityCard(ct)"
              flat
              style="color: #ff0080"
              >Remove</q-btn
            >
          </q-card-section>
          <q-card-section class="row items-center justify-between">
            <div class="column text-subtitle2">
              <q-img
                class="weather-card__img q-mb-md"
                spinner-color="deep-orange-6"
                :src="require(`../assets/${ct.imgUrl}`)"
              />
              <span>{{ ct.clouds }}</span>
            </div>

            <div class="column text-h6">
              <div>
                <span>{{ ct.temp }}&deg;</span>
                <span> C</span>
              </div>
              <div>
                <span class="text-subtitle2">Feels like: </span>
                <span>{{ ct.feelTemp }}&deg;</span><span> C</span>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="column relative">
            <span class="text-subtitle2">Wind:</span>
            <div class="row items-center">
              <img
                class="q-mr-md"
                width="20"
                height="20"
                src="../assets/navigation.svg"
                alt=""
                :style="{ transform: 'rotate(' + (ct.deg + 180 - 45) + 'deg)' }"
              />
              <div class="text-h6">{{ ct.wind }} m/s</div>
            </div>
          </q-card-section>
          <div class="weather-card__route">
            <q-btn flat color="grey-1" icon="visibility" @click="goToCard" />
          </div>
        </q-card>
      </div>
    </div>

    <q-pagination
      v-model="page"
      :max="maxPagination"
      :max-pages="4"
      :boundary-numbers="false"
      class="pagination"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref, reactive, computed, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const visibleSearch = ref(false);
    let city = ref("");
    let showTooltip = ref(false);
    let showTooltipDuble = ref(false);
    let page = ref(1);
    let cities = reactive([]);

    const router = useRouter();
    const route = useRoute();
    //   Computed //
    const maxPagination = computed(() => {
      let max = Math.ceil(cities.length / 3);
      if (max < 3 && cities.length >= 1) {
        max = 3;
      }
      return max;
    });

    const filteredCities = computed(() => {
      const start = (page.value - 1) * 4;
      const end = page.value * 4;

      return cities.slice(start, end);
    });

    //   / Computed //

    onBeforeMount(() => {
      const cityData = localStorage.getItem("cities-list");
      if (cityData) {
        let citiesParsed = JSON.parse(cityData);
        for (let i = 0; i < citiesParsed.length; i++) {
          cities.push(citiesParsed[i]);
        }
      }
    });

    // function filteredCities() {
    //   const start = (page.value - 1) * 4;
    //   const end = page.value * 4;

    //   return cities.slice(start, end);
    // }

    function goToCard() {
      router.push("/cardpage");
    }

    function add() {
      if (city.value.length <= 0) {
        return;
      }
      let newCity = {
        day: "-",
        month: "-",
        name: city.value,
        country: "-",
        temp: "-",
        feelTemp: "-",
        clouds: "-",
        wind: "-",
        imgUrl: "sun.png",
        deg: "-",
      };

      getPosition(newCity);

      city.value = "";
    }

    async function getPosition(newCity) {
      let apiCoords = `http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=1&appid=${process.env.API_KEY}`;
      let responseCoords = await fetch(apiCoords);
      if (responseCoords.status >= 401) {
        showTooltip.value = true;
        setTimeout(() => {
          showTooltip.value = false;
        }, 1500);
        return;
      }
      let responseJsonCoords = await responseCoords.json();

      if (responseJsonCoords.length <= 0) {
        showTooltip.value = true;
        setTimeout(() => {
          showTooltip.value = false;
        }, 1500);
        return;
      }

      // cities.push(newCity);
      let currentCard = newCity;
      currentCard.country = responseJsonCoords[0].country;

      let lat = responseJsonCoords[0].lat;
      let lon = responseJsonCoords[0].lon;

      let dataTemp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`
      );
      let dataTempJson = await dataTemp.json();
      let findItem = cities.find(function (item) {
        return item.name === dataTempJson.name;
      });

      if (findItem) {
        showTooltipDuble.value = true;
        setTimeout(() => {
          showTooltipDuble.value = false;
        }, 1500);
        return;
      }

      addDataToCard(currentCard, dataTempJson);
      addImgSrc(currentCard, dataTempJson);
    }

    function addImgSrc(currentCard, data) {
      if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
        currentCard.imgUrl = "thunderstorm.png";
      } else if (data.weather[0].id >= 300 && data.weather[0].id <= 321) {
        currentCard.imgUrl = "drizzle.png";
      } else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
        currentCard.imgUrl = "snow.png";
      } else if (data.weather[0].id >= 500 && data.weather[0].id <= 531) {
        currentCard.imgUrl = "rain.png";
      } else if (data.weather[0].id >= 701 && data.weather[0].id <= 781) {
        currentCard.imgUrl = "clouds.png";
      } else if (data.weather[0].id >= 801 && data.weather[0].id <= 804) {
        currentCard.imgUrl = "clouds.png";
      } else if ((data.weather[0].id = 800)) {
        currentCard.imgUrl = "sun.png";
      }

      localStorage.setItem("cities-list", JSON.stringify(cities));
    }

    function addDataToCard(currentCard, data) {
      cities.push(currentCard);

      let date = new Date();
      let day = date.getDate();
      let month = new Date().toLocaleString("en", { month: "short" });
      currentCard.day = day;
      currentCard.month = month;
      currentCard.name = data.name;

      currentCard.temp = Math.round(data.main.temp);
      currentCard.feelTemp = Math.round(data.main.feels_like);

      currentCard.clouds = data.weather[0].main;
      currentCard.wind = Math.round(data.wind.speed);
      currentCard.deg = data.wind.deg;
    }

    function deleteCityCard(ct) {
      console.log(cities);
      let idx = cities.indexOf(ct);
      cities.splice(idx, 1);
      localStorage.setItem("cities-list", JSON.stringify(cities));
      console.log(cities);
    }

    return {
      visibleSearch,
      city,
      cities,
      showTooltip,
      showTooltipDuble,
      page,
      maxPagination,
      filteredCities,

      add,
      deleteCityCard,
      onBeforeMount,
      goToCard,
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
  margin-bottom: 50px;

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

  &__route {
    position: absolute;
    right: 0;
    bottom: 0;

    .q-btn {
      padding: 10px 20px 20px 14px;
      background-color: #ffc107;
      border-top-left-radius: 50% !important;
    }
  }

  &__header {
    padding-bottom: 0;
  }

  &__city {
    min-height: 64px;
  }

  .relative {
    position: relative;
  }
}

.btn-remove {
  position: absolute;
  top: 0;
  right: 0;
}

.pagination {
  justify-content: center;
}
</style>
