<template>
  <div>fdfdfgdfgdfgdf</div>
  <q-btn @click="goHomePage">Back</q-btn>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "CardPage",

  setup() {
    const router = useRouter();
    const route = useRoute();

    function goHomePage() {
      router.push("/");
    }

    return {
      goHomePage,
    };
  },
});
</script>

<style lang="scss"></style>
