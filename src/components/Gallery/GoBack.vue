<template>
  <span @click.prevent="goBack" class="cursor-pointer">
    <i class="fa-sharp fa-solid fa-arrow-left-long"></i>
    <template v-if="fromResume">Back to Resume</template>
    <template v-else>Back to Gallery</template>
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
    },
    fromGallery() {
      return this.referrer?.includes("gallery");
    },
  },
  methods: {
    goBack() {
      if (this.hasReferer) {
        window.history.back();
        return;
      }
      navigate("/gallery");
    },
  },
};
</script>
