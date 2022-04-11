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

      <q-toolbar class="add-city" :class="{ active: visibleSearch }" inset>
        <q-input dense color="grey-3" label-color="white" label="Enter city" />
        <q-btn class="q-ml-xl q-mt-sm" dense flat icon="add" color="brown-1"
          >Add</q-btn
        >
      </q-toolbar>
    </div>

    <div class="weather-cards">
      <div class="weather-cards__col col-lg-6">
        <q-card class="weather-card">
          <q-card-section row>
            <span>Apr 11</span>
            <div>
              <span>London</span>,
              <span>GB </span>
            </div>
          </q-card-section>
          <q-card-section class="row">
            <img class="weather-card__img" src="../assets/sun.png" />
            <div>
              <div>
                <span>24</span> 
                <span> C</span>
              </div>
              <span>Feels like 14°C</span>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6">10.3m/s E</div>
            
          </q-card-section>
        </q-card>
      </div>
      <div class="weather-cards__col col-lg-6">
        <q-card>
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />

          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div>
      <div class="weather-cards__col col-lg-6">
        <q-card>
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />

          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div>
      <div class="weather-cards__col col-lg-6">
        <q-card>
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />

          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const visibleSearch = ref(false);

    return {
      visibleSearch,
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
