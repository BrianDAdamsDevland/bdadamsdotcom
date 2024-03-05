<template>
  <a v-if="hasReferer" href="#" @click.prevent="goBack" class="back">
    <i class="fa-sharp fa-solid fa-arrow-left-long"></i>
    <template v-if="fromGallery">Back to Gallery</template>
    <template v-else-if="fromResume">Back to Resume</template>
    <template v-else>Go Back</template>
  </a>
</template>

<script>
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
      return this.hasReferer && this.referrer.includes("resume");
    },
    fromGallery() {
      return this.hasReferer && this.referrer.includes("gallery");
    },
  },
  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script>

<style scoped>
a.back {
  text-decoration: none;
}
</style>
