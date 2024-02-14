<template>
  <div ref="container" :class="cssClasses" :style="style">
    <slot />
  </div>
</template>

<script>
export default {
  name: "AnimatedEntrance",
  props: {
    type: {
      type: String,
      default: "fadeIn",
    },
    speed: String,
    cssClass: String,
    delay: {
      type: Number,
      default: 0,
    },
    immediate: Boolean,
    infinite: Boolean,
    inline: Boolean,
    name: String,
    once: Boolean
  },
  data() {
    return {
      animate: false,
      observer: undefined,
      playedPreviously: false
    };
  },
  computed: {
    cssClasses() {
      if (!this.animate) return `hidden ${this.cssClass}`;

      if (this.once && this.playedPreviously) return "";

      const classes = [
        "animate__animated",
        `animate__${this.type}`,
        this.cssClass,
      ];

      if (this.speed) classes.push(`animate__${this.speed}`);

      if (this.infinite) classes.push("animate__infinite");

      if (this.inline) classes.push("inline");

      return classes.join(" ");
    },
    style() {
      if (this.once && this.playedPreviously) return "";
      return `animation-delay: ${this.delay}s`;
    },
    persistenceKey() {
      return `animated-enter-${this.name}`;
    },
  },
  mounted() {
    if (this.immediate) {
      this.animate = true;
      return;
    }

    const options = {
      root: null,
      rootMargin: "0px",
    };

    this.observer = new IntersectionObserver(this.handleIntersection, options);
    this.observer.observe(this.$refs.container);

    this.playedPreviously = window.localStorage?.getItem(this.persistenceKey) === "1";
  },
  methods: {
    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animate = true;
          this.observer.disconnect();
        }
      });
    },
  },
  beforeUnmount() {
    this.observer?.disconnect();
  },
  watch: {
    animate() {
      if (this.once) {
        window.localStorage?.setItem(this.persistenceKey, "1");
      }
    }
  }
};
</script>

<style scoped>
.hidden {
  visibility: hidden;
}

.inline {
  display: inline;
}
</style>
