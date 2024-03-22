<template>
  <i
    @click="toggleTheme"
    :class="{
      'fa-sharp fa-solid fa-fw': true,
      'fa-sun-bright': currentTheme === 'dark',
      'fa-sunglasses': currentTheme === 'light',
    }"
    :title="`${currentTheme === 'dark' ? 'Light' : 'Dark'} Theme`"
  ></i>
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
  },
};
</script>
