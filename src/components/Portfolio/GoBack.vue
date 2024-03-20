<template>
  <span @click.prevent="goBack" class="cursor-pointer back">
    <i class="fa-sharp fa-solid fa-arrow-left-long"></i>
    <template v-if="fromResume">Back to Resume</template>
    <template v-else>Back to Portfolio</template>
  </span>
</template>

<script>
import { navigate } from "astro:transitions/client";

export default {
  name: "GoBack",
  computed: {
    referrer() {
      return window.sessionStorage.getItem("prevHref")?.toLowerCase();
    },
    hasReferer() {
      return !!this.referrer;
    },
    fromResume() {
      return this.referrer?.includes("resume");
    }
  },
  methods: {
    goBack() {
      if (this.hasReferer) {
        window.history.back();
        return;
      }
      navigate("/portfolio");
    },
  },
};
</script>

<style scoped>

span {
  text-decoration: underline;
}

</style>