<template>
  <div class="wrapper">
    <div>
      <button
        type="button"
        @click="setTheme('light')"
        :class="{ active: currentTheme === 'light' }"
        title="Light Theme"
      >
        <i class="fa-sharp fa-solid fa-sun-bright fa-fw"></i>
      </button>
      <button
        type="button"
        @click="setTheme('dark')"
        :class="{ active: currentTheme === 'dark' }"
        title="Dark Theme"
      >
        <i class="fa-sharp fa-solid fa-sunglasses fa-fw"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThemeToggle",
  computed: {
    currentTheme() {
      return this.storageTheme ? this.storageTheme : this.preferredTheme;
    },
  },
  data() {
    return {
      preferredTheme: undefined,
      storageTheme: undefined,
    };
  },
  mounted() {
    this.storageTheme = window.localStorage?.getItem("theme");

    const darkModePreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    this.handlePreferred(darkModePreference);

    darkModePreference.addEventListener("change", this.handlePreferred);
  },
  methods: {
    handlePreferred(pref) {
      this.preferredTheme = pref.matches ? "dark" : "light";
    },
    toggleTheme() {
      const newTheme = this.currentTheme === "light" ? "dark" : "light";
      window.localStorage?.setItem("theme", newTheme);
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(newTheme);
      this.storageTheme = newTheme;
    },
    setTheme(mode) {
      window.localStorage?.setItem("theme", mode);
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(mode);
      this.storageTheme = mode;
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: 5px;
  align-items: center;
}

button {
  border: 1px solid gray;
  padding: 6px 15px;
  color: black;
  background: rgb(230,230,230);
  font-size: 1em;
}

button.active {
  background: var(--color-active-selection-background);
  color: var(--color-active-selection-text);
}

button:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

button:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-left: -1px;
}
</style>
