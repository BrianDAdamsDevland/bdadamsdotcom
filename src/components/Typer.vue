<template>
  <span>{{ display }}</span>

  <span
    class="cursor animate__flash animate__animated"
    v-if="!isComplete && display.length && cursor"
  >
    |
  </span>
</template>

<script>
export default {
  name: "Typer",
  props: {
    text: String,
    delay: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 1000,
    },
    cursor: {
      type: Boolean,
      default: true,
    },
    name: String,
    once: Boolean,
    hiddenOnStart: Boolean
  },
  data() {
    return {
      display: this.hiddenOnStart ? "" : " ",
      remainingTime: this.duration,
    };
  },
  beforeMount() {
    if (
      !this.duration ||
      window.localStorage?.getItem(this.persistenceKey) === "1"
    )
      this.display = this.text;
  },
  mounted() {
    setTimeout(this.addNextChar, this.delay);
  },
  computed: {
    isComplete() {
      return this.display === this.text;
    },
    charDurations() {
      const durations = [];

      for (let index = 0; index < this.text.length; index++) {
        durations.push(this.duration / parseFloat(this.text.length));
      }

      return durations;
    },
    persistenceKey() {
      return `typer-${this.name}`;
    },
  },
  methods: {
    addNextChar() {
      if (this.isComplete) {
        this.handleComplete();
        return;
      }
      this.display = this.text.slice(0, this.display.length + 1);
      if (this.isComplete) {
        this.handleComplete();
        return;
      }
      setTimeout(this.addNextChar, this.charDurations[this.display.length - 1]);
    },
    handleComplete() {
      if (this.once) {
        window?.localStorage?.setItem(this.persistenceKey, "1");
      }
    },
  },
};
</script>

<style>
.cursor {
  color: var(--color-text);
}
</style>
