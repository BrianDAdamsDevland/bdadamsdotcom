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
    time: {
      type: Number,
      default: 1000,
    },
    cursor: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      display: "",
      remainingTime: this.time,
    };
  },
  beforeMount() {
    if (!this.time) this.display = this.text;
  },
  mounted() {
    setTimeout(this.addNextChar, this.delay);
  },
  computed: {
    isComplete() {
      return this.display === this.text;
    },
    charTimes() {
      const times = [];

      for (let index = 0; index < this.text.length; index++) {
        times.push(this.time / parseFloat(this.text.length));
      }

      return times;
    },
  },
  methods: {
    addNextChar() {
      if (this.isComplete) return;
      this.display = this.text.slice(0, this.display.length + 1);
      if (this.isComplete) return;
      setTimeout(this.addNextChar, this.charTimes[this.display.length - 1]);
    },
  },
};
</script>

<style>
.cursor {
  color: white;
}
</style>
